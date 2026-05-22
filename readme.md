# Fullstack Ruby + Angular Application

This is a fullstack web application built with:

- Backend: Ruby on Rails (API)

- Frontend: Angular (Standalone)

- Database: PostgreSQL

- Deployment: Railway

The project is structured as a modular fullstack system with separated backend and frontend applications.

---

## 📁 Project Structure

---

## 🚀 Tech Stack

### Backend

- Ruby on Rails 8+
- PostgreSQL
- RESTful API architecture
- Service layer pattern (app/services)
- DTO pattern (app/dtos)
- Background jobs (app/jobs)

### Frontend

- Angular (Standalone Components)
- Angular Router
- Signals for state management
- TailwindCSS
- SSR enabled (Angular Universal structure)

---

## ⚙️ Backend Setup

### Install dependencies

```bash
cd backend
bundle install
```

📌 Key Features

- Fullstack CRUD system
- Modular architecture
- Global state handling (Angular signals)
- Layout system (header / footer / router outlet)
- REST API integration
- Production-ready deployment structure

## 🌍 Deployment

### Backend (Railway)

- Rails API deployed on Railway
- PostgreSQL database hosted on Railway
- Environment variables managed via Railway dashboard

---

### Frontend (Cloudflare Workers)

- Angular application deployed using Cloudflare Workers
- Built as static assets (SSR optional depending on config)
- Served globally via Cloudflare edge network
- Fast CDN performance and low latency worldwide

website : [https://demo-angular.onebluesky882.workers.dev](https://demo-angular.onebluesky882.workers.dev)
