# CredentiFi Platform

Plataforma de gestión de microcredenciales digitales, verificación de identidad y administración de usuarios, basada en microservicios y desplegada con Docker Compose.

---

## Índice

- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Servicios](#servicios)
- [Requisitos previos](#requisitos-previos)
- [Configuración](#configuración)
- [Test](#test)
- [Cómo desplegar](#cómo-desplegar)
- [Notas y consejos](#notas-y-consejos)

---

## Descripción

CredentiFi es una solución basada en microservicios que permite la gestión y verificación de microcredenciales digitales, integrando tanto bases de datos SQL como NoSQL, y sistemas de identidad descentralizada (DID). La plataforma está diseñada para ser modular y escalable, facilitando la integración de nuevas funcionalidades y servicios.

---

## Arquitectura

La arquitectura se basa en Docker Compose, integrando los siguientes componentes principales:

- **Frontend**: Aplicación web en React para la gestión y visualización de microcredenciales.
- **API Gateway**: Microservicio Node.js que actúa como punto de entrada único para todas las APIs.
- **Servicios backend**:
    - **sql-api**: Microservicio FastAPI para la gestión de datos relacionales (MySQL).
    - **mongodb-api**: Microservicio Node.js para operaciones con MongoDB.
    - **verifierissuer-api**: Microservicio Node.js para la verificación y emisión de microcredenciales.
    - **ebsifake**: Servicio simulado para EBSI (opcional).
- **WaltID**: Servicios de identidad y verificación (wallet-api, issuer-api, verifier-api, etc.).
- **Bases de datos**: MySQL y MongoDB, accesibles como contenedores.
- **Caddy**: Reverse proxy para facilitar el acceso y la configuración de puertos.


---

## Servicios

| Servicio           | Puerto | Descripción                                                |
|--------------------|--------|------------------------------------------------------------|
| frontend           | 5173   | Aplicación web principal                                   |
| api-gateway        | 5000   | Gateway para enrutar peticiones a los distintos servicios  |
| sql-api            | 8000   | API para operaciones con MySQL (usuarios, cursos, etc.)    |
| mongodb-api        | 4000   | API para operaciones con MongoDB                           |
| verifierissuer-api | 3000   | API para verificación/emisión de microcredenciales         |
| ebsifake           | 2000   | Servicio fake EBSI (opcional)                              |
| mongo-server       | 27017  | Servidor MongoDB                                           |
| mysql              | 3306   | Servidor MySQL                                             |
| caddy              | varios | Reverse proxy y gestión de certificados                    |


---

## Requisitos previos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose v2](https://docs.docker.com/compose/)
- [Walt.id v0.18.0](https://github.com/walt-id/waltid-identity/releases/tag/v0.18.0)
- (Opcional) Node.js y npm, Python 3.10+ para desarrollo local

---

## Configuración

1. **Clona el repositorio** (incluyendo el submódulo de waltid-identity):
   ```sh
   git clone --recurse-submodules https://github.com/InigoValdivielso/PFG
   cd PFG
   ```
   Si ya tienes el repositorio clonado sin el submódulo:
   ```sh
   git submodule update --init
   ```
---

## Test

A continuación se explica cómo ejecutar los tests de los distintos servicios del proyecto:

### Pytest (para el backend en Python)

Ejecuta los tests y genera un informe en HTML:
```sh
    python -m pytest tests/routes --html=pytest_report.html --self-contained-html -v
```

### Jest/supertest (para el backend en Node.js/Express.js)

Sirve para todos los microservicios creados en Node.js/Express.js:

```sh
    npm test
```

### Vitest (para el frontend en Vite/React)

Lanza la interfaz interactiva de Vitest:

```sh
    npx vitest --ui
```
---
## Cómo desplegar

1. **Build y despiegue de todos los servicios**
   ```bash
    docker compose -p pfg up --build
   ```
2. **Acceso a la aplicación web**
Accede a http://localhost:5173

## Gestión del submódulo waltid-identity

Este proyecto integra [waltid-identity](https://github.com/walt-id/waltid-identity) como submódulo Git, fijado a la versión estable `v0.18.0`. El código fuente de WaltID no se incluye en este repositorio; solo se almacena un puntero al commit.

**Actualizar a una nueva versión de waltid-identity:**
```sh
cd waltid-identity
git fetch
git checkout vX.Y.Z
cd ..
git add waltid-identity
git commit -m "Update waltid-identity to vX.Y.Z"
```

---

## Notas y consejos
Si necesitas reiniciar una base de datos o restaurar un backup, accede al contenedor correspondiente y sigue las instrucciones del directorio /backup o scripts de inicialización.

Puedes personalizar los puertos y rutas modificando los .env y el archivo docker-compose.yaml.

Revisa los logs de cada servicio con:
   ```sh
    docker compose logs <servicio>
   ```
Para desarrollo local de un servicio, puedes levantar solo ese microservicio y la base de datos correspondiente.

