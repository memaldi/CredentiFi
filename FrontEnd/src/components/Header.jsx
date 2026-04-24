import React from "react";
import "../styles/letras.css";
import "../styles/estilos.min.css";
import "../styles/owl.carousel.min.css";
import "../styles/owl.theme.default.min.css";
import { runtimeConfig } from "../config/runtime";
import HeaderLumiere from "./HeaderLumiere";

const HeaderDeusto = () => {
  return (
    <header>
      <nav className="menuEscritorio">
        <div className="top-bar">
          <div className="container">
            <ul className="navIdiomas">
              <li className="elementoActivo">es</li>
              <li>
                <a href="https://www.deusto.eus/eu/hasiera/deusto-gara/fakultateak/ingeniaritza/egungo-ikasleak/egutegia-ordutegiak-azterketen-datak">
                  eu
                </a>
              </li>
              <li>
                <a href="https://www.deusto.es/en/home/we-are-deusto/faculties/engineering/current-students/calendar-schedule-exam-dates">
                  en
                </a>
              </li>
            </ul>
            <ul className="navSoy">
              <li>
                <a
                  href="/es/inicio/nuevos-estudiantes-grado"
                  title="nuevo estudiante grado"
                >
                  Nuevo estudiante de <span>grado</span>
                </a>
              </li>
              <li>
                <a
                  href="/es/inicio/nuevos-estudiantes-de-master"
                  title="Nuevos estudiantes de master"
                >
                  Nuevo estudiante de <span>postgrado</span>
                </a>
              </li>
              <li>
                <a
                  href="/es/inicio/executive-education-deusto"
                  title="Executive education"
                >
                  <span>Executive Education</span>
                </a>
              </li>
            </ul>
            <div className="navLogin">
              <span>
                Soy...{" "}
                <img
                  width={16}
                  height={16}
                  src="https://www.deusto.es/estaticos/ud/img/usuario.svg"
                  alt="Icono de usuario"
                />
              </span>
              <ul className="navPerfiles" style={{ display: "none" }}>
                <li>
                  <a
                    href="https://estudiantes.deusto.es/"
                    title="Estudiante de Deusto"
                    target="_blank"
                  >
                    Estudiante
                  </a>
                </li>
                <li>
                  <a
                    href="https://open.dbs.deusto.es/login/index.php"
                    title="Participante de Executive Education"
                    target="_blank"
                  >
                    Participante Executive{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://alumni.deusto.es/s/?language=es"
                    title="Deusto Alumni"
                    target="_blank"
                  >
                    Alumni
                  </a>
                </li>
                <li>
                  <a
                    href="https://empresas.deusto.es/empresas/s/?language=es"
                    title="Deusto Empresas"
                    target="_blank"
                  >
                    Empresa
                  </a>
                </li>
                <li>
                  <a
                    href="https://intranet.deusto.es/"
                    title="Personal de Deusto"
                    target="_blank"
                  >
                    Personal Deusto
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="navegacionEscritorio">
          <div className="container">
            <a href="http://www.deusto.es/">
              <img
                width={168}
                height={50}
                src="https://www.deusto.es/estaticos/ud/img/logoDeustoMenu.png"
                alt="Logo Universidad Deusto"
              />
            </a>
            <ul className="primerNivel">
              <li className="mglEspecial">
                <a className="" href="/es/inicio/somos-deusto">
                  Somos Deusto
                  <img
                    width={10}
                    height={4}
                    src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                    alt=""
                  />
                </a>
                <div className="subpaginas">
                  <div className="container">
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/somos-deusto/la-universidad">
                          La Universidad
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/la-universidad/mision-identidad">
                          Misión e identidad
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/la-universidad/plan-estrategico">
                          Plan estratégico
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/la-universidad/rankings">
                          Rankings
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/la-universidad/empresas-organizaciones">
                          Empresas y organizaciones
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/la-universidad/transparencia">
                          Transparencia
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/la-universidad/agenda2030">
                          Agenda 2030
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/la-universidad/campus-social">
                          Campus social
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/la-universidad/beato-garate">
                          Beato Gárate
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/somos-deusto/facultades">
                          Facultades
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/facultades/ciencias-salud">
                          Ciencias de la Salud
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/facultades/ciencias-sociales-humanas">
                          Ciencias Sociales y Humanas
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/facultades/derecho">
                          Derecho
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/facultades/deusto-business-school">
                          Deusto Business School
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/facultades/educacion-deporte">
                          Educación y Deporte
                        </a>
                      </li>
                      <li>
                        <a href="https://www.deusto.es/es/inicio/somos-deusto/facultades/ingenieria">
                          Ingeniería
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/facultades/teologia">
                          Teología
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/somos-deusto/estrategia-academica">
                          Estrategia académica
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/estrategia-academica/modelo-deusto-de-formacion">
                          Modelo formación de Deusto
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/estrategia-academica/formacion-dual">
                          Modelo Dual Deusto
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/estrategia-academica/modelo-online">
                          Modelo Deusto online
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/estrategia-academica/innovacion-docente">
                          Innovación docente
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/estrategia-academica/calidad">
                          Gestión de calidad
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/somos-deusto/equipo">Equipo</a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/equipo/autoridades">
                          Autoridades
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/equipo/profesores">
                          Profesorado
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/equipo/investigadores">
                          Personal investigador
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/equipo/aldezle">
                          Aldezle, defensor universitario
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/equipo/trabaja-deusto">
                          Trabaja en Deusto
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/somos-deusto/centros-universitarios">
                          Centros universitarios
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/centros-universitarios/campus-sedes">
                          Campus y sedes
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/centros-universitarios/centros-adscritos">
                          Centros adscritos
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/centros-universitarios/catedras">
                          Cátedras
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/centros-universitarios/institutos">
                          Institutos
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/somos-deusto/centros-universitarios/otros-centros">
                          Otros centros
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="mglEspecial">
                <a className="" href="/es/inicio/estudia">
                  Estudia
                  <img
                    width={10}
                    height={4}
                    src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                    alt=""
                  />
                </a>
                <div className="subpaginas">
                  <div className="container">
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/estudia/estudios">Estudios</a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/estudios/grados">
                          Grados y dobles grados
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/estudios/masteres">
                          Másteres y especializaciones
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/estudios/executive-education">
                          Executive Education
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/estudios/doctorados">
                          Doctorados
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/estudios/cursos-seminarios">
                          Cursos y Seminarios
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/estudios/idiomas">
                          Idiomas
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/estudios/study-abroad">
                          Study abroad
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/estudios/summer-school">
                          Summer School
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/estudia/puertas-abiertas">
                          Puertas Abiertas
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/puertas-abiertas/grados">
                          Grados
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/puertas-abiertas/posgrados">
                          Posgrados
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/estudia/admision">Admisión</a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/admision/admision-grados">
                          Grados
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/admision/admision-posgrado">
                          Posgrados
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/admision/admision-doctorados">
                          Doctorados
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/admision/admision-idiomas">
                          Idiomas
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/estudia/becas-ayudas">
                          Becas y ayudas
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/becas-ayudas/becas-grados">
                          Grados
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/becas-ayudas/becas-posgrado">
                          Posgrados
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/becas-ayudas/becas-doctorados">
                          Doctorados
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/becas-ayudas/becas-postdoctorales">
                          Postdoctorales
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/estudia/condiciones-economicas">
                          Condiciones económicas
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/condiciones-economicas/grado">
                          Grados
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/condiciones-economicas/posgrados">
                          Posgrados
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/estudia/condiciones-economicas/doctorados">
                          Doctorados
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="mglEspecial">
                <a className="" href="/es/inicio/investigacion">
                  Investiga
                  <img
                    width={10}
                    height={4}
                    src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                    alt=""
                  />
                </a>
                <div className="subpaginas">
                  <div className="container">
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/investigacion/quienes-somos">
                          Quiénes somos
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/investigacion/quienes-somos/personal-investigador">
                          Personal investigador
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/investigacion/quienes-somos/equipos-de-investigacion">
                          Equipos de investigación
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/investigacion/quienes-somos/centros-de-investigacion">
                          Centros de investigación
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/investigacion/quienes-somos/escuela-de-doctorado-dirs">
                          Escuela de Doctorado - DIRS
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/investigacion/quienes-somos/soporte-investigacion">
                          Soporte a la investigación
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/investigacion/actividad-y-produccion-cientifica">
                          Producción y actividad científica
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/investigacion/actividad-y-produccion-cientifica/focos-de-conocimiento">
                          Focos de conocimiento
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/investigacion/actividad-y-produccion-cientifica/proyectos-de-investigacion">
                          Proyectos de investigación
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/investigacion/actividad-y-produccion-cientifica/publicaciones-cientificas">
                          Publicaciones científicas
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/investigacion/transferencia">
                          Transferencia e impacto social
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/investigacion/transferencia/transferencia-e-innovacion">
                          Transferencia e innovación
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/investigacion/transferencia/impacto-social-y-difusion-cientifica">
                          Impacto social y difusión científica
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="mglEspecial">
                <a className="" href="/es/inicio/internacional">
                  Internacional
                  <img
                    width={10}
                    height={4}
                    src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                    alt=""
                  />
                </a>
                <div className="subpaginas">
                  <div className="container">
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/internacional/estudiantes-internacionales">
                          Estudiantes internacionales
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/internacional/estudiantes-internacionales/oferta-academica">
                          Oferta Académica
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/internacional/estudiantes-internacionales/movilidad-fisica">
                          Movilidad Física
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/internacional/estudiantes-internacionales/movilidad-virtual">
                          Movilidad Virtual
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/internacional/estudiantes-internacionales/movilidad-practicas">
                          Movilidad de prácticas
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/internacional/movilidad-outgoing">
                          Movilidad outgoing
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/internacional/movilidad-outgoing/movilidad-estudios">
                          Movilidad de estudios
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/internacional/movilidad-outgoing/movilidad-de-estudios-sicue">
                          Movilidad SICUE
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/internacional/movilidad-outgoing/movilidad-practicas">
                          Movilidad de prácticas
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/internacional/deusto-global">
                          Deusto global
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/internacional/proyectos-internacionales-cooperacion-educativa">
                          Proyectos internacionales de cooperación educativa
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="mglEspecial">
                <a className="" href="/es/inicio/vive">
                  Vive
                  <img
                    width={10}
                    height={4}
                    src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                    alt=""
                  />
                </a>
                <div className="subpaginas">
                  <div className="container">
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/vive/actualidad">Actualidad</a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/actualidad/noticias">
                          Noticias
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/actualidad/anuario">Anuario</a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/actualidad/revistas-deusto">
                          Revistas
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/actualidad/redes-sociales">
                          Redes Sociales
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/actualidad/media-room">
                          Gabinete de prensa
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/actualidad/deustobarometro-social">
                          Deustobarómetro social
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/vive/eventos">Eventos</a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/eventos/deustoforum">
                          DeustoForum
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/eventos/foro-empleo-emprendimiento">
                          Foro de empleo y emprendimiento
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/eventos/tamborrada">
                          Tamborrada
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/eventos/ano-ignaciano">
                          Año ignaciano
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/vive/deusto-campus">
                          Deusto Campus
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/deusto-campus/fe">Fe</a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/deusto-campus/solidaridad">
                          Solidaridad
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/deusto-campus/ecologia">
                          Ecología
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/deusto-campus/cultura">
                          Cultura
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/deusto-campus/deporte">
                          Deporte
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/vive/informacion-academica">
                          Información académica
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/informacion-academica/calendario-academico">
                          Calendario académico{" "}
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/informacion-academica/normas-academicas">
                          Normas académicas
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/informacion-academica/gestiones-tramites">
                          Gestiones y trámites
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/informacion-academica/representacion-estudiantil">
                          Representación estudiantil y orlas
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/informacion-academica/modulo-de-formacion-humana-en-valores">
                          Módulo de Formación Humana en Valores
                        </a>
                      </li>
                    </ul>
                    <ul className="segundoNivel estrecho">
                      <li>
                        <a href="/es/inicio/vive/servicios">Servicios</a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/servicios/biblioteca">
                          Biblioteca
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/servicios/alojamiento-acogida">
                          Alojamiento y acogida
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/servicios/colegio-mayor-deusto">
                          Colegio Mayor Deusto
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/servicios/accion-social-e-inclusion">
                          Acción social e inclusión
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/servicios/orientacion-universitaria">
                          Orientación Universitaria
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/servicios/empleo-orientacion">
                          Empleo y orientación
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/servicios/archivo-universitario">
                          Archivo universitario
                        </a>
                      </li>
                      <li>
                        <a href="/es/inicio/vive/servicios/informacion-practica">
                          Información práctica
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="mglEspecial">
                <a
                  className=""
                  href="https://www.deusto.es/colabora/"
                  target="_blank"
                >
                  Colabora
                </a>
              </li>
            </ul>
            <div className="bloqueBuscador">
              <div className="triggerBuscadorGoogle">
                <img
                  width={32}
                  height={32}
                  src="https://www.deusto.es/estaticos/ud/img/lupa.svg"
                  alt="Lupa para buscar"
                />
                <img
                  className="oculto"
                  width={32}
                  height={32}
                  src="https://www.deusto.es/estaticos/ud/img/cerrarModalNegra.svg"
                  alt="Cerrar"
                />
              </div>
              <div className="buscadorGoogle">
                <div className="search-form">
                  <form action="#" method="get">
                    <div className="container">
                      <label />
                      <div>
                        <div id="___gcse_0">
                          <div className="gsc-control-cse gsc-control-cse-es">
                            <div className="gsc-control-wrapper-cse" dir="ltr">
                              <table
                                cellSpacing={0}
                                cellPadding={0}
                                role="presentation"
                                className="gsc-search-box"
                              >
                                <tbody>
                                  <tr>
                                    <td className="gsc-input">
                                      <div
                                        className="gsc-input-box"
                                        id="gsc-iw-id1"
                                      >
                                        <table
                                          cellSpacing={0}
                                          cellPadding={0}
                                          role="presentation"
                                          id="gs_id50"
                                          className="gstl_50 gsc-input"
                                          style={{ width: "100%", padding: 0 }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                id="gs_tti50"
                                                className="gsib_a"
                                              >
                                                <input
                                                  autoComplete="off"
                                                  type="text"
                                                  size={10}
                                                  className="gsc-input"
                                                  name="search"
                                                  title="buscar"
                                                  aria-label="buscar"
                                                  id="gsc-i-id1"
                                                  dir="ltr"
                                                  spellCheck="false"
                                                  style={{
                                                    width: "100%",
                                                    padding: 0,
                                                    border: "none",
                                                    margin: 0,
                                                    height: "auto",
                                                    background:
                                                      'url("https://www.google.com/cse/static/images/1x/es/branding.png") left center no-repeat rgb(255, 255, 255)',
                                                    outline: "none",
                                                  }}
                                                />
                                              </td>
                                              <td className="gsib_b">
                                                <div
                                                  className="gsst_b"
                                                  id="gs_st50"
                                                  dir="ltr"
                                                >
                                                  <a
                                                    className="gsst_a"
                                                    title="Borrar contenido del cuadro de búsqueda"
                                                    role="button"
                                                    style={{ display: "none" }}
                                                  >
                                                    <span
                                                      className="gscb_a"
                                                      id="gs_cb50"
                                                      aria-hidden="true"
                                                    >
                                                      ×
                                                    </span>
                                                  </a>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                    <td className="gsc-search-button">
                                      <button className="gsc-search-button gsc-search-button-v2">
                                        <svg
                                          width={13}
                                          height={13}
                                          viewBox="0 0 13 13"
                                        >
                                          <title>buscar</title>
                                          <path d="m4.8495 7.8226c0.82666 0 1.5262-0.29146 2.0985-0.87438 0.57232-0.58292 0.86378-1.2877 0.87438-2.1144 0.010599-0.82666-0.28086-1.5262-0.87438-2.0985-0.59352-0.57232-1.293-0.86378-2.0985-0.87438-0.8055-0.010599-1.5103 0.28086-2.1144 0.87438-0.60414 0.59352-0.8956 1.293-0.87438 2.0985 0.021197 0.8055 0.31266 1.5103 0.87438 2.1144 0.56172 0.60414 1.2665 0.8956 2.1144 0.87438zm4.4695 0.2115 3.681 3.6819-1.259 1.284-3.6817-3.7 0.0019784-0.69479-0.090043-0.098846c-0.87973 0.76087-1.92 1.1413-3.1207 1.1413-1.3553 0-2.5025-0.46363-3.4417-1.3909s-1.4088-2.0686-1.4088-3.4239c0-1.3553 0.4696-2.4966 1.4088-3.4239 0.9392-0.92727 2.0864-1.3969 3.4417-1.4088 1.3553-0.011889 2.4906 0.45771 3.406 1.4088 0.9154 0.95107 1.379 2.0924 1.3909 3.4239 0 1.2126-0.38043 2.2588-1.1413 3.1385l0.098834 0.090049z" />
                                        </svg>
                                      </button>
                                    </td>
                                    <td className="gsc-clear-button">
                                      <div
                                        className="gsc-clear-button"
                                        title="borrar resultados"
                                      >
                                        &nbsp;
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="gsc-results-wrapper-overlay">
                                <div
                                  className="gsc-results-close-btn"
                                  tabIndex={0}
                                />
                                <div className="gsc-positioningWrapper">
                                  <div className="gsc-tabsAreaInvisible">
                                    <div
                                      aria-label="refinement"
                                      role="tab"
                                      className="gsc-tabHeader gsc-inline-block gsc-tabhActive"
                                    >
                                      Búsqueda personalizada
                                    </div>
                                    <span className="gs-spacer"> </span>
                                  </div>
                                </div>
                                <div className="gsc-positioningWrapper">
                                  <div className="gsc-refinementsAreaInvisible" />
                                </div>
                                <div className="gsc-above-wrapper-area-invisible">
                                  <div className="gsc-above-wrapper-area-backfill-container" />
                                  <table
                                    cellSpacing={0}
                                    cellPadding={0}
                                    role="presentation"
                                    className="gsc-above-wrapper-area-container"
                                  >
                                    <tbody>
                                      <tr>
                                        <td className="gsc-result-info-container">
                                          <div className="gsc-result-info-invisible" />
                                        </td>
                                        <td className="gsc-orderby-container">
                                          <div className="gsc-orderby-invisible">
                                            <div className="gsc-orderby-label gsc-inline-block">
                                              Ordenar por:
                                            </div>
                                            <div className="gsc-option-menu-container gsc-inline-block">
                                              <div className="gsc-selected-option-container gsc-inline-block">
                                                <div className="gsc-selected-option">
                                                  Relevance
                                                </div>
                                                <div className="gsc-option-selector" />
                                              </div>
                                              <div className="gsc-option-menu-invisible">
                                                <div className="gsc-option-menu-item gsc-option-menu-item-highlighted">
                                                  <div className="gsc-option">
                                                    Relevance
                                                  </div>
                                                </div>
                                                <div className="gsc-option-menu-item">
                                                  <div className="gsc-option">
                                                    Date
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="gsc-adBlockInvisible" />
                                <div className="gsc-wrapper">
                                  <div className="gsc-adBlockInvisible" />
                                  <div className="gsc-resultsbox-invisible">
                                    <div className="gsc-resultsRoot gsc-tabData gsc-tabdActive">
                                      <div>
                                        <div className="gsc-expansionArea" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="gsc-modal-background-image"
                                tabIndex={0}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
  const Header = () => {
    if (runtimeConfig.tenant === "lumiere") {
      return <HeaderLumiere />;
    }
    return <HeaderDeusto />;
  };

  export default Header;
