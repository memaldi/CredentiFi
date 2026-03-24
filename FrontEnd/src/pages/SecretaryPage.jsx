import React, { useState } from "react";
import Accordion from "../components/Accordion";
import { useEffect } from "react";
import { apiUrl } from "../config/runtime";

const SecretaryPage = () => {
  const [componenteSeleccionado, setComponenteSeleccionado] = useState("");
  const [cursos, setCursos] = useState([]);

  const handleSelectChange = (event) => {
    setComponenteSeleccionado(event.target.value);
  };

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch(apiUrl("/sql/cursos/nombres"));
        const data = await response.json();
        setCursos(data.cursos);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
        
      }
    };

    fetchCursos();
  }, []);

  return (
    <>
      <h1
        className="titulo"
        style={{
          textAlign: "center",
          paddingBottom: "2%",
          fontWeight: "800",
          color: "#0153CE",
        }}
      >
        Solicitudes de Ingreso
      </h1>

      <select
        className="form-select form-select-lg mb-3"
        aria-label="Large select example"
        onChange={handleSelectChange}
        value={componenteSeleccionado}
      >
        <option value="">Selecciona un curso</option>
        {cursos.map((nombreCurso, index) => (
          <option key={index} value={nombreCurso}>
            {nombreCurso}
          </option>
        ))}
      </select>

      <br></br>

      {componenteSeleccionado && (
        <Accordion curso={componenteSeleccionado} />
      )}
    </>
  );
};
export default SecretaryPage;
