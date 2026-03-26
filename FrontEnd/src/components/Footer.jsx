import React from "react";
import "../styles/letras.css";
import "../styles/estilos.min.css";
import "../styles/owl.carousel.min.css";
import "../styles/owl.theme.default.min.css";
import { runtimeConfig } from "../config/runtime";
import FooterStrasbourg from "./FooterStrasbourg";

const FooterDeusto = () => {
  return (
    <footer>
      <div className="container">
        <div className="pieSuperior">
          <div className="row">
            <ul className="col-xl-3 col-lg-3">
              <li>
                <span>
                  Facultades{" "}
                  <img
                    width={10}
                    height={4}
                    src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                    alt="Botón desplegable"
                  />
                </span>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/somos-deusto/facultades/ciencias-salud"
                  target="_blank"
                  title="Facultad de Ciencias de la Salud"
                >
                  Ciencias de la Salud
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/somos-deusto/facultades/ciencias-sociales-humanas"
                  target="_blank"
                  title="Facultad de Ciencias Sociales y Humanas"
                >
                  Ciencias Sociales y Humanas
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/somos-deusto/facultades/derecho"
                  target="_blank"
                  title="Facultad de Derecho"
                >
                  Derecho
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/somos-deusto/facultades/deusto-business-school"
                  target="_blank"
                  title="Deusto Business School"
                >
                  Deusto Business School
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/somos-deusto/facultades/educacion-deporte"
                  target="_blank"
                  title="Facultad de Educación y Deporte"
                >
                  Educación y Deporte
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/somos-deusto/facultades/ingenieria"
                  target="_blank"
                  title="Facultad de Ingeniería"
                >
                  {" "}
                  Ingeniería
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/somos-deusto/facultades/teologia"
                  target="_blank"
                  title="Facultad de Teología"
                >
                  Teología
                </a>
              </li>
            </ul>
            <ul className="col-xl-3 col-lg-3">
              <li>
                <span>
                  Información de interés{" "}
                  <img
                    width={10}
                    height={4}
                    src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                    alt="Botón desplegable"
                  />
                </span>
              </li>
              <li>
                <a
                  href="/es/inicio/vive/informacion-academica/calendario-academico"
                  target=""
                  title="Calendario académico"
                >
                  Calendario académico
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/vive/servicios/biblioteca"
                  target=""
                  title="Biblioteca"
                >
                  Biblioteca
                </a>
              </li>
              <li>
                <a
                  href="/es/inicio/vive/deusto-campus"
                  target=""
                  title="Deusto Campus"
                >
                  Deusto Campus
                </a>
              </li>
              <li>
                <a
                  href="/es/inicio/vive/servicios/colegio-mayor-deusto"
                  target="_blank"
                  title="Colegio Mayor Deusto"
                >
                  Colegio Mayor
                </a>
              </li>
              <li>
                <a
                  href="https://alumni.deusto.es/s/?language=es"
                  target="_blank"
                  title="Deusto Alumni"
                >
                  Deusto Alumni
                </a>
              </li>
              <li>
                <a
                  href="/es/inicio/vive/servicios/archivo-universitario"
                  target=""
                  title="Archivo universitario"
                >
                  Archivo universitario
                </a>
              </li>
              <li>
                <a
                  href="http://www.deusto-publicaciones.es/"
                  target="_blank"
                  title="Publicaciones Deusto"
                >
                  Publicaciones
                </a>
              </li>
            </ul>
            <ul className="col-xl-3 col-lg-3">
              <li>
                <span>
                  Actualidad{" "}
                  <img
                    width={10}
                    height={4}
                    src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                    alt="Botón desplegable"
                  />
                </span>
              </li>
              <li>
                <a
                  href="https://agenda.deusto.es/"
                  target="_blank"
                  title="Deusto Agenda"
                >
                  Deusto Agenda
                </a>
              </li>
              <li>
                <a
                  href="/es/inicio/vive/actualidad/noticias"
                  target=""
                  title="Noticias Deusto"
                >
                  Noticias
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/cs/Satellite/deusto/es/universidad-deusto/vive-deusto/conecta-deusto"
                  target="_blank"
                  title="Redes Sociales Deusto"
                >
                  {" "}
                  Redes Sociales
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/vive/actualidad/revistas-deusto#revista-deusto"
                  target=""
                  title="Revista Deusto"
                >
                  Revista Deusto
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/cs/Satellite/deusto/es/universidad-deusto/vive-deusto/conecta-deusto?redsel=Blogs"
                  target="_blank"
                  title="Blogs"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="/es/inicio/vive/actualidad/media-room"
                  target=""
                  title="Gabinete de prensa"
                >
                  {" "}
                  Gabinete de prensa
                </a>
              </li>
            </ul>
            <ul className="col-xl-3 col-lg-3">
              <li>
                <span>
                  Gestiones y trámites{" "}
                  <img
                    width={10}
                    height={4}
                    src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                    alt="Botón desplegable"
                  />
                </span>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/estudia/admision/admision-grados"
                  target=""
                  title="Admisión grados Deusto"
                >
                  Admisión grados
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/estudia/admision/admision-posgrado"
                  target=""
                  title="Admisión posgrados Deusto"
                >
                  Admisión posgrados
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/estudia/admision/admision-doctorados"
                  target=""
                  title="Admisión doctorados Deusto"
                >
                  Admisión doctorados
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/estudia/condiciones-economicas"
                  target=""
                  title="Condiciones económicas Deusto"
                >
                  Condiciones económicas
                </a>
              </li>
              <li>
                <a
                  href="https://www.deusto.es/es/inicio/estudia/becas-ayudas"
                  target=""
                  title="Becas y ayudas Deusto"
                >
                  Becas y ayudas
                </a>
              </li>
              <li>
                <a
                  href="/es/inicio/vive/informacion-academica/gestiones-tramites"
                  target="_blank"
                  title="Gestiones y trámites"
                >
                  Gestiones académicas
                </a>
              </li>
            </ul>
          </div>
          <div className="row">
            <ul className="col-xl-3 col-lg-3">
              <li>
                <span>Campus Bilbao</span>
              </li>
              <li>
                <a
                  href="https://goo.gl/maps/yt1LYoB57JL2"
                  target="_blank"
                  title="Conoce el campus "
                >
                  <img
                    width={13}
                    height={17}
                    src="https://www.deusto.es/estaticos/ud/img/ubicacionPie.svg"
                    alt="Icono ubicación"
                  />
                  Conoce el campus{" "}
                </a>
              </li>
              <li>
                <a href="tel:+34944139000">
                  <img
                    width={18}
                    height={17}
                    src="https://www.deusto.es/estaticos/ud/img/tfno.svg"
                    alt="Icono ubicación"
                  />
                  +34 944 139 000
                </a>
              </li>
              {/* <li><a href="javascript:location='mailto:\u0020\u0077\u0065\u0062\u0040\u0064\u0065\u0075\u0073\u0074\u006f\u002e\u0065\u0073';void 0"><img width="18" height="18" src="https://www.deusto.es/estaticos/ud/img/email.svg" alt="Icono email">web@deusto.es</a></li> */}
              <li>
                <a href="/es/inicio/contacto" target="">
                  <img
                    width={18}
                    height={18}
                    src="https://www.deusto.es/estaticos/ud/img/email.svg"
                    alt="Contacto"
                  />
                  Contacto
                </a>
              </li>
            </ul>
            <ul className="col-xl-3 col-lg-3">
              <li>
                <span>Campus San Sebastián</span>
              </li>
              <li>
                <a
                  href="https://goo.gl/maps/F58SedQqav72"
                  target="_blank"
                  title="Conoce el campus"
                >
                  <img
                    width={13}
                    height={17}
                    src="https://www.deusto.es/estaticos/ud/img/ubicacionPie.svg"
                    alt="Icono ubicación"
                  />
                  Conoce el campus
                </a>
              </li>
              <li>
                <a href="tel:+34943326600">
                  <img
                    width={18}
                    height={17}
                    src="https://www.deusto.es/estaticos/ud/img/tfno.svg"
                    alt="Icono ubicación"
                  />
                  +34 943 326 600
                </a>
              </li>
              <li>
                <a href="/es/inicio/contacto" target="">
                  <img
                    width={18}
                    height={18}
                    src="https://www.deusto.es/estaticos/ud/img/email.svg"
                    alt="Contacto"
                  />
                  Contacto
                </a>
              </li>
            </ul>
            <ul className="col-xl-3 col-lg-3">
              <li>
                <span>Sede Vitoria</span>
              </li>
              <li>
                <a
                  href="https://goo.gl/maps/4V2DzhuVDMEDsgFx8"
                  target="_blank"
                  title="Conoce la sede"
                >
                  <img
                    width={13}
                    height={17}
                    src="https://www.deusto.es/estaticos/ud/img/ubicacionPie.svg"
                    alt="Icono ubicación"
                  />
                  Conoce la sede
                </a>
              </li>
              <li>
                <a href="tel:+34945010114">
                  <img
                    width={18}
                    height={17}
                    src="https://www.deusto.es/estaticos/ud/img/tfno.svg"
                    alt="Icono ubicación"
                  />
                  +34 945 010 114
                </a>
              </li>
              <li>
                <a href="/es/inicio/contacto" target="">
                  <img
                    width={18}
                    height={18}
                    src="https://www.deusto.es/estaticos/ud/img/email.svg"
                    alt="Contacto"
                  />
                  Contacto
                </a>
              </li>
            </ul>
            <ul className="col-xl-3 col-lg-3">
              <li>
                <span>Sede Madrid</span>
              </li>
              <li>
                <a
                  href="https://goo.gl/maps/rVqa932MXyuZnkBT6"
                  target="_blank"
                  title="Conoce la sede"
                >
                  <img
                    width={13}
                    height={17}
                    src="https://www.deusto.es/estaticos/ud/img/ubicacionPie.svg"
                    alt="Icono ubicación"
                  />
                  Conoce la sede
                </a>
              </li>
              <li>
                <a href="tel:+34915776189" title="+34 915 77 61 89">
                  <img
                    width={18}
                    height={17}
                    src="https://www.deusto.es/estaticos/ud/img/tfno.svg"
                    alt="Icono ubicación"
                  />
                  +34 915 77 61 89
                </a>
              </li>
              <li>
                <a href="/es/inicio/contacto" target="">
                  <img
                    width={18}
                    height={18}
                    src="https://www.deusto.es/estaticos/ud/img/email.svg"
                    alt="Contacto"
                  />
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pieInferior">
          <div>
            <ul>
              <li>
                <a href="/es/inicio/contacto" title="Contacto">
                  Contacto
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://auraportal.deusto.es/Visitor.aspx?id=11189&idPortal=0&updformid=false&Language=13"
                  title="Buzón de sugerencias"
                >
                  Buzón de sugerencias
                </a>
              </li>
              <li>
                <a href="/es/inicio/privacidad" title="Privacidad">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="/es/inicio/mapa-web" title="Mapa web">
                  Mapa web
                </a>
              </li>
            </ul>
            <span>
              <img
                width={67}
                height={15}
                src="https://www.deusto.es/estaticos/ud/img/logoDeustoFooter.svg"
                alt="logoDeusto"
              />
              © 2025 - Todos los Derechos reservados
            </span>
          </div>
          <ul className="rrssHome">
            <li>
              <a
                href="https://www.deusto.es/es/inicio/vive/actualidad/redes-sociales?redsel=Twitter"
                target=""
                title="Twitter"
              >
                <img
                  width={50}
                  height={50}
                  src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fsvg%2Bxml&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadername4=Content-Disposition&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fsvg%2Bxml&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobheadervalue4=inline%3Bfilename%3D%22twitter.svg%22&blobkey=id&blobtable=MungoBlobs&blobwhere=1599793289480&ssbinary=true"
                  alt="Twitter"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.deusto.es/es/inicio/vive/actualidad/redes-sociales?redsel=Facebook"
                target=""
                title="Facebook"
              >
                <img
                  width={50}
                  height={50}
                  src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fsvg%2Bxml&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadername4=Content-Disposition&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fsvg%2Bxml&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobheadervalue4=inline%3Bfilename%3D%22facebook.svg%22&blobkey=id&blobtable=MungoBlobs&blobwhere=1605722016271&ssbinary=true"
                  alt="Facebook"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/udeusto/"
                target="_blank"
                title="Instagram "
              >
                <img
                  width={50}
                  height={50}
                  src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fsvg%2Bxml&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadername4=Content-Disposition&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fsvg%2Bxml&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobheadervalue4=inline%3Bfilename%3D%22instagram.svg%22&blobkey=id&blobtable=MungoBlobs&blobwhere=1596065540948&ssbinary=true"
                  alt=" instagram"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.deusto.es/es/inicio/vive/actualidad/redes-sociales?redsel=Linkedin"
                target=""
                title=" Linkedin"
              >
                <img
                  width={50}
                  height={50}
                  src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fsvg%2Bxml&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadername4=Content-Disposition&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fsvg%2Bxml&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobheadervalue4=inline%3Bfilename%3D%22linkedin.svg%22&blobkey=id&blobtable=MungoBlobs&blobwhere=1599805982515&ssbinary=true"
                  alt=" Linkedin"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.deusto.es/es/inicio/vive/actualidad/redes-sociales?redsel=Youtube"
                target=""
                title="Youtube"
              >
                <img
                  width={50}
                  height={50}
                  src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fsvg%2Bxml&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadername4=Content-Disposition&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fsvg%2Bxml&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobheadervalue4=inline%3Bfilename%3D%22youtube.svg%22&blobkey=id&blobtable=MungoBlobs&blobwhere=1605722016284&ssbinary=true"
                  alt="Youtube"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.deusto.es/es/inicio/vive/actualidad/redes-sociales?redsel=Flickr"
                target=""
                title="Flickr"
              >
                <img
                  width={50}
                  height={50}
                  src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fsvg%2Bxml&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadername4=Content-Disposition&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fsvg%2Bxml&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobheadervalue4=inline%3Bfilename%3D%22flickr.svg%22&blobkey=id&blobtable=MungoBlobs&blobwhere=1605722016299&ssbinary=true"
                  alt=" Flickr"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@udeusto"
                target="_blank"
                title="TikTok"
              >
                <img
                  width={50}
                  height={50}
                  src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fsvg%2Bxml&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadername4=Content-Disposition&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fsvg%2Bxml&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobheadervalue4=inline%3Bfilename%3D%22tiktok.svg%22&blobkey=id&blobtable=MungoBlobs&blobwhere=1598315978240&ssbinary=true"
                  alt="TikTok"
                />
              </a>
            </li>
          </ul>
        </div>
        <span className="go-top">
          <i className="fa fa-arrow-up" />
        </span>
      </div>
    </footer>
  );
};
  const Footer = () => {
    if (runtimeConfig.tenant === "strasbourg") {
      return <FooterStrasbourg />;
    }
    return <FooterDeusto />;
  };

  export default Footer;
