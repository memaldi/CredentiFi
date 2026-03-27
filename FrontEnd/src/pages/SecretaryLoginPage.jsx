import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import { apiUrl, runtimeConfig } from "../config/runtime";
import { t } from "../config/i18n";

const PRIMARY = runtimeConfig.primaryColor;

const SecretaryLoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(apiUrl("/sql/login"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (data.status === "success") {
                
                sessionStorage.setItem('token', data.token)
                navigate("/secretary");
                
            } else {
                alert(t("Credenciales incorrectas", "Identifiants incorrects"));
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert(t("Error de conexión. Por favor, inténtalo de nuevo más tarde.", "Erreur de connexion. Veuillez réessayer."));
        }
    };

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
                        {t("Acceso Secretaría", "Accès Secrétariat")}
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
                                value={username}
                                placeholder={t("Usuario", "Utilisateur")}
                                onChange={(e) => setUsername(e.target.value)}
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
                                <span className="material-symbols-outlined">lock</span>
                            </span>

                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                maxLength={50}
                                name="password"
                                value={password}
                                placeholder={t("Contraseña", "Mot de passe")}
                                onChange={(e) => setPassword(e.target.value)}
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
                        className="btn btn-primary"
                        id="enterButton"
                        style={{ marginLeft: "35%", marginBottom: "5%", marginTop: "3%" }}
                        onClick={handleLogin}
                    >
                        {t("Iniciar sesión", "Se connecter")}
                    </button>
                </div>
            </div>
            <br />
        </>
    );
};

export default SecretaryLoginPage;
