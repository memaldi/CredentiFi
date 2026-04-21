const request = require('supertest');
const express = require('express');
const issuerApi = require('../routes/issuerApi');

jest.mock('axios');
const axios = require('axios');
const fs = require('fs').promises;

const app = express();
app.use(express.json());
app.use('/', issuerApi);

describe('Issuer API', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('POST / - emite lote de credenciales con cursos válidos', async () => {
    jest.spyOn(fs, 'readFile').mockResolvedValue(
      JSON.stringify({ "@context": ["test"], name: "{{nombre}}" })
    );
    axios.post.mockResolvedValueOnce({ data: "openid-credential-offer://example" });

    const res = await request(app)
      .post('/')
      .send({
        courseNames: ["Aprendizaje automático supervisado: Regresión y clasificación"],
        studentInfo: { nombre: "Jonan" }
      });

    expect(res.statusCode).toBe(200);
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/issueBatch'),
      expect.any(Array)
    );
  });

  it('POST / - emite lote con nombre de curso normalizado', async () => {
    jest.spyOn(fs, 'readFile').mockResolvedValue(
      JSON.stringify({ "@context": ["test"], name: "{{nombre}}" })
    );
    axios.post.mockResolvedValueOnce({ data: "openid-credential-offer://example" });

    const res = await request(app)
      .post('/')
      .send({
        courseNames: ["aprendizaje automatico supervisado: regresion y clasificacion"],
        studentInfo: { nombre: "Eva" }
      });

    expect(res.statusCode).toBe(200);
  });

  it('POST / - courseNames vacío devuelve 400', async () => {
    const res = await request(app)
      .post('/')
      .send({
        courseNames: [],
        studentInfo: { nombre: "Jonan" }
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/courseNames/);
  });

  it('POST / - curso no soportado en el lote', async () => {
    const res = await request(app)
      .post('/')
      .send({
        courseNames: ["No existe"],
        studentInfo: { nombre: "Jonan" }
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Curso no soportado/);
  });

  it('POST / - error leyendo plantilla', async () => {
    jest.spyOn(fs, 'readFile').mockRejectedValueOnce(new Error('Error simulado'));
    const res = await request(app)
      .post('/')
      .send({
        courseNames: ["Aprendizaje automático supervisado: Regresión y clasificación"],
        studentInfo: { nombre: "Jonan" }
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toMatch(/Error al leer la plantilla/);
  });
});
