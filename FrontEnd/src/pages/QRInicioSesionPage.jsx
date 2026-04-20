import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { useStudent } from "../components/StudentContext";
import BrandLogo from "../components/BrandLogo";
import { apiUrl, runtimeConfig } from "../config/runtime";
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

const extractEmailFromSubject = (subject) => {
  const direct = subject?.mail || subject?.email || subject?.emailAddress;
  if (typeof direct === "string" && direct.trim()) {
    return direct;
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

const QRInicioSesionPage = () => {
  const verificationUrl = apiUrl("/verifierIssuer/verificar/login");
  const [verificationData, setVerificationData] = useState(null);
  const [copyButtonText, setCopyButtonText] = useState(t("Copiar respuesta al portapapeles", "Copier dans le presse-papiers"));
  const [isVerified, setIsVerified] = useState(false);
  const [correoConfirmado, setCorreoConfirmado] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setStudentInfo } = useStudent();

  const [accessToken, setToken] = useState('');

  const generarNuevoToken = () => {
    const newToken = crypto.randomUUID();
    setToken(newToken);
  };


  useEffect(() => {
    generarNuevoToken();
    const verifyCredential = async () => {
      try {
        const response = await fetch(verificationUrl, { method: "POST" });
        let data = await response.text();
        data = data.replace(/^"(.*)"$/, "$1");
        setVerificationData(data);
        console.log("verifyCredential completado.");
        const params = new URLSearchParams(location.search);
        const verified = params.get('verified') === 'true';
        if (verified) {
          setIsVerified(true);
        }
      } catch (error) {
        console.error("Error en la verificación:", error);
        alert("Error al verificar la credencial. Por favor, inténtalo de nuevo más tarde.");
      }
    };

    verifyCredential();

    const params = new URLSearchParams(location.search);
    const verifiedOnLoad = params.get('verified') === 'true';
    if (verifiedOnLoad) {
      setIsVerified(true);
      const timeout = setTimeout(() => {
        localStorage.removeItem("verificationComplete");
        setIsVerified(false);
      }, 60000);
      return () => clearTimeout(timeout);
    }
    console.log("Fin del useEffect de verificación.");
  }, [verificationUrl, location.search]);

  useEffect(() => {
    console.log("Ejecutando el useEffect para obtener el correo si isVerified es true:", isVerified);
    if (isVerified) {
      const params = new URLSearchParams(location.search);
      const idFromQuery = params.get('id');
      console.log("ID de la query para obtenerCorreo:", idFromQuery);
      obtenerCorreo(idFromQuery);
    }
  }, [isVerified, location.search]);

  const obtenerCorreo = async (currentId) => {
    console.log("Llamando a obtenerCorreo con ID:", currentId);
    if (!currentId) return;
    try {
      const response = await fetch(apiUrl(`/verifierIssuer/verificar/infoSesionVerificacion/${currentId}`), {
        method: "GET",
        headers: { "accept": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Error al verificar la sesión");
      }
      const sesionData = await response.json();
      const userData = sesionData?.educationalIdSubject || getEducationalIdSubject(sesionData);

      const mail = extractEmailFromSubject(userData);

      if (mail) {
        console.log("Correo encontrado:", mail);

        if (mail.endsWith(`@${runtimeConfig.allowedEmailDomain}`)) {
          const backendResponse = await fetch(apiUrl(`/sql/estudiante/correo?correo=${mail}`));
          const backendData = await backendResponse.json();

          if (backendResponse.ok) {
            const studentInfo = backendData;
            setStudentInfo(studentInfo);
            localStorage.setItem('studentInfo', JSON.stringify(studentInfo));
            sessionStorage.setItem('token', accessToken);
            setCorreoConfirmado(mail);
          } else {
            alert("Error al obtener los datos del usuario desde el backend.");
            console.error('Error del backend:', backendData);
          }

        } else {
          alert(`El correo no pertenece a @${runtimeConfig.allowedEmailDomain}`);
          console.error(`El correo no pertenece a @${runtimeConfig.allowedEmailDomain}:`, mail);
        }
      } else {
        alert("No se encontraron los datos del usuario o el correo en el EducationalID.");
        console.log("No se encontraron los datos del usuario o el correo en EducationalID.");
      }
    } catch (error) {
      alert("Error al obtener el correo del usuario.");
      console.error("Error al obtener información de la sesión:", error);
    }
  };

  useEffect(() => {
    if (isVerified && correoConfirmado) {
      navigate("/studentPortal");
    }
  }, [isVerified, correoConfirmado, navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(verificationData)
      .then(() => {
        setCopyButtonText(t("Copiado", "Copié"));
        setTimeout(() => setCopyButtonText(t("Copiar respuesta al portapapeles", "Copier dans le presse-papiers")), 4000);
      })
      .catch((error) => {
        console.error("Error al copiar al portapapeles", error);
      });
  };

  return (
    <div className="container">
      <BrandLogo alt={runtimeConfig.universityName} className="logo-deusto" />
      <div className="wallet-box">
        <h1>{t("Comparte tu EducationalID", "Partagez votre EducationalID")}</h1>
        {verificationData ? (
          <QRCode value={verificationData} size={200} />
        ) : (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <p className="verification-text">
          {t("Escanea el código con walt.id para verificar.", "Scannez le code avec walt.id pour vérifier.")}
        </p>
        <div className="separator">
          <hr />
          <span>{t("o", "ou")}</span>
          <hr />
        </div>
        <button onClick={copyToClipboard} className="btnCopiar">
          {copyButtonText}
        </button>

      </div>

      <style>{`
        html,
        body,
        #root {
          height: 100%;
          margin: 0;
          padding: 0;
          background-color: var(--unistra-bg, #e6e7e8);
          overflow: hidden; /* Evitar el scroll */
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100%;
          padding: 10px;
          box-sizing: border-box; /* Asegurarse de que padding no afecte el tamaño */
          text-align: center;
          transform: scale(0.9); /* 🔹 Simula el 90% de zoom */
          transform-origin: top center;
        }
        .verification-text {
          white-space: nowrap; /* Evitar el salto de línea */
          padding-top: 13px;
          overflow: hidden;
          text-overflow: ellipsis; /* Agregar puntos suspensivos si el texto es muy largo */
          font-size: 17px; /* Reducir el tamaño si es necesario */
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
        .logo-deusto {
          width: 250px; /* Ajusta el tamaño del logo */
          margin-bottom: 10px; /* Espacio debajo del logo */
          margin-top: 50px;
        }
        .wallet-box {
          background-color: #ffffff;
          padding: 25px;
          margin-top: 20px;
          margin-bottom: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 100%;
        }
        .btnCopiar {
          background: none;
          border: none;
          color: var(--tenant-primary, #007bff);
          text-decoration: none;
          font-size: 1rem;
          cursor: pointer;
          padding: 0;
          display: inline;
          margin-bottom: 15px;
        }

        .btnCopiar:hover {
          text-decoration: underline;
          color: var(--tenant-secondary, #0056b3);
        }

        .btnCopiar:focus,
        .btnCopiar:active {
          outline: none !important;
          box-shadow: none !important;
        }

        h1 {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .wallet-logo {
          width: 25px;
          height: 25px;
          margin-right: 10px;
        }
        @media (min-width: 1600px) {
          .logo-deusto {
            max-width: 300px; /* Logo más grande */
          }

          .wallet-box {
            max-width: 600px; /* Caja más grande */
            padding: 40px;
          }

          .verification-text {
            font-size: 20px;
          }

          .verification-data-box {
            max-height: 200px; /* Más espacio para los datos */
          }

          .copy-button {
            font-size: 20px;
            padding: 14px 20px;
          }
        }
        @media (max-width: 600px) {
          .logo-deusto {
            width: 620px; /* Tamaño más pequeño en pantallas pequeñas */
          }
          .wallet-box {
            padding: 15px;
          }
          h1 {
            font-size: 16px;
          }
          .wallet-button {
            padding: 8px;
          }
          .verification-text {
            font-size: 12px; /* Tamaño más pequeño en pantallas pequeñas */
          }
        }
      `}</style>
    </div>
  );
};

export default QRInicioSesionPage;