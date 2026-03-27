import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import ModalCredential from "../components/ModalCredential";
import ModalAceptado from "../components/ModalAceptado";
import { apiUrl } from "../config/runtime";

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
  const [enviar, setEnviar] = useState(false);
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
      setIdCredencial(sesionData._id);
      const educationalCredentialResult = sesionData?.policyResults?.results?.find(
        (item) => item.credential === "EducationalID"
      );

      if (educationalCredentialResult && educationalCredentialResult.policyResults && educationalCredentialResult.policyResults.length > 0) {
        const userData = educationalCredentialResult.policyResults[0]?.result?.vc?.credentialSubject;

        if (userData) {
          const { firstName, familyName, dateOfBirth, mail, schacPersonalUniqueID, secondLastName } = userData;
          const year = dateOfBirth.substring(0, 4);
          const month = dateOfBirth.substring(4, 6);
          const day = dateOfBirth.substring(6, 8);
          const formattedDateOfBirth = `${year}-${month}-${day}`;

          setNombrePersona(firstName);
          setPrimerApellido(familyName);
          setBirthDate(formattedDateOfBirth);
          setEmail(mail);
          setDNINIE(schacPersonalUniqueID);
          setSegundoApellido(secondLastName);

        } else {
          console.log("No se encontraron los datos del usuario dentro de EducationalID.");
          setError("No se encontraron los datos del usuario.");
        }
      } else {
        console.log("No se encontró la credencial EducationalID en los resultados.");
        setError("No se encontró la información de la credencial.");
      }
    } catch (err) {
      console.error("Error al obtener datos del usuario:", err);
      alert("Error al obtener los datos del usuario: " + err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const enviarSolicitud = async () => {
    setLoading(true);
    setError(null);
    try {
      const insertarPersonaResponse = await fetch(apiUrl("/sql/persona"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombrePersona,
          primer_apellido: primerApellido,
          segundo_apellido: segundoApellido,
          fecha_nacimiento: birthDate,
          dni: DNINIE,
          correo: email,
          credenciales: [idCredencial]
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
          id: idCredencial,
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
          credenciales: [idCredencial],
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
      setEnviar(false);
    }
  };

  const handleClickEnviar = () => {
    obtenerDatosUsuario();
    setEnviar(true); // Activar el envío después de obtener los datos
  };

  useEffect(() => {
    if (enviar && nombrePersona && primerApellido && birthDate && email && idCredencial) {
      enviarSolicitud();
    }
  }, [enviar, nombrePersona, primerApellido, birthDate, email, idCredencial]);




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
        Formulario de Solicitud
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
              Formulario Clásico
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
                        <label className="form-label" htmlFor="nombre">Nombre</label>
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
                          <label className="form-label" htmlFor="primerApellido">Primer apellido</label>
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
                          <label className="form-label" htmlFor="segundoApellido">Segundo apellido</label>
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
                          Por favor introduce tu email.
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="separar">
                          <label className="form-label">
                            Fecha de Nacimiento
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
                                alert("Debes tener al menos 18 años.");
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
                          <label className="form-label">DNI/NIE</label>
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
                          Subir Fotocopia de Requisitos: EducationalID{requisitosFormateados}
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
        <span>o</span>
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
            Comparte tus Microcredenciales
          </button>
          <div className="ms-3">
            <ModalCredential
              title="Comparte tus Microcredenciales"
              description={requisitosFormateados}
              id="microcredenciales"
            />
          </div>
          <div className="ms-2">
            <p className="mb-0">IMPORTANTE</p>
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
            Acepto los términos y condiciones
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
          Enviar Solicitud
        </button>
        {mostrarModalExito && (
          <ModalAceptado
            isOpen={mostrarModalExito}
            onClose={() => setMostrarModalExito(false)}
            mensaje="Solicitud registrada correctamente, muchas gracias"
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
