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

5. **View logs for a specific service**
    ```bash
    docker compose -f docker-compose.tenants.yaml -p credentifi-tenants logs -f api-gateway-deusto
    docker compose -f docker-compose.tenants.yaml -p credentifi-tenants logs -f api-gateway-lumiere
    ```

6. **Stop and remove containers for both tenants**
    ```bash
    docker compose -f docker-compose.tenants.yaml -p credentifi-tenants down
    ```

7. **Stop and also remove volumes (clean database reset)**
    ```bash
    docker compose -f docker-compose.tenants.yaml -p credentifi-tenants down -v
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

