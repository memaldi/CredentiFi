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
const trustedIssuerDids = [
  process.env.TRUSTED_ISSUER_DIDS,
  process.env.TRUSTED_ISSUER_DID,
]
  .filter(Boolean)
  .flatMap((value) =>
    String(value)
      .split(",")
      .map((issuer) => issuer.trim())
      .filter(Boolean)
  );

function toIssuerArray(value) {
  if (Array.isArray(value)) {
    return value
      .map((issuer) => String(issuer).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((issuer) => issuer.trim())
      .filter(Boolean);
  }

  return [];
}

function getAllowedIssuersFromPolicies(policies) {
  if (!Array.isArray(policies)) {
    return [];
  }

  return policies
    .filter((policy) => policy && typeof policy === "object" && policy.policy === "allowed-issuer")
    .flatMap((policy) => toIssuerArray(policy.args));
}

function getEducationalIdAllowedIssuersFromFile() {
  try {
    const policyFile = path.join(presentationDefinitionDir, "EducationalID.json");
    const definition = JSON.parse(fs.readFileSync(policyFile, "utf8"));
    return getAllowedIssuersFromPolicies(definition?.vc_policies);
  } catch (_error) {
    return [];
  }
}

function uniqueIssuers(...issuerGroups) {
  return [...new Set(issuerGroups.flatMap((group) => toIssuerArray(group)))];
}

function findCredentialSubjectDeep(value) {
  if (!value || typeof value !== "object") {
    return null;
  }

  if (value.credentialSubject && typeof value.credentialSubject === "object") {
    return value.credentialSubject;
  }

  for (const nestedValue of Object.values(value)) {
    const found = findCredentialSubjectDeep(nestedValue);
    if (found) {
      return found;
    }
  }

  return null;
}

function decodeJwtPayload(token) {
  if (typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  try {
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const decoded = Buffer.from(padded, "base64").toString("utf8");
    return JSON.parse(decoded);
  } catch (_error) {
    return null;
  }
}

function findCredentialSubjectFromJwtDeep(value) {
  if (typeof value === "string") {
    const decoded = decodeJwtPayload(value);
    if (!decoded) {
      return null;
    }

    return findCredentialSubjectDeep(decoded?.vc) || findCredentialSubjectDeep(decoded);
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  for (const nestedValue of Object.values(value)) {
    const found = findCredentialSubjectFromJwtDeep(nestedValue);
    if (found) {
      return found;
    }
  }

  return null;
}

function getEducationalIdSubject(sessionData) {
  const policyResults = Array.isArray(sessionData?.policyResults?.results)
    ? sessionData.policyResults.results
    : [];

  const prioritizedResults = [
    ...policyResults.filter((item) => /educationalid/i.test(String(item?.credential || ""))),
    ...policyResults.filter((item) => !/educationalid/i.test(String(item?.credential || ""))),
  ];

  for (const resultItem of prioritizedResults) {
    const policyList = Array.isArray(resultItem?.policyResults) ? resultItem.policyResults : [];
    for (const policy of policyList) {
      const subject =
        policy?.result?.vc?.credentialSubject ||
        findCredentialSubjectDeep(policy?.result) ||
        findCredentialSubjectFromJwtDeep(policy?.result);

      if (subject && typeof subject === "object") {
        return subject;
      }
    }
  }

  return findCredentialSubjectDeep(sessionData) || findCredentialSubjectFromJwtDeep(sessionData);
}

function normalizeEducationalIdPolicies(presentationDefinition) {
  const normalized = JSON.parse(JSON.stringify(presentationDefinition || {}));
  const requestedCredentials = Array.isArray(normalized.request_credentials)
    ? normalized.request_credentials
    : [];

  const requestsEducationalId = requestedCredentials.some(
    (credential) => credential && credential.type === "EducationalID"
  );

  if (!requestsEducationalId) {
    return normalized;
  }

  const inputPolicies = Array.isArray(normalized.vc_policies) ? normalized.vc_policies : [];
  const allowedIssuers = uniqueIssuers(
    getAllowedIssuersFromPolicies(inputPolicies),
    getEducationalIdAllowedIssuersFromFile(),
    trustedIssuerDids
  );

  if (allowedIssuers.length === 0) {
    return normalized;
  }

  const withoutSignature = inputPolicies.filter(
    (policy) => !(policy === "signature" || (policy && typeof policy === "object" && policy.policy === "signature"))
  );

  let hasAllowedIssuer = false;
  const mappedPolicies = withoutSignature.map((policy) => {
    if (policy && typeof policy === "object" && policy.policy === "allowed-issuer") {
      hasAllowedIssuer = true;
      return {
        ...policy,
        args: allowedIssuers,
      };
    }
    return policy;
  });

  if (!hasAllowedIssuer) {
    mappedPolicies.unshift({
      policy: "allowed-issuer",
      args: allowedIssuers,
    });
  }

  normalized.vc_policies = mappedPolicies;
  return normalized;
}

router.post('/', async (req, res) => {
  const presentationDefinition = normalizeEducationalIdPolicies(req.body);
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
  const presentationDefinition = normalizeEducationalIdPolicies(
    JSON.parse(fs.readFileSync(path.join(presentationDefinitionDir, "EducationalID.json"), "utf8"))
  );

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
      const educationalIdSubject = getEducationalIdSubject(resultadoVerificacion);
      resultadoVerificacion.educationalIdSubject = educationalIdSubject;
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
    const educationalIdSubject =
      respuestaGuardar.data?.educationalIdSubject ||
      getEducationalIdSubject(resultadoVerificacion);
    if (educationalIdSubject) {
      respuestaGuardar.data.educationalIdSubject = educationalIdSubject;
    }
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