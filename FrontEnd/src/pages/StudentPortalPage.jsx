import NavBarStudent from "../components/NavBarStudent";
import { runtimeConfig } from "../config/runtime";
import { t } from "../config/i18n";

const StudentPortalPage = () => {
  const isLumiere = runtimeConfig.tenant === "lumiere";
  const primary = runtimeConfig.primaryColor;

  const tenantButtons = isLumiere
    ? {
        buttonBlue: { ...styles.buttonBlue, backgroundColor: primary },
        buttonOrange: { ...styles.buttonOrange, backgroundColor: "#2b4f8a" },
        buttonRed: { ...styles.buttonRed, backgroundColor: "#3b66a5" },
        buttonDark: { ...styles.buttonDark, backgroundColor: "#4d7abc" },
        buttonGreen: { ...styles.buttonGreen, backgroundColor: "#658fcb" },
        buttonViolet: { ...styles.buttonViolet, backgroundColor: "#7ea5d8" },
      }
    : styles;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <NavBarStudent />

      <div style={{ paddingTop: "5%" }}>
        <p
          style={{
            paddingTop: "4%",
            marginLeft: "2%",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "200%",
          }}
        >
          {t("Inicio", "Accueil")}
        </p>
        <div
          style={{
            marginLeft: "3%",
            marginRight: "3%",
            borderStyle: "solid",
            borderTopWidth: "2px",
            borderTopColor: isLumiere ? primary : "#1B459A",
            borderLeftWidth: "1px",
            borderRightWidth: "1px",
            borderBottomWidth: "1px",
          }}
        >
          <p style={{ paddingLeft: "2%", paddingTop: "1%" }}>{t("Aplicaciones", "Applications")}</p>
          <div style={styles.buttonContainer}>
            <button style={tenantButtons.buttonBlue}>
              {t("Grado /master /doctorado", "Licence / Master / Doctorat")}
            </button>
            <button style={tenantButtons.buttonOrange}>
              {t("Formación continua /idiomas", "Formation continue / Langues")}
            </button>
            <button style={tenantButtons.buttonRed}>
              {t("Evaluación docencia", "Évaluation des enseignements")}
            </button>
            <button style={tenantButtons.buttonDark}>
              {t("Solicitud beca deusto", "Demande de bourse")}
            </button>
            <button style={tenantButtons.buttonGreen}>
              {t("Publicación horaria", "Publication des horaires")}
            </button>
            <button style={tenantButtons.buttonViolet}>
              {t("Solicitud de títulos", "Demande de diplôme")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  buttonContainer: {
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingBottom: "2%",
    display: "flex",
    flexWrap: "wrap",  // Permite que los botones se adapten en varias filas
    gap: "20px",       // Espacio entre botones
  },
  buttonBlue: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "250px",   /* Define un tamaño mínimo para los botones */
    height: "70px",       /* Altura fija */
    textAlign: "right",
    paddingTop: "36px",
    paddingRight: "15px",
    fontSize: "105%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#76C4ED",
    border: "none",
  },
  buttonOrange: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "70px",
    textAlign: "right",
    paddingTop: "36px",
    paddingRight: "15px",
    fontSize: "105%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#EFA131",
    border: "none",
  },
  buttonRed: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "70px",
    textAlign: "right",
    paddingTop: "36px",
    paddingRight: "15px",
    fontSize: "105%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#C0392B",
    border: "none",
  },
  buttonDark: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "70px",
    textAlign: "right",
    paddingTop: "36px",
    paddingRight: "15px",
    fontSize: "105%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#34495E",
    border: "none",
  },
  buttonGreen: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "270px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "70px",
    textAlign: "right",
    paddingTop: "36px",
    paddingRight: "15px",
    fontSize: "105%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#85C744",
    border: "none",
  },
  buttonViolet: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "257px",   /* Limita el tamaño máximo del botón */
    minWidth: "269px",   /* Define un tamaño mínimo para los botones */
    height: "70px",
    textAlign: "right",
    paddingTop: "36px",
    paddingRight: "15px",
    fontSize: "105%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#9358AC",
    border: "none",
  }
};


export default StudentPortalPage;
