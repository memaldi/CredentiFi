import { useNavigate } from "react-router-dom";
import { useStudent } from "./StudentContext";
import { MdAccountCircle } from 'react-icons/md';
import BrandLogo from "./BrandLogo";
import { runtimeConfig } from "../config/runtime";
import { t } from "../config/i18n";

function NavBarStudent() {
  const navigate = useNavigate();
  const { studentInfo } = useStudent();

  const logOut = () => {
    localStorage.removeItem("studentInfo");
    localStorage.removeItem("token");
    navigate("/studentLogin");
  };

  const handleButtonClick = () => {
    navigate("/microcredentials");
  };

  return (
    <>
      <div style={{backgroundColor: runtimeConfig.secondaryColor, width: "100%", position: "fixed", zIndex: "1000", padding: "0", margin: "0"}}>
        <BrandLogo inverse alt="Logo" style={{width: "10%", padding: "0.5%"}} />
        <div className="btn-group" id="menu" style={{marginRight: "2%", marginLeft:"80%"}}>
          <button
            className="btn btn-secondary btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="botonMenu"
            style={{backgroundColor: runtimeConfig.secondaryColor}}
          >
            <MdAccountCircle size={24} />
          </button>
          <ul className="dropdown-menu dropdown-menu-lg-end" id="submenu" style={{boxShadow: "0px 0px 10px 0px #000000"}}>
            <li><p className="dropdown-item" style={{fontSize: "90%"}}>{t("Hola","Bonjour")} {studentInfo?.nombre}!</p></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="" onClick={() => handleButtonClick()} style={{fontSize: "90%"}}>{t("Mi perfil", "Mon profil")}</a></li>
            <li><a className="dropdown-item" href="#" style={{fontSize: "90%"}}>{t("Acerca de", "À propos")}</a></li>
            <li><a className="dropdown-item" href="#" style={{fontSize: "90%"}}>{t("Contacto", "Contact")}</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="" style={{fontSize: "90%"}} onClick={() => logOut()}>{t("Cerrar sesion", "Déconnexion")}</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default NavBarStudent;
