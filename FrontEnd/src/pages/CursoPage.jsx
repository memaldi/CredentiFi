import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { runtimeConfig } from "../config/runtime";

const CursoPage = () => {
 
  const navigate = useNavigate();

  const location = useLocation();
  const { nombre, descripcion, duracion, requisitos } = location.state || {};
  const handleButtonClick = () => {
    console.log("Requisitos:", requisitos);
    navigate("/prerequisites", {state: { nombre, descripcion, duracion, requisitos }});
  };

  if (runtimeConfig.tenant === "strasbourg") {
    return (
      <>
        <div className="unistra-curso-header">
          <div className="unistra-breadcrumb">
            <a href="/">Accueil</a>
            <span>›</span>
            <a href="/">Formations</a>
            <span>›</span>
            {nombre}
          </div>
          <h1>{nombre}</h1>
          <span className="unistra-badge">Édition 2025 — Inscriptions ouvertes</span>
        </div>

        <div className="unistra-curso-body">
          <div className="unistra-curso-description">
            <h2>À propos de cette formation</h2>
            <p>{descripcion}</p>
          </div>

          <div className="unistra-curso-sidebar">
            <div className="unistra-info-card">
              <h3>Durée</h3>
              <p>{duracion} heures</p>
            </div>
            <div className="unistra-info-card">
              <h3>Faculté</h3>
              <p>Droit, science politique et gestion</p>
            </div>
            <div className="unistra-info-card">
              <h3>Lieu</h3>
              <p>Université de Lumière — Paris</p>
            </div>
            <div className="unistra-info-card">
              <h3>Langue</h3>
              <p>Français</p>
            </div>
            <div className="unistra-info-card">
              <h3>Tarif</h3>
              <p>Gratuit pour les participants</p>
            </div>
            <button className="unistra-enroll-btn" onClick={handleButtonClick}>
              Faire une demande d&apos;inscription
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="cabecera">
        <div className="cabeceraPrograma">
          <div className="container">
            <nav className="caminoMigas">
              <ul>
                <li>
                  <a href="http://www.deusto.es/">Home</a>
                </li>
                <li>
                  <a href="/es/inicio/estudia/estudios/executive-education/programa-transformacion-digital-pyme">
                    Estudia
                  </a>
                </li>
                <li>
                  <a href="/es/inicio/estudia/estudios">Estudios</a>
                </li>
                <li>
                  <a href="/es/inicio/estudia/estudios/executive-education">
                    Executive education
                  </a>
                </li>
                <li>
                  <span>{nombre}</span>
                </li>
              </ul>
            </nav>
            <div className="tituloCabecera">
              <h1 style={{ color: "black" }}>
                {nombre}
                <span>EDICIÓN 2025 - MATRICULACIÓN ABIERTA</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="exploraSeccion plegado">
        <div className="container">
          <div className="exploraBox">
            <h2 className="explora">
              <img
                src="https://www.deusto.es/estaticos/ud/img/cerrarModal.svg"
                alt="Cerrar explora esta sección"
                className=""
              />
              <img
                className="mostrar"
                src="https://www.deusto.es/estaticos/ud/img/hamburguesaSeccion.svg"
                alt="Hamburguesa explora esta secciÃ³n"
              />
              MENÚ <span>/ Sobre el Programa</span>
            </h2>
          </div>
          <div className="exploraSeccionesN2" style={{ display: "none" }}>
            <div className="exploraContenido">
              <div className="container">
                <div className="row" style={{ minHeight: 287 }}>
                  <div className="enlacesSeccion">
                    <div className="subpaginasSeccion">
                      <ul>
                        <li>
                          <a
                            href="/es/inicio/estudia/estudios/executive-education/programa-transformacion-digital-pyme"
                            title="Sobre el Programa"
                            className="seccion-1 seccionActiva"
                          >
                            Sobre el Programa
                          </a>
                          <ul
                            className="subSeccion-1 seccionActiva"
                            style={{ minHeight: 287 }}
                          >
                            <li>
                              <a href="#programa-gratuito">Programa Gratuito</a>
                            </li>
                            <li>
                              <a href="#perfil-participante">Dirigido a</a>
                            </li>
                            <li>
                              <a href="#beneficios">
                                ¿Qué obtienes con el programa?
                              </a>
                            </li>
                            <li>
                              <a href="#metodo">
                                El método de Deusto Business School
                              </a>
                            </li>
                            <li>
                              <a href="#cotenido">Contenido del Programa</a>
                            </li>
                            <li>
                              <a href="#inscripcion">Proceso de inscripción</a>
                            </li>
                            <li>
                              <a href="#mas-informacion">Más Información</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="botonesSeccion" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="contents">
      
        <div className="sobreGrado">
          <div className="container">
            <div className="row">
              <div className="descrInfoGrado col-lg-8">
                <div className="tituloSeccion">
                  <h2>
                    Empieza hoy, transforma tu mañana
                  </h2>
                </div>
                <p>
                  {descripcion}
                </p>
                <div className="row">
                  <div className="col-lg-6 destacadoInfoGrado">
                    <img
                      width={76}
                      height={76}
                      data-src="https://www.deusto.es/estaticos/ud/iconNucleo/calendario.svg"
                      className="lazyloaded"
                      alt="null"
                      src="https://www.deusto.es/estaticos/ud/iconNucleo/calendario.svg"
                    />
                    <h3>Cuándo</h3>
                    <p>Mayo 2025 | Bilbao</p>
                  </div>
                  <div className="col-lg-6 destacadoInfoGrado">
                    <img
                      width={76}
                      height={76}
                      data-src="https://www.deusto.es/estaticos/ud/iconNucleo/pencil.svg"
                      className="lazyloaded"
                      alt="null"
                      src="https://www.deusto.es/estaticos/ud/iconNucleo/pencil.svg"
                    />
                    <h3>Inscripción</h3>
                    <p>
                      <button className="botonAzul" onClick={() => handleButtonClick()}>Solicita más información</button>
                    </p>
                  </div>
                  <div className="col-lg-6 destacadoInfoGrado">
                    <img
                      width={76}
                      height={76}
                      data-src="https://www.deusto.es/estaticos/ud/iconNucleo/time-clock.svg"
                      className="lazyloaded"
                      alt="null"
                      src="https://www.deusto.es/estaticos/ud/iconNucleo/time-clock.svg"
                    />
                    <h3>Duración</h3>
                    <p data-testid="duracion-texto">
                      {duracion} horas de formación presencial o en presencia virtual.
                    </p>
                  </div>
                  <div className="col-lg-6 destacadoInfoGrado">
                    <img
                      width={76}
                      height={76}
                      data-src="https://www.deusto.es/estaticos/ud/iconNucleo/currency-euro.svg"
                      className="lazyloaded"
                      alt="null"
                      src="https://www.deusto.es/estaticos/ud/iconNucleo/currency-euro.svg"
                    />
                    <h3>Programa gratuito</h3>
                    <p>
                      Esta formación será gratuita para el participante 
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 offset-lg-1 caracInfoGrado">
                <ul>
                  <li>
                    <h4>Lugar:</h4>
                    <p>Campus Bilbao</p>
                    <p>Campus San Sebastián</p>
                    <p>Sede Vitoria-Gasteiz</p>
                  </li>
                  <li>
                    <h4>Titulación:</h4>
                    <p>{nombre}</p>
                  </li>
                  <li>
                    <h4>Idioma:</h4>
                    <p>Español</p>
                  </li>
                  <li>
                    <h4>Proceso de ingreso:</h4>
                    <p>Proceso de ingreso abierto</p>
                  </li>
                  <li>
                    <h4>Facultad:</h4>
                    <a
                      title="DBS"
                      href="https://www.deusto.es/es/inicio/somos-deusto/facultades/deusto-business-school"
                      target="_blank"
                    >
                      Deusto Ingeniería
                    </a>
                  </li>
                  <li>
                    <h4>Comparte:</h4>
                    <ul className="comparteContenido">
                      <li>
                        <a
                          href="https://twitter.com/intent/tweet?&via=deusto&text=Programa+Transformaci%C3%B3n+Digital+para+la+PYME&url=https%3A%2F%2Fwww.deusto.es%2Fes%2Finicio%2Festudia%2Festudios%2Fexecutive-education%2Fprograma-transformacion-digital-pyme"
                          target="_blank"
                          title="Twitter"
                        >
                          <i
                            className="fa-brands fa-x-twitter"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.facebook.com/sharer.php?u=https://www.deusto.es/es/inicio/estudia/estudios/executive-education/programa-transformacion-digital-pyme&p[title]=Programa Transformación Digital para la PYME&p[summary]="
                          target="_blank"
                          title="Facebook"
                        >
                          <i className="fab fa-facebook-f" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.linkedin.com/shareArticle?mini=true&url=https://www.deusto.es/es/inicio/estudia/estudios/executive-education/programa-transformacion-digital-pyme&title=Programa Transformación Digital para la PYME&summary="
                          target="_blank"
                          title="LinkedIn"
                        >
                          <i
                            className="fab fa-linkedin-in"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:?subject=Programa Transformación Digital para la PYME - Universidad de Deusto&body=https://www.deusto.es/es/inicio/estudia/estudios/executive-education/programa-transformacion-digital-pyme"
                          title="E-mail"
                        >
                          <i className="fas fa-envelope" aria-hidden="true" />
                        </a>
                      </li>
                      <li className="whatsHide">
                        <a
                          href="whatsapp://send?text=https://www.deusto.es/es/inicio/estudia/estudios/executive-education/programa-transformacion-digital-pyme?timestamp=1711449508837"
                          title="Whatsapp"
                          target="_blank"
                        >
                          <i className="fab fa-whatsapp" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>        
      </section>                 
    </>
  );
};
export default CursoPage;
