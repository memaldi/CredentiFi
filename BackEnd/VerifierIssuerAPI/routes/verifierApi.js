const express = require('express')
const router = express.Router()

const axios = require("axios")
const fs = require("fs");
const path = require("path");

const presentationDefinitionDir =
  process.env.PRESENTATION_DEFINITION_DIR ||
  path.join(__dirname, "..", "presentationDefinition");
const verifierApiUrl = (process.env.VERIFIER_API_URL || "http://verifier-api:7003").replace(/\/$/, "");
const issuerApiUrl = (process.env.ISSUER_API_URL || "http://issuer-api:7002").replace(/\/$/, "");
const mongodbApiUrl = (process.env.MONGODB_API_URL || "http://mongodb-api:4000").replace(/\/$/, "");
const frontendBaseUrl = (process.env.FRONTEND_BASE_URL || "http://localhost:5173").replace(/\/$/, "");

router.post('/', async (req, res) => {
  const presentationDefinition = req.body;
  // Headers que necesitas enviar
  const headers = {
    'Accept': '*/*',
    'authorizeBaseUrl': 'openid4vp://authorize',
    'responseMode': 'direct_post',
    'successRedirectUri': `${frontendBaseUrl}/prerequisites?verified=true&id=$id`,
    'Content-Type': 'application/json'
  };
  //https://verifier.demo.walt.id/openid4vc/verify
  try {
    const response = await axios.post(
      `${verifierApiUrl}/openid4vc/verify`,
      presentationDefinition, // El cuerpo de la petición
      { headers } // Pasando los headers
    );
    res.json(response.data); // Devolver la respuesta de la verificación
  } catch (error) {
    res.status(500).json({ message: "Error al verificar", error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const presentationDefinition = JSON.parse(fs.readFileSync(path.join(presentationDefinitionDir, "EducationalID.json"), "utf8"));

  // Headers que necesitas enviar
  const headers = {
    'Accept': '*/*',
    'authorizeBaseUrl': 'openid4vp://authorize',
    'responseMode': 'direct_post',
    'successRedirectUri': `${frontendBaseUrl}/studentLogin/qr?verified=true&id=$id`,
    'Content-Type': 'application/json'
  };
  //https://verifier.demo.walt.id/openid4vc/verify
  try {
    const response = await axios.post(
      `${verifierApiUrl}/openid4vc/verify`,
      presentationDefinition, // El cuerpo de la petición
      { headers } // Pasando los headers
    );
    res.json(response.data); // Devolver la respuesta de la verificación
  } catch (error) {
    res.status(500).json({ message: "Error al verificar", error: error.message });
  }
});

router.get('/infoSesionVerificacion/:id', async (req, res) => {
  //https://verifier.demo.walt.id/openid4vc/session/${id}
  try {
    const { id } = req.params;
    const response = await axios.get(`${verifierApiUrl}/openid4vc/session/${id}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    if (response.status === 200) {
      const resultadoVerificacion = response.data;
      return res.status(200).json(resultadoVerificacion);
    }  

  } catch (error) {
    console.error('Error al hacer la petición', error.message);
    res.status(500).send('Error al procesar la solicitud');
  }
});
router.get('/infoSesionVerificacionGuardar/:id', async (req, res) => {
  //https://verifier.demo.walt.id/openid4vc/session/${id}
  try {
    const { id } = req.params;
    const response = await axios.get(`${verifierApiUrl}/openid4vc/session/${id}`, {
      headers: {
        'accept': 'application/json',
      },
    });

    const resultadoVerificacion = response.data;


    const respuestaGuardar = await axios.post(`${mongodbApiUrl}/credenciales`, resultadoVerificacion, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(respuestaGuardar.data);
    return res.status(200).json(respuestaGuardar.data); 

  } catch (error) {
    console.error('Error al hacer la petición o guardar el resultado de la verificación', error.message);
    res.status(500).send('Error al procesar la solicitud');
  }
});
router.post('/emitirCredencial', async (req, res) => {
  try {
    const { credential } = req.body;
    const response = await axios.post(`${issuerApiUrl}/openid4vc/jwt/issue`, credential, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    if (response.status === 200) {
      return res.status(200).json(response.data);
    } else {
      return res.status(response.status).json({ message: "Error al emitir credencial" });
    }
  } catch (error) {
    console.error('Error al emitir credencial', error.message);
    res.status(500).send('Error al procesar la solicitud');
  }
}
);
module.exports = router