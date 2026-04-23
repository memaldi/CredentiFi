# CredentiFi Platform

Platform for digital microcredential management, identity verification, and user administration, based on microservices and deployed with Docker Compose.

---

## Table of Contents

- [Description](#description)
- [Architecture](#architecture)
- [Services](#services)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Test](#test)
- [How to Deploy](#how-to-deploy)
- [Multi-tenant Deployment (Deusto + Lumiere)](#multi-tenant-deployment-deusto--lumiere)
- [Notes and Tips](#notes-and-tips)

---

## Description

CredentiFi is a microservices-based solution for managing and verifying digital microcredentials, integrating both SQL and NoSQL databases as well as decentralized identity (DID) systems. The platform is designed to be modular and scalable, making it easier to integrate new features and services.

---

## Architecture

The architecture is based on Docker Compose and integrates the following main components:

- **Frontend**: React web application for managing and viewing microcredentials.
- **API Gateway**: Node.js microservice that acts as a single entry point for all APIs.
- **Backend services**:
    - **sql-api**: FastAPI microservice for relational data management (MySQL).
    - **mongodb-api**: Node.js microservice for MongoDB operations.
    - **verifierissuer-api**: Node.js microservice for microcredential verification and issuance.
    - **ebsifake**: Mock EBSI service (optional).
- **WaltID**: Identity and verification services (wallet-api, issuer-api, verifier-api, etc.).
- **Databases**: MySQL and MongoDB, accessible as containers.
- **Caddy**: Reverse proxy to simplify access and port configuration.


---

## Services

| Service            | Port   | Description                                                |
|--------------------|--------|------------------------------------------------------------|
| frontend           | 5173   | Main web application                                       |
| api-gateway        | 5000   | Gateway used to route requests to the different services   |
| sql-api            | 8000   | API for MySQL operations (users, courses, etc.)            |
| mongodb-api        | 4000   | API for MongoDB operations                                 |
| verifierissuer-api | 3000   | API for microcredential verification/issuance              |
| ebsifake           | 2000   | Fake EBSI service (optional)                               |
| mongo-server       | 27017  | MongoDB server                                             |
| mysql              | 3306   | MySQL server                                               |
| caddy              | various| Reverse proxy and certificate management                   |


---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose v2](https://docs.docker.com/compose/)
- [Walt.id v0.18.0](https://github.com/walt-id/waltid-identity/releases/tag/v0.18.0)
- (Optional) Node.js and npm, Python 3.10+ for local development

---

## Configuration

1. **Clone the repository** (including the waltid-identity submodule):
   ```sh
   git clone --recurse-submodules https://github.com/InigoValdivielso/PFG
   cd PFG
   ```
   If you already cloned the repository without the submodule:
   ```sh
   git submodule update --init
   ```
---

## Test

The following sections explain how to run tests for the different project services:

### Pytest (for the Python backend)

Run the tests and generate an HTML report:
```sh
    python -m pytest tests/routes --html=pytest_report.html --self-contained-html -v
```

### Jest/supertest (for the Node.js/Express.js backend)

Applies to all microservices built with Node.js/Express.js:

```sh
    npm test
```

### Vitest (for the Vite/React frontend)

Launch the interactive Vite UI:

```sh
    npx vitest --ui
```
---
## How to Deploy

1. **Build and deploy all services**
   ```bash
    docker compose -p pfg up --build
   ```
2. **Access the web application**
Open http://localhost:5173

3. **Access the WaltID wallet services**
- Dev Wallet UI: http://localhost:7104
- Wallet API: http://localhost:7001
- Issuer API: http://localhost:7002
- Verifier API: http://localhost:7003

## Multi-tenant Deployment (Deusto + Lumiere)

To run both tenants in parallel, use the `docker-compose.tenants.yaml` file.

1. **Start both tenants**
    ```bash
    docker compose -f docker-compose.tenants.yaml -p credentifi-tenants up --build -d
    ```

2. **Check container status**
    ```bash
    docker compose -f docker-compose.tenants.yaml -p credentifi-tenants ps
    ```

3. **Available frontends**
    - Deusto: http://localhost:5173
    - Lumiere: http://localhost:5174

4. **API Gateways**
    - Deusto: http://localhost:5000
    - Lumiere: http://localhost:5001

5. **WaltID (shared wallet for both tenants)**
    - Shared Wallet UI (users from both Deusto and Lumiere): http://localhost:7104
    - Shared Wallet API (single instance): http://localhost:7001
    - Deusto Issuer API: http://localhost:7002
    - Lumiere Issuer API: http://localhost:7012
    - Deusto Verifier API: http://localhost:7003
    - Lumiere Verifier API: http://localhost:7013

6. **Shared wallet requirement**
Use a single WaltID wallet instance for both tenants so users from both universities authenticate and manage credentials in the same wallet UI/API. Both tenant frontends should point to this shared wallet endpoint.

7. **Student sign-in (multi-tenant)**
    - Deusto: go to `http://localhost:5173/studentLogin` and use basic login:
      - User: `mikel@deusto.es` / Password: `mikel` (seeded at init)
      - User: `eva@opendeusto.es` / Password: `eva` (seeded at init)
    - Lumiere (UNILUM): go to `http://localhost:5174/studentLogin` and use **basic login** (no Google):
      - User: student NIA (or student email)
            - Password: student password (alphanumeric)
            - Default seeded UNILUM user at init: `eva@unilum.fr` / `eva`
    - A direct **Connexion** link is available in the Lumiere top header.

8. **University staff sign-in (multi-tenant)**

        Access the secretary panel to review and manage student applications.

        - Deusto: go to `http://localhost:5173/secretaryLogin`
            - User: `staffdeusto` / Password: `staff1234`
        - Lumiere (UNILUM): go to `http://localhost:5174/secretaryLogin`
            - User: `staffunilum` / Password: `staff1234`

    After login you are redirected to `/secretary` (application review) and can also navigate to `/secretaryActas` (academic records). Select a course from the dropdown to list and manage the student applications for that programme.


9. **View logs for a specific service**
    ```bash
    docker compose -f docker-compose.tenants.yaml -p credentifi-tenants logs -f api-gateway-deusto
    docker compose -f docker-compose.tenants.yaml -p credentifi-tenants logs -f api-gateway-lumiere
    ```

10. **Stop and remove containers for both tenants**
    ```bash
    docker compose -f docker-compose.tenants.yaml -p credentifi-tenants down
    ```

11. **Stop and also remove volumes (clean database reset)**
    ```bash
    docker compose -f docker-compose.tenants.yaml -p credentifi-tenants down -v
    ```

## Run Single-Stack and Multi-tenant Together

If you want to run both `pfg` and `credentifi-tenants` at the same time, use the override file `docker-compose.concurrent.yaml` for `pfg`.

1. **Start pfg in concurrent mode**
    ```bash
    docker compose -f docker-compose.yaml -f docker-compose.concurrent.yaml -p pfg up --build -d
    ```

2. **Concurrent-mode URLs for pfg**
    - Frontend: http://localhost:5273
    - API Gateway: http://localhost:5100
    - MongoDB API: http://localhost:4100
    - SQL API: http://localhost:8100
    - Verifier/Issuer API: http://localhost:3100
    - Wallet API: http://localhost:7201
    - Issuer API: http://localhost:7202
    - Verifier API: http://localhost:7203
    - Dev Wallet UI: http://localhost:7214

3. **Stop pfg in concurrent mode**
    ```bash
    docker compose -f docker-compose.yaml -f docker-compose.concurrent.yaml -p pfg down
    ```

## Managing the waltid-identity Submodule

This project integrates [waltid-identity](https://github.com/walt-id/waltid-identity) as a Git submodule, pinned to the stable version `v0.18.0`. The WaltID source code is not included in this repository; only a pointer to the commit is stored.

**Update to a new version of waltid-identity:**
```sh
cd waltid-identity
git fetch
git checkout vX.Y.Z
cd ..
git add waltid-identity
git commit -m "Update waltid-identity to vX.Y.Z"
```

---

## Notes and Tips
If you need to restart a database or restore a backup, access the corresponding container and follow the instructions in the /backup directory or the initialization scripts.

You can customize ports and routes by modifying the .env files and the docker-compose.yaml file.

Check the logs for each service with:
   ```sh
    docker compose logs <service>
   ```
For local development of a service, you can run only that microservice and its corresponding database.

