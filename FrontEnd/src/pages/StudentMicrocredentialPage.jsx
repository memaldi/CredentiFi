import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarStudent from "../components/NavBarStudent";
import { useStudent } from "../components/StudentContext";
import { apiUrl } from "../config/runtime";
import { t } from "../config/i18n";

const EDUCATIONAL_ID_CREDENTIAL_NAME = "Educational ID";

const StudentMicrocredentialPage = ({ }) => {
  const navigate = useNavigate();
  const { studentInfo } = useStudent();
  const [solicitableCredentialsInfo, setSolicitableCredentialsInfo] = useState([]);
  const [checkedCredentials, setCheckedCredentials] = useState({});



  useEffect(() => {
    const fetchAndProcessEnrollments = async () => {
      if (studentInfo?.dni) {
        const acceptedCoursesInfo = [];
        const initialChecked = {
          [EDUCATIONAL_ID_CREDENTIAL_NAME]: false,
        };

        acceptedCoursesInfo.push({
          id: EDUCATIONAL_ID_CREDENTIAL_NAME,
          name: EDUCATIONAL_ID_CREDENTIAL_NAME,
        });

        for (const cursoId of studentInfo.cursos || []) {
          try {
            const courseResponse = await fetch(apiUrl(`/sql/estudiante/${cursoId}`));
            if (!courseResponse.ok) {
              console.error(`Error fetching enrollment for course ${cursoId}:`, courseResponse.status);
              alert("Error al cargar la información del curso. Por favor, inténtalo de nuevo más tarde.");
              continue;
            }
            const courseDetail = await courseResponse.json();

            if (courseDetail?.estudiantes) {
              const isAccepted = courseDetail.estudiantes.some(
                estudiante => estudiante.dni === studentInfo.dni && estudiante.estado_curso === "aceptada"
              );

              if (isAccepted) {
                let courseName = `Curso ID: ${cursoId}`;
                try {
                  const cursoInfoResponse = await fetch(apiUrl(`/sql/curso/${cursoId}`));
                  if (cursoInfoResponse.ok) {
                    const cursoInfo = await cursoInfoResponse.json();
                    courseName = cursoInfo.nombre;
                  } else {
                    console.warn(`No se pudo obtener el nombre del curso ${cursoId}`);
                  }
                } catch (error) {
                  console.error(`Error fetching curso info for ${cursoId}:`, error);
                  alert("Error al cargar la información del curso. Por favor, inténtalo de nuevo más tarde.");
                }

                acceptedCoursesInfo.push({ id: cursoId, name: courseName });
                initialChecked[cursoId] = false; // Inicialmente no marcado
              }
            }
          } catch (error) {
            console.error(`Error processing course ${cursoId}:`, error);
            alert("Error al cargar la información del curso. Por favor, inténtalo de nuevo más tarde.");
          }
        }

        setSolicitableCredentialsInfo(acceptedCoursesInfo);
        setCheckedCredentials(initialChecked);
      }
    };

    fetchAndProcessEnrollments();
  }, [studentInfo?.cursos, studentInfo?.dni]);

  const handleButtonClick = () => {

    const selectedCourseIds = Object.keys(checkedCredentials).filter(
      (id) => checkedCredentials[id]
    );
    const selectedCourseNames = solicitableCredentialsInfo
      .filter(credencial => selectedCourseIds.includes(credencial.id.toString()))
      .map(credencial => credencial.name);

    console.log("Cursos seleccionados (nombres):", selectedCourseNames);
    console.log(studentInfo);
    navigate("/microcredentials/solicitar", { state: { selectedCourseNames } });
  };


  const handleCheckboxChange = (id) => {
    setCheckedCredentials((prev) => {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  };

  const isAnyChecked = Object.values(checkedCredentials).some(Boolean);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <NavBarStudent />

      <div className="container">
        <h1
          className="title"
          style={{
            textAlign: "center",
            paddingBottom: "3%",
            paddingTop: "8%",
            fontWeight: "800",
            color: "#000000",
          }}
        >
          {t("Información Personal", "Informations personnelles")}
        </h1>

        <table className="table table-bordered">
          <tbody>
            <tr>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>NIA</td>
              <td style={{ background: "#EBEBEB", paddingRight: "180px" }}>{studentInfo?.NIA}</td>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>{t("DNI, Pasaporte", "Pièce d'identité")}</td>
              <td style={{ background: "#EBEBEB" }}>{studentInfo?.dni}</td>
            </tr>
            <tr>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>{t("Nombre", "Prénom")}</td>
              <td style={{ background: "#EBEBEB" }}>{studentInfo?.nombre}</td>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>{t("Primer Apellido", "Nom")}</td>
              <td style={{ background: "#EBEBEB" }}>{studentInfo?.primer_apellido}</td>
            </tr>
            <tr>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>{t("Segundo Apellido", "Deuxième nom")}</td>
              <td style={{ background: "#EBEBEB" }}>{studentInfo?.segundo_apellido}</td>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>{t("Email", "E-mail")}</td>
              <td style={{ background: "#EBEBEB" }}>{studentInfo?.correo}</td>
            </tr>
          </tbody>
        </table>

        <br />
        <div className="listaCredenciales">
          <h3
            style={{
              textAlign: "center",
              paddingBottom: "2%",
              paddingTop: "2%",
              fontWeight: "800",
              color: "#000000",
            }}
          >
            {t("Listado de Microcredenciales", "Liste des Microcredentials")}
          </h3>
          <br />
          <div className="checkboxes">            
            {solicitableCredentialsInfo.map((credencial) => (
              <div className="form-check form-switch" key={credencial.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={credencial.id}
                  checked={checkedCredentials[credencial.id] || false}
                  onChange={() => handleCheckboxChange(credencial.id)}
                />
                <label className="form-check-label" htmlFor={credencial.id}>
                  {credencial.name}
                </label>
              </div>
            ))}
          </div>
          <button
            className="btn btn-primary"
            id="boton"
            type="submit"
            onClick={handleButtonClick}
            disabled={!isAnyChecked}
            style={{ marginTop: "2%", marginLeft: "45%" }}
          >
            {t("Solicitar", "Demander")}
          </button>
        </div>

        <style>{`
          .listaCredenciales {
            padding: 2%;
            margin: 2%;
            border: 2px solid rgb(84, 84, 84);
            border-radius: 10px;
          }
          .checkboxes {
            padding-left: 4%;
          }
          .form-check-label {
            font-size: 20px;
          }
          .form-check-input {
            width: 20px;
            height: 20px;
          }
        `}</style>
      </div>
    </>
  );
};

export default StudentMicrocredentialPage;