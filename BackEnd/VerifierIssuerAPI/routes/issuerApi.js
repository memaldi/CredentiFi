const express = require('express')
const router = express.Router()

const axios = require("axios")
const fs = require("fs").promises;
const path = require("path");

const presentationDefinitionDir =
  process.env.PRESENTATION_DEFINITION_DIR ||
  path.join(__dirname, "..", "presentationDefinition");
const issuerApiUrl = (process.env.ISSUER_API_URL || "http://issuer-api:7002").replace(/\/$/, "");
const courseTemplateMapPath = process.env.COURSE_TEMPLATE_MAP_PATH;

const defaultCourseToTemplateFile = {
  "Educational ID": "EducationalIDCredential.json",
  "Aprendizaje automático supervisado: Regresión y clasificación": "AprendizajeAutomaticoSupervisado.json",
  "Algoritmos avanzados de aprendizaje": "AlgoritmosAvanzadosDeAprendizaje.json",
  "Aprendizaje no supervisado, recomendadores, aprendizaje por refuerzo": "AprendizajeNoSupervisado.json"
};

let normalizedCourseToTemplateFileCache = null;

function normalizeCourseName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

async function loadCourseTemplateMap() {
  if (normalizedCourseToTemplateFileCache) {
    return normalizedCourseToTemplateFileCache;
  }

  let mapFromFile = {};
  if (courseTemplateMapPath) {
    try {
      const rawMap = await fs.readFile(courseTemplateMapPath, "utf8");
      const parsedMap = JSON.parse(rawMap);
      if (parsedMap && typeof parsedMap === "object" && !Array.isArray(parsedMap)) {
        mapFromFile = parsedMap;
      }
    } catch (error) {
      // Optional file: keep compatibility when no external map is provided.
      mapFromFile = {};
    }
  }

  const mergedMap = {
    ...defaultCourseToTemplateFile,
    ...mapFromFile,
  };

  normalizedCourseToTemplateFileCache = Object.entries(mergedMap).reduce(
    (acc, [name, template]) => {
      acc[normalizeCourseName(name)] = template;
      return acc;
    },
    {}
  );

  return normalizedCourseToTemplateFileCache;
}

async function getTemplateFileName(courseName) {
  const normalizedMap = await loadCourseTemplateMap();
  return normalizedMap[normalizeCourseName(courseName)];
}

function overrideClaimTitleWithSelectedCourse(credentialPayload, courseName) {
  const selectedCourse = String(courseName || "").trim();
  if (!selectedCourse) {
    return credentialPayload;
  }

  const claim = credentialPayload?.credentialData?.credentialSubject?.hasClaim?.[0];
  if (!claim) {
    return credentialPayload;
  }

  // Keep the original template structure but ensure the visible claim title matches the selected course.
  claim.title = {
    ...(claim.title || {}),
    es: [selectedCourse],
    en: [selectedCourse],
    fr: [selectedCourse],
  };

  if (claim.specifiedBy) {
    claim.specifiedBy.title = {
      ...(claim.specifiedBy.title || {}),
      es: [selectedCourse],
      en: [selectedCourse],
      fr: [selectedCourse],
    };
  }

  return credentialPayload;
}

const replacePlaceholders = (json, data) => {
  let jsonString = JSON.stringify(json);
  for (const key in data) {
    const placeholder = `{{${key}}}`;
    const value = data[key];
    jsonString = jsonString.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
  }
  return JSON.parse(jsonString);
};

async function buildCredentialPayload(courseName, studentInfo) {
  const templateFileName = await getTemplateFileName(courseName);
  if (!templateFileName) {
    throw Object.assign(new Error(`Curso no soportado: ${courseName}`), { status: 400 });
  }
  const templatePath = path.join(presentationDefinitionDir, templateFileName);
  let credentialPayload;
  try {
    const templateContent = await fs.readFile(templatePath, 'utf8');
    credentialPayload = JSON.parse(templateContent);
  } catch (err) {
    throw Object.assign(new Error(`Error al leer la plantilla para el curso "${courseName}".`), { status: 500 });
  }
  credentialPayload = replacePlaceholders(credentialPayload, studentInfo);
  credentialPayload = overrideClaimTitleWithSelectedCourse(credentialPayload, courseName);
  return credentialPayload;
}

router.post('/', async (req, res) => {
  const { courseNames, studentInfo } = req.body;

  if (!Array.isArray(courseNames) || courseNames.length === 0) {
    return res.status(400).json({ message: "courseNames debe ser un array no vacío" });
  }

  try {
    const payloads = await Promise.all(
      courseNames.map(name => buildCredentialPayload(name, studentInfo))
    );

    try {
      const response = await axios.post(
        `${issuerApiUrl}/openid4vc/jwt/issueBatch`,
        payloads
      );
      return res.json(response.data);
    } catch (issueError) {
      const status = issueError?.response?.status || 502;
      const details = issueError?.response?.data?.message || issueError.message;
      console.error("Error al emitir en issuer-api:", details);
      return res.status(status).json({
        message: "Error al emitir las credenciales en issuer-api",
        details,
      });
    }
  } catch (error) {
    const status = error.status || 500;
    console.error("Error al procesar la emisión:", error.message);
    res.status(status).json({ message: error.message });
  }
});

module.exports = router