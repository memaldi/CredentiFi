import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useStudent } from "../components/StudentContext";
import { useLocation } from 'react-router-dom';
import BrandLogo from "../components/BrandLogo";
import { apiUrl, runtimeConfig } from "../config/runtime";
import { t } from "../config/i18n";


const QREmitir = () => {
  const issuerUrl = apiUrl("/verifierIssuer/emitir");
  const [offerUri, setOfferUri] = useState(null);
  const [emitError, setEmitError] = useState(null);
  const [copyButtonText, setCopyButtonText] = useState(
    t("Copiar respuesta al portapapeles", "Copier dans le presse-papiers")
  );
  const { studentInfo } = useStudent();
  const location = useLocation();
  const selectedCourses = location.state?.selectedCourseNames || [];

  useEffect(() => {
    if (selectedCourses.length > 0 && studentInfo) {
      const emitirCursos = async () => {
        try {
          const emissionRequest = {
            courseNames: selectedCourses,
            studentInfo: {
              email: studentInfo?.correo,
              fechaNacimiento: studentInfo?.fecha_nacimiento ? `${studentInfo.fecha_nacimiento}T00:00:00+01:00` : '',
              nombre: studentInfo?.nombre,
              apellidos: `${studentInfo?.primer_apellido || ''} ${studentInfo?.segundo_apellido || ''}`.trim(),
              nombreCompleto: `${studentInfo?.nombre || ''} ${studentInfo?.primer_apellido || ''} ${studentInfo?.segundo_apellido || ''}`.trim(),
              dniPasaporte: studentInfo?.dni,
            }
          };

          const response = await fetch(issuerUrl, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emissionRequest),
          });

          let body = await response.text();
          body = body.replace(/^"(.*)"$/, "$1");

          if (!response.ok) {
            setEmitError(body);
          } else {
            setOfferUri(body);
          }
        } catch (error) {
          console.error("Error al pasar la información:", error);
          setEmitError("Error al emitir la credencial. Por favor, inténtalo de nuevo más tarde.");
        }
      };

      emitirCursos();
    }
  }, [issuerUrl, selectedCourses, studentInfo]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(offerUri || "")
      .then(() => {
        setCopyButtonText(t("Copiado", "Copié"));
        setTimeout(
          () => setCopyButtonText(t("Copiar respuesta al portapapeles", "Copier dans le presse-papiers")),
          4000
        );
      })
      .catch((error) => {
        console.error("Error al copiar al portapapeles", error);
        alert("Error al copiar al portapapeles. Por favor, inténtalo de nuevo.");
      });
  };

  return (
    <div className="container">
      <BrandLogo alt={runtimeConfig.universityName} className="logo-deusto" />
      <div className="wallet-box">
        <h1>{t("Obten tu Microcredencial:", "Obtenez votre Microcredential :")}</h1>
        {emitError ? (
          <p className="credential-error">{emitError}</p>
        ) : offerUri ? (
          <QRCode value={offerUri} size={220} />
        ) : (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <p className="verification-text">
          {t("Escanea el código con walt.id.", "Scannez le code avec walt.id.")}
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
        .credentials-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 350px;
          overflow-y: auto;
          margin-bottom: 8px;
        }
        .credential-item {
          border: 1px solid #d6d6d6;
          border-radius: 8px;
          padding: 10px;
          background: #fafafa;
        }
        .credential-title {
          font-size: 14px;
          margin-bottom: 8px;
          color: #333;
        }
        .credential-error {
          color: #b00020;
          font-size: 13px;
          margin: 0;
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

export default QREmitir;