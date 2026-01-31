# Architecture:
```
Nginx (host)
   ↓
Node.js (Docker)
   ↓
Database (Docker)
```

Node.js and DB talk inside Docker

Database is NOT exposed to the internet

Everything starts with one command

# Why use a database container?
Because:

No DB install on EC2

Easy reset

Same setup everywhere

Perfect for learning & CI/CD

# Database stack:
PostgreSQL

# Steps
## Add docker compose:
```
version: "3.8"

services:
  backend:
    build: .
    container_name: node-backend
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_USER=postgres
      - DB_PASSWORD=postgres
      - DB_NAME=myapp
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15
    container_name: postgres-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```
What You Just Defined (Important)
```
🔹 Two services

backend → Node.js app

db → PostgreSQL database

🔹 Internal networking (magic part)

DB_HOST=db

db is the service name

Docker creates an internal DNS

No IPs. No ports. No chaos.
```
## Rebuild & Start Everything
- Stop old container:
`docker-compose down`
- build and start:
`docker-compose up -d --build`
- check status:
`docker-compose ps`
## Test DB connection:
`http://<ELASTIC-IP>/db-check`