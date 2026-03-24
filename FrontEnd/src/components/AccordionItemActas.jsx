import React, { useState, useEffect } from 'react';
import AccordionTable from "./AccordionTable";

import ModalSecretary from './ModalSecretary';
import ModalActas from './ModalActas';
import { apiUrl } from '../config/runtime';

function AccordionItemActas({ nombre, primer_apellido, segundo_apellido, correo, NIA, dni, curso, curso_id, estado, credenciales, onAccept, onReject }) {
    const targetId = `#${NIA}`;
    const [showAcceptModal, setShowAcceptModal] = useState(false);

    const handleAccept = () => {
        setShowAcceptModal(true);
    };


    const handleCloseAcceptModal = () => {
        setShowAcceptModal(false);
    };

    const confirmAccept = async () => {
        try {
            const response = await fetch(
                apiUrl(`/sql/estudiante/${NIA}/curso/${curso_id}/estado?nuevo_estado=aceptada`),
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                console.log('Estado actualizado a aceptada');
                setShowAcceptModal(false);
                
                if (onAccept) {
                    onAccept(NIA);
                }
            } else {
                console.error('Error al actualizar el estado:', response.status);
                alert('Error al aceptar el acta. Por favor, inténtalo de nuevo más tarde.');
                
            }
        } catch (error) {
            console.error('Error al comunicarse con el servidor:', error);
            alert('Error al aceptar el acta. Por favor, inténtalo de nuevo más tarde.');
            
        }
    };



    return (
        <div className="accordion-item" style={{ background: "#EBEBEB" }}>
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={targetId} aria-expanded="false" aria-controls="collapseOne">
                    {nombre} {primer_apellido} - {correo} - {NIA}
                </button>
            </h2>
            <div id={NIA} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <AccordionTable name={nombre} surname={primer_apellido} email={correo} program={curso} />
                    {estado === 'en proceso' && (
                        <div style={{ marginLeft: "40%" }}>
                            <button className="btn btn-primary" type="button" style={{ marginLeft: "5%" }} onClick={handleAccept}>Aceptar</button>
                        </div>
                    )}
                </div>
            </div>
            {/* Modal para Accept */}
            {showAcceptModal && (
                <ModalActas
                    title="Cuidado"
                    description="¿Estas seguro de que quieres aceptar este acta?"
                    id="Accept"
                    show={showAcceptModal}
                    handleClose={handleCloseAcceptModal}
                    handleConfirm={confirmAccept}  
                />
            )}
        </div>
    );
}

export default AccordionItemActas;
