const express = require('express')
const router = express.Router()

const axios = require("axios")
const fs = require("fs").promises;
const path = require("path");

const presentationDefinitionDir =
  process.env.PRESENTATION_DEFINITION_DIR ||
  path.join(__dirname, "..", "presentationDefinition");
const issuerApiUrl = (process.env.ISSUER_API_URL || "http://issuer-api:7002").replace(/\/$/, "");


const courseToTemplateFile = {
  "Educational ID": "EducationalIDCredential.json",
  "Aprendizaje automático supervisado: Regresión y clasificación": "AprendizajeAutomaticoSupervisado.json",
  "Algoritmos avanzados de aprendizaje": "AlgoritmosAvanzadosDeAprendizaje.json",
  "Aprendizaje no supervisado, recomendadores, aprendizaje por refuerzo": "AprendizajeNoSupervisado.json"
};

router.post('/', async (req, res) => {
  const { courseName, studentInfo } = req.body;
  const templatesDir = presentationDefinitionDir;

  try {
    const templateFileName = courseToTemplateFile[courseName];

    if (!templateFileName) {
        return res.status(400).json({ message: "Curso no soportado" });
    }

    const templatePath = path.join(templatesDir, templateFileName);


    try{
        const { readFile } = require('fs').promises;
        const templateContent = await readFile(templatePath, 'utf8');
        let credentialPayload = JSON.parse(templateContent);
        const replacePlaceholders = (json, data) => {
        let jsonString = JSON.stringify(json);
        for (const key in data) {
          const placeholder = `{{${key}}}`;
          const value = data[key];
          jsonString = jsonString.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
        }
        return JSON.parse(jsonString);
      };

      credentialPayload = replacePlaceholders(credentialPayload, studentInfo);

      const response = await axios.post(
        `${issuerApiUrl}/openid4vc/jwt/issue`,
        credentialPayload
      );
      res.json(response.data); 

    } catch (readError) {
      console.error(`Error al leer la plantilla ${templateFileName}:`, readError);
      return res.status(500).json({ message: `Error al leer la plantilla para el curso "${courseName}".` });
    }

  } catch (error) {
    console.error("Error al procesar la emisión:", error);
    res.status(500).json({ message: "Error al emitir la credencial", error: error.message });
  }
});

module.exports = router