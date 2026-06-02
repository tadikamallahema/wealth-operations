# Wealth Operations

A monorepo for a financial operations platform with backend services and a React frontend.

## Overview

This repository contains four main components:

- `main_db`: Core backend service handling authentication, portfolio management, auditing, monitoring, and real-time socket communication.
- `equity_db`: Equity microservice providing equity-related data and API endpoints.
- `mutual-funds-service`: Mutual fund service for funds, investors, SIPs, and transaction workflows.
- `wealth-operation-frontend`: React + Vite frontend application with dashboard and investor interfaces.

## Repository Structure

- `main_db/`
  - `src/index.ts`: Main server entry point
  - `src/config/pgManager.ts`: PostgreSQL client configuration
  - `src/config/redis.ts`: Redis connection setup
  - `src/config/serviceClients.ts`: HTTP clients for external services
  - `src/routes/`: REST API routes
  - `src/sockets/`: WebSocket auth and event handling
  - `src/middleware/`: Security, logging, and rate limiting middleware

- `equity_db/`
  - `src/index.ts`: Equity service server entry point
  - `src/config/pgManager.ts`: PostgreSQL connection helper
  - `src/routes/equityRoute.ts`: Equity API route definitions

- `mutual-funds-service/`
  - `src/server.ts`: Mutual fund service server entry point
  - `src/config/db.ts`: PostgreSQL pool configuration
  - `src/config/redis.ts`: Redis connection setup
  - `src/routes/`: Service endpoints for funds, investors, SIPs, and transactions

- `wealth-operation-frontend/`
  - React + Vite application
  - `src/`: UI components, pages, routing, and state management
  - `src/context/`: Authentication and protected route handling

## Prerequisites

- Node.js 20+ (recommended for compatibility with TypeScript 6)
- npm
- PostgreSQL database accessible to backend services
- Redis instance for session/caching and pub/sub support

## Installation

Install dependencies for each package separately:

```bash
cd main_db && npm install
cd ../equity_db && npm install
cd ../mutual-funds-service && npm install
cd ../wealth-operation-frontend && npm install
```

## Starting Services

Start each service in its own terminal.

### Main backend service

```bash
cd main_db
npm run dev
```

### Equity microservice

```bash
cd equity_db
npm run dev
```

### Mutual funds service

```bash
cd mutual-funds-service
npm run dev
```

### Frontend application

```bash
cd wealth-operation-frontend
npm run dev
```

The frontend typically runs on `http://localhost:5173`.

## Service Endpoints

- `main_db` (default): `http://localhost:4004`
  - `/api/auth`
  - `/api/portfolio`
  - `/api/audit`
  - `/api/monitoring`
  - `/test-socket`

- `equity_db`: served at the configured `SERVER_PORT`
  - `/api/equity`

- `mutual-funds-service`: served at the configured `PORT`
  - `/funds`
  - `/investors`
  - `/sips`
  - `/transactions`

## Configuration Notes

Each backend service uses environment variables to configure:

- database connection settings
- Redis connection URLs
- JWT secrets and service URLs
- server port values

Keep configuration secure and provide service-specific variables through your local environment or deployment platform.

## Development Notes

- `main_db` integrates with Supabase/PostgreSQL and Redis.
- `equity_db` and `mutual-funds-service` each connect to PostgreSQL and expose domain-specific REST APIs.
- `wealth-operation-frontend` uses React, React Router, Tailwind CSS, and Socket.IO client support.

## Recommendations

- Run services in separate terminals during development.
- Confirm database and Redis connectivity before starting the backend.
- Point the frontend at the backend server addresses configured in the UI or API client.
