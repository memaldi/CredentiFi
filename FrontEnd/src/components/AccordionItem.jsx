import React, { useState, useEffect } from 'react';
import AccordionTable from "./AccordionTable";
import CredentialTable from "./CredentialTable";
import ModalSecretary from './ModalSecretary';
import { apiUrl, runtimeConfig } from '../config/runtime';
import { t } from '../config/i18n';

// Robustly extract the holder DID from a MongoDB credential document.
// Tries vc.credentialSubject.id first (Deusto style), then falls back to
// the VP subject/issuer fields (UNILUM style).
const extractDidFromCredential = (data) => {
    const results = data?.policyResults?.results ?? [];
    for (const r of results) {
        for (const p of (r?.policyResults ?? [])) {
            const result = p?.result;
            if (!result || typeof result !== 'object') continue;
            const did =
                result?.vc?.credentialSubject?.id ||
                result?.sub ||
                result?.iss;
            if (typeof did === 'string' && did.startsWith('did:')) return did;
        }
    }
    return undefined;
};

function AccordionItem({ nombre, primer_apellido, segundo_apellido, correo, fechaNacimiento, id, dni, curso, curso_id, estado, credenciales, onAccept, onReject }) {
    const [credencialesData, setCredencialesData] = useState([]);
    const [estudiantedid, setEstudianteDid] = useState([]);
    const [estudianteIdCredenciales, setEstudianteIdCredenciales] = useState([]);
    const targetId = `#${id}`;
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [estudianteData, setEstudianteData] = useState({
        nombre: nombre,
        primer_apellido: primer_apellido,
        segundo_apellido: segundo_apellido,
        correo: `${primer_apellido.toLowerCase()}.${nombre.toLowerCase()}@${runtimeConfig.allowedEmailDomain}`,
        dni: dni,
        did: estudiantedid,
        fecha_nacimiento: fechaNacimiento,
        cursos: [curso_id],
        credenciales: [estudianteIdCredenciales]
    });

    useEffect(() => {
        const fetchCredentialDetails = async () => {
            try {

                const fetchedData = await Promise.all(
                    credenciales.map(async (credencial) => {

                        const response = await fetch(apiUrl(`/mongo/credenciales/${encodeURIComponent(credencial)}`));
                        const data = await response.json();
                        const nombresCredenciales = data.tokenResponse.presentation_submission.descriptor_map.map(descriptor => descriptor.id);
                        return {
                            id: data._id,
                            nombre_credencial: nombresCredenciales,
                            did: extractDidFromCredential(data)
                        };
                    })
                );
                console.log(fetchedData);
                const nombresCredenciales = fetchedData.map(item => item.nombre_credencial);
                setCredencialesData(nombresCredenciales);



                if (fetchedData.length > 0) {
                    setEstudianteDid(fetchedData[0].did);
                    setEstudianteIdCredenciales(fetchedData[0].id);
                } else {
                    setEstudianteDid(undefined);
                    setEstudianteIdCredenciales(undefined);
                }
                setEstudianteData(prevData => ({
                    ...prevData,
                    did: fetchedData[0].did,
                    credenciales: fetchedData.map(item => item.id)
                }));

            } catch (error) {
                console.error("Error al obtener los detalles de las credenciales:", error);
                alert("Error al cargar las credenciales. Por favor, inténtalo de nuevo más tarde.");
            }
        };

        if (credenciales && credenciales.length > 0) {
            fetchCredentialDetails();
        }
    }, [credenciales]);

    const añadirCredenciales = async (nia, credenciales) => {
        console.log(credenciales);
        if (!nia) {
            console.warn('No se proporcionó NIA para añadir credenciales.');
            return;
        }
        if (!credenciales || credenciales.length === 0) {
            console.warn('No se proporcionaron credenciales para añadir.');
            return;
        }

        try {
            const response = await fetch(apiUrl(`/sql/estudiante/${nia}/credenciales`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( credenciales )
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Credenciales añadidas exitosamente:', data);

            } else {
                const errorData = await response.json();
                console.error('Error al añadir credenciales:', errorData);
                alert('Error al añadir credenciales. Por favor, inténtalo de nuevo más tarde.');

            }
        } catch (error) {
            console.error('Error de red al añadir credenciales:', error);
            alert('Error de red al añadir credenciales. Por favor, inténtalo de nuevo más tarde.');

        }
    };

    const crearEstudianteEnBackend = async () => {
        try {
            const response = await fetch(apiUrl('/sql/estudiante'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(estudianteData),
            });
            console.log(estudianteData);

            if (response.ok) {
                const data = await response.json();
                console.log('Estudiante creado:', data);
            } else {
                const errorData = await response.json();
                console.error('Error al crear estudiante:', errorData);
                alert('Error al crear estudiante. Por favor, inténtalo de nuevo más tarde.');
                if (errorData.detail?.includes("ya existe")) {
                    console.log('El estudiante ya existe, llamando a añadirCredenciales con el NIA.');
                    const niaMatch = errorData.detail.match(/NIA '(\w+)' ya existe/);
                    if (niaMatch && niaMatch[1]) {
                        const existingNIA = niaMatch[1];
                        añadirCredenciales(existingNIA, estudianteData.credenciales); // Asegúrate de pasar las credenciales
                    } else {
                        console.warn('No se pudo extraer el NIA del mensaje de error.');
                        añadirCredenciales(null, estudianteData.credenciales);
                    }
                } else {
                    console.error('Otro error al crear estudiante:', errorData);
                    alert('Error al crear estudiante. Por favor, inténtalo de nuevo más tarde.');
                }

            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error de red al crear estudiante. Por favor, inténtalo de nuevo más tarde.');

        }
    };

    const handleAccept = () => {
        setShowAcceptModal(true);
    };

    const handleReject = () => {
        setShowRejectModal(true);
    };

    const handleCloseAcceptModal = () => {
        setShowAcceptModal(false);
        crearEstudianteEnBackend();
    };

    const handleCloseRejectModal = () => {
        setShowRejectModal(false);
    };

    const confirmAccept = async () => {
        try {
            const response = await fetch(apiUrl(`/sql/solicitud/${id}`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: 'aceptada' }),
            });

            if (response.ok) {
                //setEstado('aceptada');
            } else {
                console.error('Error al aceptar la solicitud');
                alert('Error al aceptar la solicitud. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error de red al aceptar la solicitud:', error);
            alert('Error de red al aceptar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
        onAccept(id);
        setShowAcceptModal(false);
    };

    const confirmReject = async () => {
        try {
            const response = await fetch(apiUrl(`/sql/solicitud/${id}`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: 'rechazada' }),
            });

            if (response.ok) {

            } else {
                console.error('Error al rechazar la solicitud');
                alert('Error al rechazar la solicitud. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error de red al rechazar la solicitud:', error);
            alert('Error de red al rechazar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
        onReject(id);
        handleCloseRejectModal();
    };


    return (
        <div className="accordion-item" style={{ background: "#EBEBEB" }}>
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={targetId} aria-expanded="false" aria-controls="collapseOne">
                    {nombre} {primer_apellido} - {correo} - {id}
                </button>
            </h2>
            <div id={id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <AccordionTable name={nombre} surname={primer_apellido} email={correo} program={curso} />
                    <br></br>
                    <h4>{t("Credenciales proporcionadas:", "Identifiants fournis :")}</h4>
                    <br></br>

                    {credencialesData && credencialesData.length > 0 && Array.isArray(credencialesData[0]) ? (
                        <CredentialTable names={credencialesData[0]} />
                    ) : (
                        <p>{t("No hay credenciales proporcionadas.", "Aucun identifiant fourni.")}</p>
                    )}

                    {estado === 'pendiente' && (
                        <div style={{ marginLeft: "40%" }}>
                            <button className="btn btn-primary" type="button" style={{ marginRight: "5%" }} onClick={handleAccept}>{t("Aceptar", "Accepter")}</button>
                            <button className="btn btn-danger" type="button" onClick={handleReject}>{t("Rechazar", "Refuser")}</button>
                        </div>
                    )}
                </div>
            </div>
            {/* Modal para Accept */}
            {showAcceptModal && (
                <ModalSecretary
                    title={t("Cuidado", "Attention")}
                    description={t("¿Estas seguro de que quieres aceptar esta solicitud?", "Êtes-vous sûr de vouloir accepter cette demande ?")}
                    id="Accept"
                    show={showAcceptModal}
                    handleClose={handleCloseAcceptModal}
                    handleConfirm={confirmAccept}
                />
            )}
            {/* Modal para Reject */}
            {showRejectModal && (
                <ModalSecretary
                    title={t("Cuidado", "Attention")}
                    description={t("¿Estas seguro de que quieres rechazar esta solicitud?", "Êtes-vous sûr de vouloir refuser cette demande ?")}
                    id="Reject"
                    show={showRejectModal}
                    handleClose={handleCloseRejectModal}
                    handleConfirm={confirmReject}
                />
            )}
        </div>
    );
}

export default AccordionItem;
