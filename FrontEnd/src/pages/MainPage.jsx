import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiUrl } from "../config/runtime";

const MainPage = () => {
    const [cursos, setCursos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [cargando, setCargando] = useState(false);
    const [hayMas, setHayMas] = useState(true);

    const cargarCursos = (paginaActual) => {
        setCargando(true);
        fetch(apiUrl(`/sql/cursos?page=${paginaActual}&limit=10`))
            .then(res => res.json())
            .then(data => {
                const nuevosCursos = data.cursos || []; 
    
                if (nuevosCursos.length === 0) {
                    setHayMas(false); 
                } else {
                    setCursos(prev => {
                        const existentes = new Set(prev.map(c => c.id)); 
                        const nuevosSinDuplicar = nuevosCursos.filter(c => !existentes.has(c.id));
                        return [...prev, ...nuevosSinDuplicar];
                    });
                }
            })
            .catch(err => console.error(err))
            .finally(() => setCargando(false));
            
    };
    

    useEffect(() => {
        cargarCursos(pagina);

        
    }, [pagina]);


    const navigate = useNavigate();

    const handleButtonClick = (nombre, descripcion, duracion, requisitos) => {
        console.log("Requisitos:", requisitos);
        navigate("/curso", {state: { nombre, descripcion, duracion, requisitos }}); 
    };

    

    return (
        <>
            
            <div className="cabecera">
                <div
                    className="cabeceraEstatica"
                    style={{
                        backgroundImage:
                            "linear-gradient(0deg, rgba(3, 25, 57, .3) 0%, rgba(37,37,37,0) 100%), linear-gradient(206.57deg, rgba(2,16,35,0) 0%, rgba(3, 25, 57, .5) 100%), url(/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1600622578836&ssbinary=true)"
                    }}
                >
                    <div className="container">
                        <nav className="caminoMigas">
                            <ul>
                                <li>
                                    <a href="http://www.deusto.es/">Home</a>
                                </li>
                                <li>
                                    <span>Cursos</span>
                                </li>
                            </ul>
                        </nav>
                        <div className="tituloCabecera">
                            <h1>
                                ¿Qué quieres estudiar?
                                <span />
                            </h1>
                            <div id="buscadorProgramasCabecera">
                                <form
                                    action="/es/inicio/estudia/estudios"
                                    method="post"
                                    acceptCharset="utf-8"
                                    name="formEstudios"
                                    id="formEstudios"
                                >
                                    <input
                                        type="HIDDEN"
                                        name="_authkey_"
                                        defaultValue="07B7ECE2D87D2EF86E46D9E4011187C341502D68F5B9DA56FC95F7964E1BDF99721BC9F952563D262A48A794004D3482"
                                    />
                                    <input type="hidden" name="_charset_" defaultValue="UTF-8" />
                                    <input type="hidden" name="cid" defaultValue={1578932590343} />
                                    <input type="hidden" name="c" defaultValue="Page" />
                                    <input
                                        type="hidden"
                                        name="pagename"
                                        defaultValue="deusto/Page/UD_EstudiosTPL"
                                    />
                                    <input type="hidden" name="site" defaultValue="deusto" />
                                    <input type="hidden" name="language" defaultValue="es" />
                                    <input
                                        type="hidden"
                                        name="localizator"
                                        defaultValue="1578932541600;1578932630564;1578932590343"
                                    />
                                    <input
                                        id="tl"
                                        name="tl"
                                        placeholder="Encuentra tu curso"
                                        type="text"
                                        defaultValue=""
                                    />
                                    <button type="submit">
                                        <img
                                            src="https://www.deusto.eus/estaticos/ud/img/lupa.svg"
                                            alt="Lupa para buscar"
                                        />
                                    </button>
                                </form>
                                <div id="suggest-results-estudios" name="suggest-results-estudios" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="buscadorProgramas">
                <div className="container">
                    <div className="row" id="container-resultados-estudios">
                        <div className="col-12 col-lg-3" id="acordeonBuscador">
                            <input
                                type="hidden"
                                name="sugerencia"
                                id="sugerencia"
                                defaultValue=""
                            />
                            <div id="headingTitulo" className="bloqueAcordeon filtroMV">
                                <h3
                                    aria-controls="collapseTitulo"
                                    aria-expanded="false"
                                    className="collapsed"
                                    data-target="#collapseTitulo"
                                    data-toggle="collapse"
                                >
                                    <span>Nuestros programas</span>
                                </h3>
                            </div>
                            <div
                                aria-labelledby="headingTitulo"
                                className="collapse"
                                data-parent="#acordeonBuscadorMV"
                                id="collapseTitulo"
                            >
                                <div className="bloqueAcordeon">
                                    <div id="headingOne">
                                        <h3
                                            aria-controls="collapseOneBusc"
                                            aria-expanded="false"
                                            className="collapsed"
                                            data-target="#collapseOneBusc"
                                            data-toggle="collapse"
                                        >
                                            <span>Tipo de estudio</span>
                                        </h3>
                                    </div>
                                </div>
                                <div className="bloqueAcordeon">
                                    <div id="headingTwo">
                                        <h3
                                            aria-controls="collapseTwoBusc"
                                            aria-expanded="false"
                                            className="collapsed"
                                            data-target="#collapseTwoBusc"
                                            data-toggle="collapse"
                                        >
                                            <span>Dónde</span>
                                        </h3>
                                    </div>
                                </div>
                                <div className="bloqueAcordeon">
                                    <div id="headingThree">
                                        <h3
                                            aria-controls="collapseThreeBusc"
                                            aria-expanded="false"
                                            className="collapsed"
                                            data-target="#collapseThreeBusc"
                                            data-toggle="collapse"
                                        >
                                            <span>Área</span>
                                        </h3>
                                    </div>
                                </div>
                                <div className="bloqueAcordeon">
                                    <div id="headingFour">
                                        <h3
                                            id="h3_collapseFourBusc"
                                            aria-controls="collapseFourBusc"
                                            aria-expanded="false"
                                            className="collapsed"
                                            data-target="#collapseFourBusc"
                                            data-toggle="collapse"
                                        >
                                            <span>Modalidad</span>
                                        </h3>
                                    </div>
                                </div>
                                <div className="bloqueAcordeon">
                                    <div id="headingFive">
                                        <h3
                                            id="h3_collapseFiveBusc"
                                            aria-controls="collapseFiveBusc"
                                            aria-expanded="false"
                                            className="collapsed"
                                            data-target="#collapseFiveBusc"
                                            data-toggle="collapse"
                                        >
                                            <span>Dedicación</span>
                                        </h3>
                                    </div>
                                </div>
                                <div className="bloqueAcordeon">
                                    <div id="headingSix">
                                        <h3
                                            id="h3_collapseSixBusc"
                                            aria-controls="collapseSixBusc"
                                            aria-expanded="false"
                                            className="collapsed"
                                            data-target="#collapseSixBusc"
                                            data-toggle="collapse"
                                        >
                                            <span>Idioma de impartición</span>
                                        </h3>
                                    </div>
                                </div>
                                <div className="bloqueAcordeon">
                                    <div id="headingSeven">
                                        <h3
                                            id="h3_collapseSevenBusc"
                                            aria-controls="collapseSixBusc"
                                            aria-expanded="false"
                                            className="collapsed"
                                            data-target="#collapseSevenBusc"
                                            data-toggle="collapse"
                                        >
                                            <span>Fecha de inicio</span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-12 pIzq resultadosBuscadorProgramas">
                            <div className="listaResultadosBuscador" id="resultados-estudios">
                                <p className="titResultado">Cursos</p>
                                {cursos.map((curso, idx) => (
                                    <a
                                        key={idx}
                                        onClick={() => handleButtonClick(curso.nombre, curso.descripcion, curso.duracion, curso.requisitos)}
                                        className="titulacionRelacionada"
                                        target="_blank"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="cabeceraTit">
                                            <div>
                                                <h3>{curso.nombre}</h3>
                                            </div>
                                        </div>
                                        <div className="caracteristicasTit">
                                            <div className="row">
                                                <div className="col-lg-8">
                                                    <ul>
                                                        <li>
                                                            <img
                                                                width={24}
                                                                height={20}
                                                                src="https://www.deusto.eus/estaticos/ud/img/titulacionesRelacionadas/birrete.svg"
                                                                alt=""
                                                            />
                                                            <span>Curso</span>
                                                        </li>
                                                        <li>
                                                            <img
                                                                width={24}
                                                                height={24}
                                                                src="https://www.deusto.eus/estaticos/ud/img/titulacionesRelacionadas/check.svg"
                                                                alt=""
                                                            />
                                                            <span>Proceso de ingreso abierto</span>
                                                        </li>
                                                        <li>
                                                            <img
                                                                width={24}
                                                                height={22}
                                                                src="https://www.deusto.eus/estaticos/ud/img/titulacionesRelacionadas/reloj.svg"
                                                                alt=""
                                                            />
                                                            <span>{curso.duracion}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-lg-4">
                                                    <ul>
                                                        <li>
                                                            <img
                                                                width={18}
                                                                height={24}
                                                                src="https://www.deusto.eus/estaticos/ud/img/titulacionesRelacionadas/ubicacion.svg"
                                                                alt=""
                                                            />
                                                            <div>
                                                                <span>Campus Bilbao</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                                <div className="paginacion">
                                    {hayMas ? (
                                        <input
                                            type="button"
                                            id="mas-resultados"
                                            data-testid="boton-cargar-mas"
                                            value={cargando ? "Cargando..." : "Cargar más"}
                                            onClick={() => setPagina(prev => prev + 1)}
                                            disabled={cargando}
                                        />
                                    ) : (
                                        <p>No hay más resultados</p>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MainPage;
