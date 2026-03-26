# Vignan School - 3-Tier Application

A full-stack school management application built with **React**, **Node.js/Express**, and **PostgreSQL**, ready to deploy on **Kind Kubernetes**.

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   Backend    │────▶│  PostgreSQL   │
│  (React +    │     │  (Express +  │     │  (Database)   │
│   Nginx)     │     │   Node.js)   │     │              │
│  Port: 80    │     │  Port: 5000  │     │  Port: 5432  │
└─────────────┘     └──────────────┘     └──────────────┘
    Tier 1              Tier 2               Tier 3
```

## Features

- **Home Page**: School overview, stats, announcements, events, achievements
- **Students Portal**: Student directory with class filters
- **Faculty Page**: Teacher profiles with department info
- **Courses Page**: Academic curriculum details
- **Announcements**: News, events, and school updates
- **About Page**: School information, vision, mission, facilities

## Prerequisites

- Docker
- Kind (Kubernetes in Docker)
- kubectl

## Quick Deploy to Kind

```bash
./deploy.sh
```

This will:
1. Create a Kind cluster with 1 control-plane + 2 workers
2. Install NGINX Ingress Controller
3. Build and load Docker images
4. Deploy PostgreSQL with seed data
5. Deploy backend API (2 replicas)
6. Deploy frontend (2 replicas)
7. Configure Ingress routing

Access the app at: **http://localhost**

## Local Development (Docker Compose)

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- PostgreSQL: localhost:5432

## Kubernetes Resources

| Resource | Namespace | Replicas |
|----------|-----------|----------|
| PostgreSQL | vignan-school | 1 |
| Backend API | vignan-school | 2 |
| Frontend | vignan-school | 2 |

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| GET /api/health | Health check |
| GET /api/school | School info |
| GET /api/students | All students |
| GET /api/students/stats | Student statistics |
| GET /api/teachers | All teachers |
| GET /api/courses | All courses with teachers |
| GET /api/announcements | Latest announcements |
| GET /api/events | Upcoming events |
| GET /api/achievements | School achievements |

## Deploy on AWS EC2 (Cloud)

See the full guide: **[AWS-DEPLOYMENT-GUIDE.md](AWS-DEPLOYMENT-GUIDE.md)**

Quick steps:
```bash
# 1. Launch EC2: t3.medium, Amazon Linux 2023 or Ubuntu 22.04, 30GB storage
# 2. SSH into instance
ssh -i your-key.pem ec2-user@<EC2_PUBLIC_IP>

# 3. Clone repo and run
git clone <repo-url> && cd kubestarter/Projects/ReatcjsApp_3tier
./aws-deploy.sh    # Installs Docker, Kind, kubectl + deploys everything

# 4. Access via SSH tunnel (from your local machine)
ssh -i your-key.pem -L 8080:localhost:80 ec2-user@<EC2_PUBLIC_IP>
# Open http://localhost:8080
```

## Teardown

```bash
./teardown.sh
```

## Tech Stack

- **Frontend**: React 18, React Router, CSS3 (custom design)
- **Backend**: Node.js, Express.js, pg (PostgreSQL client)
- **Database**: PostgreSQL 15
- **Container**: Docker (multi-stage builds)
- **Orchestration**: Kubernetes (Kind)
- **Ingress**: NGINX Ingress Controller
