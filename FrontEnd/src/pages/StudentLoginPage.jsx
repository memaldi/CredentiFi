import React from "react";
import { Link } from "react-router-dom";
import ModalCredential from "../components/ModalCredential";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { useStudent } from "../components/StudentContext";
import { MdLock } from 'react-icons/md';
import BrandLogo from "../components/BrandLogo";
import { apiUrl, runtimeConfig } from "../config/runtime";
import { t } from "../config/i18n";

const PRIMARY = runtimeConfig.primaryColor;
const SECONDARY = runtimeConfig.secondaryColor;


const StudentLoginPage = () => {

  const navigate = useNavigate();
  const { setStudentInfo } = useStudent();

  const hostedDomain = runtimeConfig.allowedEmailDomain;

  const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      console.log('Token Response:', tokenResponse);

      const accessToken = tokenResponse.access_token;
      if (!accessToken) {
        console.error('Access token no encontrado.');
        return;
      }

      const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = await response.json();
      console.log('User Data from Google:', userData);

      if (userData.email && userData.email.endsWith(`@${hostedDomain}`)) {
        const email = userData.email;

        const backendResponse = await fetch(apiUrl(`/sql/estudiante/correo?correo=${email}`));
        const backendData = await backendResponse.json();

        if (backendResponse.ok) {
          const studentInfo = backendData;
          setStudentInfo(studentInfo);
          localStorage.setItem('studentInfo', JSON.stringify(studentInfo));
          sessionStorage.setItem('token', accessToken);
          navigate('/studentPortal');
        } else {
          console.error('Error del backend:', backendData);
          alert(t('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.', 'Erreur lors de la connexion. Veuillez réessayer plus tard.'));
        }
      } else {
        console.error(`El correo no pertenece a @${hostedDomain}`);
        alert(t(`Por favor, utiliza una cuenta de correo electrónico de @${hostedDomain} para iniciar sesión.`, `Veuillez utiliser un compte e-mail @${hostedDomain} pour vous connecter.`));
      }
    } catch (error) {
      console.error('Error al obtener la información del usuario de Google:', error);
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  },
  onError: (response) => console.log('Login Failed:', response),
  hosted_domain: hostedDomain,
});


  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "6%",
        }}
      >
        <BrandLogo alt={runtimeConfig.universityName} style={{ width: "15%" }} />
        <div
          className="firstBox"
          style={{
            marginTop: "2%",
            backgroundColor: "#E6E7E8",
            width: "30%",
            borderTopStyle: "solid",
            borderWidth: "2px",
            borderTopColor: PRIMARY,
            boxShadow: "0px 0px 10px 0px #000000",
          }}
        >
          <h5
            style={{ paddingTop: "8%", textAlign: "center", fontSize: "100%" }}
          >
            {t(`Acceso con cuenta @${hostedDomain}`, `Accès avec compte @${hostedDomain}`)}
          </h5>
          <button
            data-testid="google-login-button"
            className="btn btn-primary"
            id="loginButton"
            onClick={googleLogin}
            style={{
              marginLeft: "37%",
              marginTop: "5%",
              marginBottom: "5%",
              fontSize: "90%",
            }}
          >
            {t("Iniciar sesión", "Se connecter")}
          </button>
        </div>
        <div
          className="secondBox"
          style={{
            marginTop: "2%",
            backgroundColor: "#E6E7E8",
            width: "30%",
            borderTopStyle: "solid",
            borderWidth: "2px",
            borderTopColor: PRIMARY,
            boxShadow: "0px 0px 10px 0px #000000",
          }}
        >
          <h5
            style={{
              paddingTop: "8%",
              textAlign: "center",
              fontSize: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {t("Acceso con EducationalID", "Accès avec EducationalID")}
            <div style={{ marginLeft: "5px" }}>
              <ModalCredential
                title={t("Accede con tu EducationalID", "Accédez avec votre EducationalID")}
                description=""
                id="microcredenciles"
              />
            </div>
          </h5>


          <Link to="/studentLogin/qr">
            <button
              className="btn btn-primary"
              id="loginButton"
              style={{
                marginLeft: "40%",
                marginTop: "5%",
                marginBottom: "5%",
                fontSize: "90%",
              }}
            >
              {t("Acceder", "Accéder")}
            </button>
          </Link>
          <br />
          <a
            href=""
            style={{ marginLeft: "15%", fontSize: "80%", color: PRIMARY }}
          >
            {t("No tengo una credencial verificable, solicitarla", "Je n'ai pas d'identifiant vérifiable, en faire la demande")}
          </a>
        </div>
        <div
          style={{
            marginTop: "2%",
            backgroundColor: "#E6E7E8",
            width: "30%",
            borderTopStyle: "solid",
            borderWidth: "2px",
            borderTopColor: PRIMARY,
            boxShadow: "0px 0px 10px 0px #000000",
          }}
        >
          <div className="secondBox" style={{ backgroundColor: PRIMARY }}>
            <h6
              style={{
                padding: "6%",
                textAlign: "center",
                fontSize: "100%",
                color: "white",
              }}
            >
              {t("Acceso con NIU", "Accès avec NIU")}
            </h6>
          </div>
          <div
            className="input-group"
            style={{ display: "flex", flexDirection: "column", padding: "5%" }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="userId"
                maxLength={50}
                name="userId"
                defaultValue=""
                placeholder={t("User", "Utilisateur")}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "row", marginTop: "8%" }}
            >
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <MdLock size={20} />
              </span>

              <input
                type="password"
                className="form-control"
                id="password"
                maxLength={50}
                name="password"
                defaultValue=""
                placeholder={t("Contraseña", "Mot de passe")}
                style={{ borderRadius: "0 5px 5px 0" }}
              />
            </div>
          </div>
          <a
            href=""
            style={{ marginLeft: "5%", fontSize: "80%", color: PRIMARY }}
          >
            {t("No tengo una cuenta, solicitar registro", "Je n'ai pas de compte, m'inscrire")}
          </a>
          <br />
          <a
            href=""
            style={{ marginLeft: "5%", fontSize: "80%", color: PRIMARY }}
          >
            {" "}
            {t("No sé o he olvidado mi contraseña", "J'ai oublié mon mot de passe")}
          </a>
          <br />
          <button
            data-testid="niu-login-button"
            className="btn btn-primary"
            id="enterButton"
            style={{ marginLeft: "35%", marginBottom: "5%", marginTop: "3%" }}
          >
            {t("Iniciar sesión", "Se connecter")}
          </button>
        </div>
      </div>
      <br />
    </>
  );
};

export default StudentLoginPage;
