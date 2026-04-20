import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import ModalCredential from "../components/ModalCredential";
import ModalAceptado from "../components/ModalAceptado";
import { apiUrl } from "../config/runtime";
import { t } from "../config/i18n";

const findCredentialSubjectDeep = (value) => {
  if (!value || typeof value !== "object") {
    return null;
  }

  if (value.credentialSubject && typeof value.credentialSubject === "object") {
    return value.credentialSubject;
  }

  for (const nestedValue of Object.values(value)) {
    const found = findCredentialSubjectDeep(nestedValue);
    if (found) {
      return found;
    }
  }

  return null;
};

const decodeJwtPayload = (token) => {
  if (typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  try {
    const base64 = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch (_error) {
    return null;
  }
};

const findCredentialSubjectFromJwtDeep = (value) => {
  if (typeof value === "string") {
    const decoded = decodeJwtPayload(value);
    if (!decoded) {
      return null;
    }

    return (
      findCredentialSubjectDeep(decoded?.vc) ||
      findCredentialSubjectDeep(decoded)
    );
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  for (const nestedValue of Object.values(value)) {
    const found = findCredentialSubjectFromJwtDeep(nestedValue);
    if (found) {
      return found;
    }
  }

  return null;
};

const getEducationalIdSubject = (sessionData) => {
  const policyResults = Array.isArray(sessionData?.policyResults?.results)
    ? sessionData.policyResults.results
    : [];

  const prioritizedResults = [
    ...policyResults.filter((item) => /educationalid/i.test(String(item?.credential || ""))),
    ...policyResults.filter((item) => !/educationalid/i.test(String(item?.credential || ""))),
  ];

  for (const resultItem of prioritizedResults) {
    const policyList = Array.isArray(resultItem?.policyResults) ? resultItem.policyResults : [];
    for (const policy of policyList) {
      const subject =
        policy?.result?.vc?.credentialSubject ||
        findCredentialSubjectDeep(policy?.result) ||
        findCredentialSubjectFromJwtDeep(policy?.result);
      if (subject && typeof subject === "object") {
        return subject;
      }
    }
  }

  return findCredentialSubjectDeep(sessionData) || findCredentialSubjectFromJwtDeep(sessionData);
};

const normalizeBirthDate = (dateOfBirth) => {
  if (!dateOfBirth) {
    return "";
  }

  const raw = String(dateOfBirth).trim();
  if (!raw) {
    return "";
  }

  if (/^\d{8}$/.test(raw)) {
    const year = raw.substring(0, 4);
    const month = raw.substring(4, 6);
    const day = raw.substring(6, 8);
    return `${year}-${month}-${day}`;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw;
  }

  const isoDateTimeMatch = raw.match(/^(\d{4}-\d{2}-\d{2})T/);
  if (isoDateTimeMatch) {
    return isoDateTimeMatch[1];
  }

  if (/^\d{4}\/\d{2}\/\d{2}$/.test(raw)) {
    return raw.replace(/\//g, "-");
  }

  if (/^\d{2}-\d{2}-\d{4}$/.test(raw)) {
    const [day, month, year] = raw.split("-");
    return `${year}-${month}-${day}`;
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const [day, month, year] = raw.split("/");
    return `${year}-${month}-${day}`;
  }

  return "";
};

const readLocalizedValue = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    const firstString = value.find((item) => typeof item === "string" && item.trim());
    return firstString || "";
  }

  if (typeof value === "object") {
    const preferredLocales = ["es", "fr", "en"];
    for (const locale of preferredLocales) {
      const localized = readLocalizedValue(value[locale]);
      if (localized) {
        return localized;
      }
    }

    for (const nested of Object.values(value)) {
      const parsed = readLocalizedValue(nested);
      if (parsed) {
        return parsed;
      }
    }
  }

  return "";
};

const extractEmailFromSubject = (subject) => {
  const direct = subject?.mail || subject?.email || subject?.emailAddress;
  if (typeof direct === "string" && direct.trim()) {
    return direct;
  }

  const directLocalized = readLocalizedValue(direct);
  if (directLocalized) {
    return directLocalized;
  }

  const contactPoints = Array.isArray(subject?.contactPoint) ? subject.contactPoint : [];
  for (const point of contactPoints) {
    const emailEntries = Array.isArray(point?.emailAddress)
      ? point.emailAddress
      : point?.emailAddress
      ? [point.emailAddress]
      : [];

    for (const entry of emailEntries) {
      if (typeof entry === "string" && entry.trim()) {
        return entry;
      }

      const entryId = entry?.id || entry?.value || entry?.email;
      if (typeof entryId === "string" && entryId.trim()) {
        return entryId;
      }
    }
  }

  return "";
};

const extractNationalIdFromSubject = (subject) => {
  const direct =
    subject?.schacPersonalUniqueID ||
    subject?.personalUniqueId ||
    subject?.nationalId ||
    subject?.documentNumber ||
    subject?.dni ||
    subject?.nia;
  if (typeof direct === "string" && direct.trim()) {
    return direct;
  }

  const nationalId = subject?.nationalID;
  if (typeof nationalId === "string" && nationalId.trim()) {
    return nationalId;
  }

  if (nationalId && typeof nationalId === "object") {
    const notation = nationalId.notation || nationalId.value || nationalId.id;
    if (typeof notation === "string" && notation.trim()) {
      return notation;
    }
  }

  const localized = readLocalizedValue(direct);
  if (localized) {
    return localized;
  }

  return "";
};

const extractDateOfBirthFromSubject = (subject) => {
  const direct =
    subject?.dateOfBirth ||
    subject?.birthDate ||
    subject?.birth_date ||
    subject?.dob;

  if (typeof direct === "string" && direct.trim()) {
    return direct;
  }

  return readLocalizedValue(direct);
};

const splitFamilyNames = (familyNameRaw) => {
  const normalized = String(familyNameRaw || "").trim().replace(/\s+/g, " ");
  if (!normalized) {
    return { firstSurname: "", secondSurname: "" };
  }

  const parts = normalized.split(" ");
  if (parts.length === 1) {
    return { firstSurname: parts[0], secondSurname: parts[0] };
  }

  return {
    firstSurname: parts[0],
    secondSurname: parts.slice(1).join(" "),
  };
};

const PrerequisitesPage = () => {
  const [email, setEmail] = useState("");
  const [nombrePersona, setNombrePersona] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [DNINIE, setDNINIE] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [documentFile, setDocumentFile] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { nombre, descripcion, duracion, requisitos } = location.state || {};
  const nombresRequisitos = requisitos?.map(req => req.nombre) || [];
  const [nombreCurso, setNombreCurso] = useState('');
  const params = new URLSearchParams(location.search);
  const idVerificacion = params.get('id');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [idCredencial, setIdCredencial] = useState('');
  const [mostrarModalExito, setMostrarModalExito] = useState(false);

  const handleButtonClick = () => {
    navigate("/comparteCredenciales", { state: { nombresRequisitos } });
  };

  const formatRequisitos = (requisitos) => {
    if (!requisitos || requisitos.length === 0) {
      return "";
    } else if (requisitos.length === 1) {
      return ` y ${requisitos[0]}`;
    } else if (requisitos.length === 2) {
      return `, ${requisitos[0]} y ${requisitos[1]}`;
    } else {
      const lastRequisito = requisitos.pop();
      return `, ${requisitos.join(', ')} y ${lastRequisito}`;
    }
  };

  const requisitosFormateados = formatRequisitos(nombresRequisitos);

  useEffect(() => {
    if (location.state?.nombre) {
      localStorage.setItem("nombreCurso", nombre);
      setNombreCurso(location.state.nombre);
    } else {
      const stored = localStorage.getItem("nombreCurso");
      if (stored) setNombreCurso(stored);
    }
    const params = new URLSearchParams(location.search);
    const verified = params.get('verified') === 'true';
    if (verified) {
      setIsComplete(true);
      const timeout = setTimeout(() => {
        localStorage.removeItem("verificationComplete");
        setIsComplete(false);
      }, 60000); // 1 minuto

      return () => clearTimeout(timeout);
    }

  }, [location.search]);

  const obtenerDatosUsuario = async () => {
    setLoading(true);
    setError(null);
    try {
      const sesionResponse = await fetch(apiUrl(`/verifierIssuer/verificar/infoSesionVerificacionGuardar/${idVerificacion}`), {
        method: "GET",
        headers: {
          "accept": "application/json",
        },
      });

      if (!sesionResponse.ok) {
        throw new Error("Error al verificar la sesión");
      }
      const sesionData = await sesionResponse.json();
      const credencialId = sesionData._id;
      setIdCredencial(credencialId);
      const userData = sesionData?.educationalIdSubject || getEducationalIdSubject(sesionData);

      if (userData) {
        const firstName =
          readLocalizedValue(userData.firstName) ||
          readLocalizedValue(userData.givenName) ||
          "";
        const familyNameCandidate =
          readLocalizedValue(userData.familyName) ||
          readLocalizedValue(userData.lastName) ||
          "";
        const splitSurnames = splitFamilyNames(familyNameCandidate);
        const familyName = splitSurnames.firstSurname;
        const secondLastName =
          userData.secondLastName ||
          userData.secondFamilyName ||
          splitSurnames.secondSurname ||
          "";
        const dateOfBirth = extractDateOfBirthFromSubject(userData);
        const mail = extractEmailFromSubject(userData);
        const schacPersonalUniqueID = extractNationalIdFromSubject(userData);
        const formattedDateOfBirth = normalizeBirthDate(dateOfBirth);

        setNombrePersona(firstName);
        setPrimerApellido(familyName);
        setBirthDate(formattedDateOfBirth);
        setEmail(mail);
        setDNINIE(schacPersonalUniqueID);
        setSegundoApellido(secondLastName);

        return {
          nombrePersona: firstName,
          primerApellido: familyName,
          segundoApellido: secondLastName,
          birthDate: formattedDateOfBirth,
          email: mail,
          DNINIE: schacPersonalUniqueID,
          idCredencial: credencialId,
        };

      } else {
        console.log("No se encontraron los datos del usuario dentro de EducationalID.");
        setError("No se encontraron los datos del usuario.");
        return null;
      }
    } catch (err) {
      console.error("Error al obtener datos del usuario:", err);
      alert("Error al obtener los datos del usuario: " + err.message);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const enviarSolicitud = async (datosUsuario = null) => {
    setLoading(true);
    setError(null);

    const datos = datosUsuario || {
      nombrePersona,
      primerApellido,
      segundoApellido,
      birthDate,
      email,
      DNINIE,
      idCredencial,
    };

    try {
      const insertarPersonaResponse = await fetch(apiUrl("/sql/persona"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: datos.nombrePersona,
          primer_apellido: datos.primerApellido,
          segundo_apellido: datos.segundoApellido,
          fecha_nacimiento: datos.birthDate,
          dni: datos.DNINIE,
          correo: datos.email,
          credenciales: [datos.idCredencial]
        }),
      });

      if (!insertarPersonaResponse.ok) {
        const errorData = await insertarPersonaResponse.json();
        throw new Error(`Error al añadir persona: ${insertarPersonaResponse.status} - ${JSON.stringify(errorData)}`);
      }
      const personaData = await insertarPersonaResponse.json();
      const idPersona = personaData.id;

      if (!idPersona) {
        console.error("No se obtuvo el id de la persona.");
        alert("No se obtuvo el ID de la persona.");
        setError("No se obtuvo el ID de la persona.");
        return;
      }
      const insertarCredencial = await fetch(apiUrl("/sql/credencial"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: datos.idCredencial,
          estado: "en propiedad"
        }),
      });
      if (!insertarCredencial.ok) {
        const errorData = await insertarCredencial.json();
        throw new Error(`Error al añadir credencial: ${insertarCredencial.status} - ${JSON.stringify(errorData)}`);
      }
      const credencialData = await insertarCredencial.json();
      console.log('Respuesta del servidor (credencial):', credencialData);

      const peticionIdCurso = await fetch(apiUrl(`/sql/curso/nombre/${encodeURIComponent(nombreCurso)}`));
      if (!peticionIdCurso.ok) {
        throw new Error(`Error al obtener ID del curso: ${peticionIdCurso.status}`);
      }
      const idCursoData = await peticionIdCurso.json();
      const idCurso = idCursoData.id;

      if (!idCurso) {
        console.error('No se pudo obtener el id del curso.');
        alert("No se pudo obtener el ID del curso.");
        setError("No se pudo obtener el ID del curso.");
        return;
      }

      const solicitudResponse = await fetch(apiUrl('/sql/solicitud'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_curso: idCurso,
          estado: "pendiente",
          id_persona: idPersona,
          credenciales: [datos.idCredencial],
        }),
      });

      if (!solicitudResponse.ok) {
        const errorDataSolicitud = await solicitudResponse.json();
        alert("Error al enviar la solicitud: " + errorDataSolicitud.detail);
        throw new Error(`Error al enviar la solicitud: ${solicitudResponse.status} - ${JSON.stringify(errorDataSolicitud)}`);

      }

      const solicitudData = await solicitudResponse.json();
      console.log('Respuesta del servidor (solicitud):', solicitudData);
      if (solicitudData && solicitudData.status === "Solicitud insertada") {
        setMostrarModalExito(true);
        setTimeout(() => {
          setMostrarModalExito(false);
          navigate('/');
        }, 3000);
      } else {
        alert("La solicitud no se insertó correctamente o la respuesta es diferente.");
        console.log('La solicitud no se insertó correctamente o la respuesta es diferente:', solicitudData);
      }

    } catch (err) {
      alert("Error al enviar la solicitud: " + err.message);
      console.error("Error al enviar la solicitud:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClickEnviar = async () => {
    const datosUsuario = await obtenerDatosUsuario();
    if (!datosUsuario) {
      return;
    }

    const camposFaltantes = [];
    if (!datosUsuario.nombrePersona) camposFaltantes.push("nombre");
    if (!datosUsuario.primerApellido) camposFaltantes.push("primer apellido");
    if (!datosUsuario.segundoApellido) camposFaltantes.push("segundo apellido");
    if (!datosUsuario.birthDate) camposFaltantes.push("fecha de nacimiento");
    if (!datosUsuario.email) camposFaltantes.push("email");
    if (!datosUsuario.DNINIE) camposFaltantes.push("DNI/NIE");
    if (!datosUsuario.idCredencial) camposFaltantes.push("id de credencial");

    if (camposFaltantes.length > 0) {
      const mensaje = `No se pudo enviar la solicitud. Faltan datos en EducationalID: ${camposFaltantes.join(", ")}.`;
      setError(mensaje);
      alert(mensaje);
      return;
    }

    await enviarSolicitud(datosUsuario);
  };




  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("verificationComplete");
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isFormValid =
    (isEmailValid &&
      nombrePersona &&
      primerApellido &&
      segundoApellido &&
      birthDate &&
      DNINIE &&
      documentFile &&
      termsAccepted) ||
    (isComplete && termsAccepted);

  return (
    <div className="container" id="formulario">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <h1
        className="titulo"
        style={{
          textAlign: "center",
          paddingBottom: "2%",
          fontWeight: "800",
          color: "var(--tenant-primary, #0153CE)",
        }}
      >
        {t("Formulario de Solicitud", "Formulaire de candidature")}
      </h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              disabled={isComplete}
            >
              {t("Formulario Clásico", "Formulaire classique")}
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="d-flex justify-content-between">
                <div className="formulario-contenedor">
                  <form className="row g-3 needs-validation was-validated">
                    <div className="row g-2">
                      <div className="col-md-3">
                        <label className="form-label" htmlFor="nombre">{t("Nombre", "Prénom")}</label>
                        <input
                          id="nombre"
                          type="text"
                          className="form-control"
                          value={nombrePersona}
                          onChange={(e) => setNombrePersona(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="separar">
                          <label className="form-label" htmlFor="primerApellido">{t("Primer apellido", "Nom de famille")}</label>
                          <input
                            id="primerApellido"
                            type="text"
                            className="form-control"
                            value={primerApellido}
                            onChange={(e) => setPrimerApellido(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="separar">
                          <label className="form-label" htmlFor="segundoApellido">{t("Segundo apellido", "Deuxième nom")}</label>
                          <input
                            id="segundoApellido"
                            type="text"
                            className="form-control"
                            value={segundoApellido}
                            onChange={(e) => setSegundoApellido(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col-md-4">
                        <label
                          htmlFor="validationCustomUsername"
                          className="form-label"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className={`form-control ${email && !isEmailValid ? "is-invalid" : ""
                            }`}
                          value={email}
                          onChange={handleEmailChange}
                          id="validationCustomUsername"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <div className="invalid-feedback">
                          {t("Por favor introduce tu email.", "Veuillez saisir votre adresse e-mail.")}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="separar">
                          <label className="form-label">
                            {t("Fecha de Nacimiento", "Date de naissance")}
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={birthDate}
                            onChange={(e) => {
                              const selectedDate = new Date(e.target.value);
                              const today = new Date();

                              const age =
                                today.getFullYear() -
                                selectedDate.getFullYear();
                              const monthDiff =
                                today.getMonth() - selectedDate.getMonth();
                              const dayDiff =
                                today.getDate() - selectedDate.getDate();

                              if (
                                age < 18 ||
                                (age === 18 && monthDiff < 0) ||
                                (age === 18 && monthDiff === 0 && dayDiff < 0)
                              ) {
                                alert(t("Debes tener al menos 18 años.", "Vous devez avoir au moins 18 ans."));
                              } else {
                                setBirthDate(e.target.value);
                              }
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="separar">
                          <label className="form-label">{t("DNI/NIE", "Pièce d'identité")}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={DNINIE}
                            onChange={(e) => setDNINIE(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col-md-6">
                        <label className="form-label">
                          {t("Subir Fotocopia de Requisitos:", "Joindre une copie des prérequis :")} EducationalID{requisitosFormateados}
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*,application/pdf"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    </div>
                    <div
                      className="col-md-6"
                      id="separacion"
                      style={{ paddingTop: "2%" }}
                    ></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-md-6"
        id="separacion"
        style={{ paddingTop: "3%" }}
      ></div>
      <div className="separator">
        <hr />
        <span>{t("o", "ou")}</span>
        <hr />
      </div>
      <div
        className="col-md-6"
        id="separacion"
        style={{ paddingTop: "1%" }}
      ></div>
      <div className="botonCompartir">
        <div className="input-group mb-3 align-items-center">
          <div className="me-2">
            <input
              type="checkbox"
              defaultValue=""
              className="custom-checkbox"
              disabled
              checked={isComplete}
            />
          </div>
          <button
            onClick={handleButtonClick}
            className="btn btn-primary"
            type="button"
            disabled={isComplete}
            style={{
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            {t("Comparte tus Microcredenciales", "Partagez vos Microcredentials")}
          </button>
          <div className="ms-3">
            <ModalCredential
              title="Comparte tus Microcredenciales"
              description={requisitosFormateados}
              id="microcredenciales"
            />
          </div>
          <div className="ms-2">
            <p className="mb-0">{t("IMPORTANTE", "IMPORTANT")}</p>
          </div>
        </div>
      </div>

      <div
        className="col-md-6"
        id="separacion"
        style={{ paddingTop: "1%" }}
      ></div>

      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="termsCheck"
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <label className="form-check-label" htmlFor="invalidCheck">
            {t("Acepto los términos y condiciones", "J'accepte les conditions générales")}
          </label>

        </div>
      </div>
      <div className="col-12" style={{ paddingTop: "2%" }}>
        <button
          className="btn btn-primary"
          id="boton"
          type="submit"
          disabled={!isFormValid || loading}
          onClick={handleClickEnviar}
        >
          {t("Enviar Solicitud", "Envoyer la candidature")}
        </button>
        {mostrarModalExito && (
          <ModalAceptado
            isOpen={mostrarModalExito}
            onClose={() => setMostrarModalExito(false)}
            mensaje={t("Solicitud registrada correctamente, muchas gracias", "Candidature enregistrée avec succès, merci !")}
          />
        )}
      </div>

      <style>{`
        .botonCompartir {
          margin-left: 35%;
        }
        .separar {
          margin-left: 30px;
        }
        .separator {
          display: flex;
          align-items: center;
          margin-top: -14px;
          margin-bottom: 5px;
        }
        .separator hr {
          flex-grow: 1;
          border: 1.5px solid #000000;
        }
        .separator span {
          margin: 0 8px;
          font-size: 16px;
        }
        .formulario-contenedor {
          margin-left: 10%;
        }
        .custom-checkbox {
          appearance: none; /* Oculta el checkbox predeterminado */
          width: 40px;
          height: 20px;
          background-color: #ccc;
          border-radius: 20px;
          position: relative;
          transition: background 0.3s ease-in-out;
          cursor: not-allowed;
        }

        .custom-checkbox:checked {
          background-color: #0153ce;
        }

        .custom-checkbox::before {
          content: "";
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.3s ease-in-out;
        }

        .custom-checkbox:checked::before {
          transform: translateX(20px);
        }
        .separar {
          margin-left: 30px;
        }
        .formulario-contenedor {
          flex: 1;
        }
      `}</style>
    </div>
  );
};
export default PrerequisitesPage;
