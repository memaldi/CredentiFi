import React, { useState, useEffect } from 'react';
import AccordionItemActas from './AccordionItemActas';
import { apiUrl } from '../config/runtime';
import { t } from '../config/i18n';

function AccordionActas({ curso }) {
    const [items, setItems] = useState([]);
    const [idCurso, setIdCurso] = useState(null);

    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const peticionIdCurso = await fetch(apiUrl(`/sql/curso/nombre/${encodeURIComponent(curso)}`));
                const idCursoData = await peticionIdCurso.json();
                const cursoId = idCursoData.id;
                setIdCurso(cursoId);

                const response = await fetch(apiUrl(`/sql/estudiante/${encodeURIComponent(cursoId)}`));
                const data = await response.json();

                setItems(data.estudiantes);

            } catch (error) {
                console.error('Error al obtener solicitudes:', error);
                alert('Error al cargar las solicitudes. Por favor, inténtalo de nuevo más tarde.');
            }
        };

        if (curso) {
            fetchEstudiantes();
        }
    }, [curso]);

    // Función para cambiar el estado
    const handleEstadoChange = (id, nuevoEstado) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.NIA === id ? { ...item, estado_curso: nuevoEstado } : item
            )
        );
        // Aquí también deberías llamar a la API para actualizar el estado en el backend
    };

    const handleAccept = (id) => {
        handleEstadoChange(id, 'aceptada');
    };

    const handleReject = (id) => {
        handleEstadoChange(id, 'rechazada');
    };

    // Filtrar ítems por estado_curso
    const pendingItems = items.filter(item => item.estado_curso === 'en proceso');
    const acceptedItems = items.filter(item => item.estado_curso === 'aceptada');

    return (
        <>
            <h3 className="titulo" style={{ textAlign: "left", paddingBottom: "1%", paddingLeft: "1%", fontWeight: "800", color: "var(--tenant-primary, #0153CE)" }}>
                {t("Estudiantes Pendientes", "Étudiants en attente")}
            </h3>
            <div className="accordion" id="pendingAccordion">
                {pendingItems.length > 0 ? (
                    pendingItems.map(item => (
                        <AccordionItemActas key={item.NIA} {...item} curso_id={idCurso} curso={curso} onAccept={handleAccept} onReject={handleReject} estado={item.estado_curso} />
                    ))
                ) : (
                    <p>{t("No hay estudiantes pendientes", "Aucun étudiant en attente")}</p>
                )}
            </div>

            <h3 className="titulo" style={{ textAlign: "left", paddingBottom: "1%", paddingLeft: "1%", paddingTop: "2%", fontWeight: "800", color: "#6cd574" }}>
                {t("Aprobados", "Approuvés")}
            </h3>
            <div className="accordion" id="acceptedAccordion">
                {acceptedItems.length > 0 ? (
                    acceptedItems.map(item => (
                        <AccordionItemActas key={item.NIA}  {...item} curso_id={idCurso} curso={curso} onAccept={handleAccept} onReject={handleReject} estado={item.estado_curso} />
                    ))
                ) : (
                    <p>{t("No hay estudiantes aceptados", "Aucun étudiant accepté")}</p>
                )}
            </div>

        </>
    );
}

export default AccordionActas;