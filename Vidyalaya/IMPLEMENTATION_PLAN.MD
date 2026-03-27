# VIDYALAYA — IMPLEMENTATION PLAN
## AI-Driven Centralized Education Ecosystem (India)
### Version 1.0 | Review Draft | 2026-03-27

---

> **Purpose of this Document**
> This is a pre-implementation review document. Read through each phase, confirm scope, flag anything to change, add, or remove — then we move into actual implementation.

---

## PROJECT NORTH STAR

**Name:** Vidyalaya ERP Platform
**Positioning:** "India's First AI-Driven Centralized Education Network"
**Model:** Hub-and-Spoke (1 Master Branch → N State Branches)
**Target:** 5 states, CBSE + UG/PG institutions
**Budget (Tech):** ₹5 Cr out of ₹50 Cr total
**Timeline:** 24–30 months (full rollout)

---

## TECHNOLOGY DECISIONS (CONFIRMED FROM DOCUMENTS)

| Layer | Technology | Rationale |
|---|---|---|
| Frontend Web | React.js | Admin panel, dashboards |
| Backend | Node.js (primary) | API-first, microservices |
| Mobile | Flutter | Parent + Student app (iOS + Android from single codebase) |
| Database | PostgreSQL (RDS Multi-AZ) | Relational, ACID-compliant for financial data |
| Cache | Redis (ElastiCache) | Sessions, dashboard caching |
| Cloud | AWS | EKS, RDS, S3, CloudFront, SNS, SES |
| Container Orchestration | Kubernetes (EKS) | Microservices deployment |
| CI/CD | GitHub → CodePipeline → CodeBuild → ECR → EKS | Full DevOps pipeline |
| Auth | AWS Cognito | Role-based, multi-tenant |
| Notifications | SNS (SMS) + SES (Email) + Firebase (Push) | Multi-channel alerts |
| Analytics | AWS Glue + Athena + S3 Data Lake | Reporting + AI insights |
| CDN | CloudFront | React app + static assets |
| Security | WAF + IAM + Cognito | Multi-layer |

---

## MICROSERVICES BREAKDOWN

| Service | Responsibility |
|---|---|
| `auth-service` | Login, JWT, Cognito integration, RBAC |
| `student-service` | Admission, profiles, transfer, history |
| `fee-service` | Fee generation, payment gateway, receipts, refunds |
| `attendance-service` | Daily attendance, absenteeism alerts, analytics |
| `academic-service` | Exams, marks, report cards, AI weak-student detection |
| `staff-service` | Onboarding, leave management, payroll |
| `transport-service` | Bus routes, GPS tracking, incident alerts |
| `notification-service` | SMS, email, push (fan-out to SNS/SES/Firebase) |
| `lms-service` | Live/recorded classes, content, assignments |
| `analytics-service` | KPI dashboards, predictive AI, centralized reporting |
| `admin-service` | Branch management, RBAC config, audit logs |
| `crm-service` | Lead management, inquiry tracking, admission funnel |

---

## ROLE-BASED ACCESS CONTROL (RBAC) MATRIX

| Role | Access Scope |
|---|---|
| Super Admin (Master) | Full system — all branches |
| State Director | All branches in state |
| Principal | Single branch — full control |
| Academic Coordinator | Academic module — branch level |
| Teacher | Own classes only |
| Student | Personal dashboard only |
| Parent | Own child's data only |
| Accountant | Finance module only |
| HR/Staff | HR + payroll module |

---

## PHASE-BY-PHASE IMPLEMENTATION PLAN

---

### PHASE 0 — FOUNDATION & DEVOPS BACKBONE
**Duration:** 3–4 weeks
**Goal:** Production-grade AWS infrastructure is running before a single line of app code is written.

#### 0.1 AWS Account & Networking
- Create AWS account with separate environments: `dev`, `staging`, `prod`
- VPC setup with public/private subnets across 3 AZs (Mumbai region — `ap-south-1`)
- NAT Gateway for private subnet egress
- Route53 for DNS management

#### 0.2 Kubernetes (EKS) Cluster
- Provision EKS cluster (prod: 3-node managed node group, `t3.medium` to start)
- Namespaces: `vidyalaya-dev`, `vidyalaya-staging`, `vidyalaya-prod`
- Install: Nginx Ingress Controller, Cert-Manager (Let's Encrypt), Metrics Server
- Horizontal Pod Autoscaler configured per service

#### 0.3 Database Setup
- RDS PostgreSQL 15 — Multi-AZ for prod, single-AZ for dev/staging
- Separate databases per service (database-per-service pattern)
- Read replica for analytics queries
- ElastiCache Redis cluster (session storage + caching)

#### 0.4 CI/CD Pipeline
- GitHub repo structure: monorepo with `/services/*` directories
- GitHub Actions → AWS CodePipeline → CodeBuild → ECR → EKS
- Separate pipelines per service
- Auto-deploy to `dev` on PR merge, manual approval gate for `prod`

#### 0.5 Observability Stack
- CloudWatch for AWS resource metrics
- Prometheus + Grafana on EKS for application metrics
- AWS X-Ray for distributed tracing
- Centralized logging: CloudWatch Logs + log groups per service

#### 0.6 Security Baseline
- IAM roles with least-privilege for all services (IRSA — IAM Roles for Service Accounts)
- AWS WAF attached to ALB
- AWS Secrets Manager for all credentials (no hardcoded secrets)
- S3 buckets: private, encrypted, versioned

**Deliverables at end of Phase 0:**
- [ ] EKS cluster running and accessible
- [ ] RDS instances provisioned
- [ ] CI/CD pipeline deploying a Hello World service end-to-end
- [ ] Monitoring dashboards live

---

### PHASE 1 — CORE PLATFORM: AUTH + STUDENT + FEE
**Duration:** 6–8 weeks
**Goal:** MVP that can onboard a student, collect a fee, and log attendance. This is the financial and operational backbone.

#### 1.1 Auth Service
- AWS Cognito User Pool — one pool per tenant (branch/organization)
- User groups map directly to RBAC roles (above matrix)
- JWT tokens issued, validated by API Gateway / Ingress
- Password policies, MFA for Admin roles
- Endpoints: `/auth/login`, `/auth/refresh`, `/auth/logout`, `/auth/forgot-password`

#### 1.2 Student Service
**Database tables:** `students`, `admissions`, `academic_history`, `class_sections`

**Scenarios covered:**
- Scenario 1: New Admission — Inquiry → Test → Seat Check → Admission → Fee → Student ID
- Scenario 2: Waitlist — Queue management, auto-notify on seat opening
- Scenario 3: Transfer Student — Record import, pro-rata fee calculation, syllabus mapping
- Scenario 37: Inter-branch transfer

**API endpoints:**
```
POST   /students/inquiries         — capture lead
POST   /students/admissions        — confirm admission
GET    /students/:id               — student profile
PUT    /students/:id               — update profile
POST   /students/transfer          — inter-branch transfer
GET    /students/class/:classId    — class roster
```

#### 1.3 Fee Service
**Database tables:** `fee_structures`, `fee_invoices`, `payments`, `refunds`, `penalties`

**Scenarios covered:**
- Scenario 4: Online payment — UPI/Card/Netbanking via Razorpay
- Scenario 5: Late fee / penalty with escalating reminders
- Scenario 6: Refund workflow (Principal → Accounts approval chain)
- Scenario 27: Revenue tracking
- Scenario 42: Payment failure retry

**Key design decisions:**
- Razorpay as payment gateway (best UPI support in India)
- Webhook handler for payment confirmation (idempotent)
- Auto-receipt generation via PDF (stored in S3)
- Fee structure configured at Master Branch level, inherited by all branches

**API endpoints:**
```
POST   /fees/structures            — create fee structure (admin)
POST   /fees/invoices/generate     — generate invoices (batch)
POST   /fees/payments/initiate     — create payment order
POST   /fees/payments/webhook      — Razorpay webhook
GET    /fees/invoices/:studentId   — student's fee history
POST   /fees/refunds               — initiate refund
```

#### 1.4 Attendance Service
**Database tables:** `attendance_records`, `attendance_summary`, `absenteeism_alerts`

**Scenarios covered:**
- Scenario 7: Daily attendance (teacher marks → instant parent notification)
- Scenario 8: Continuous absenteeism trigger (>3 days → alert parent + coordinator)
- Scenario 40: Offline mode — attendance logged offline, sync on reconnect

**API endpoints:**
```
POST   /attendance/mark            — teacher marks attendance
GET    /attendance/class/:classId/:date
GET    /attendance/student/:id/summary
POST   /attendance/sync            — offline sync endpoint
```

#### 1.5 Notification Service
**Architecture:** Async, event-driven via SQS queues
- Fee due → SQS → Notification Service → SNS (SMS) + SES (Email) + Firebase (push)
- Absent alert → SQS → Notification Service → Firebase push to parent
- Emergency alert → broadcast to all parents in branch

**Channels:** SMS (SNS), Email (SES), Push (Firebase Cloud Messaging)

**Deliverables at end of Phase 1:**
- [ ] Student can be admitted end-to-end
- [ ] Fee can be generated, paid online, receipt auto-generated
- [ ] Teacher can mark attendance, parent gets push notification
- [ ] All RBAC roles working correctly

---

### PHASE 2 — ACADEMIC + STAFF + ADMIN PANEL
**Duration:** 6–8 weeks
**Goal:** Complete the operational ERP. Exams, results, staff management, and the web admin panel.

#### 2.1 Academic Service
**Database tables:** `exams`, `marks`, `report_cards`, `subjects`, `syllabus`, `assignments`

**Scenarios covered:**
- Scenario 9: Exam scheduling → marks entry → auto grade → report card PDF
- Scenario 10: AI weak-student identification (threshold-based in Phase 2, ML in Phase 4)
- Scenario 11: Topper leaderboard + auto certificate generation

#### 2.2 Staff Service
**Database tables:** `staff`, `leaves`, `payroll`, `payslips`, `substitutions`

**Scenarios covered:**
- Scenario 12: Staff onboarding — HR creates profile, role assigned, Cognito account provisioned
- Scenario 13: Leave management — apply → Principal approves → substitute assigned
- Scenario 14: Payroll — attendance-based salary calculation, auto payslip PDF to S3

#### 2.3 Admin Service + CRM
**Scenarios covered:**
- Scenario 24: Branch KPI dashboard (admissions, revenue, results)
- Scenario 25: Master branch centralized reporting with drill-down
- Scenario 26: RBAC configuration
- Scenario 38: Lead/inquiry tracking
- Scenario 39: Campaign attribution / marketing ROI
- Scenario 30/31: CBSE audit readiness reports, government data submission

#### 2.4 React Web Admin Panel
**Pages / Dashboards:**

| Dashboard | Users |
|---|---|
| Master Branch Dashboard | Super Admin, CEO |
| Branch Dashboard | Principal, State Director |
| Academic Dashboard | Academic Coordinator |
| Finance Dashboard | Accountant |
| Staff Dashboard | HR |
| Teacher Dashboard | Teacher |
| Student Profile | Admin + Teacher |

**Tech:** React.js + TypeScript, hosted on S3 + CloudFront
**UI Library:** Material UI or Ant Design (decision needed from you)
**State Management:** Redux Toolkit or Zustand (decision needed from you)

**Deliverables at end of Phase 2:**
- [ ] Full staff lifecycle operational
- [ ] Exams and report cards working
- [ ] Admin panel live on CloudFront
- [ ] Master branch can see all branch data

---

### PHASE 3 — MOBILE APP (FLUTTER) + TRANSPORT + LMS
**Duration:** 8–10 weeks
**Goal:** Parent and student mobile apps, bus tracking, and the Learning Management System.

#### 3.1 Flutter Mobile App — Parent
**Features:**
- Real-time attendance alerts (push notification)
- Fee payment (Razorpay SDK)
- Teacher chat / PT meeting scheduling
- Live bus tracking (Google Maps SDK)
- Homework and announcements feed
- Emergency alerts

#### 3.2 Flutter Mobile App — Student
**Features:**
- Attendance percentage
- Exam results and report cards
- Homework / assignment submission
- LMS access (live class join + recorded videos)
- Fee status

#### 3.3 Transport Service
**Database tables:** `bus_routes`, `bus_allocations`, `gps_events`, `transport_incidents`

**Scenarios covered:**
- Scenario 15: Bus allocation — student assigned to route/seat
- Scenario 16: Live GPS tracking — real-time location in parent app
- Scenario 17: Transport incident — emergency alert broadcast

**Tech:** GPS device → MQTT → IoT Core → Lambda → WebSocket (API Gateway) → Flutter app

#### 3.4 LMS Service
**Database tables:** `courses`, `lessons`, `video_content`, `assignments`, `submissions`, `grades`

**Scenarios covered:**
- Scenario 21: Online class — teacher schedules, students join (Zoom/Jitsi integration or custom WebRTC)
- Scenario 22: Content management — video upload to S3, notes, version control
- Scenario 23: Assignment submission → teacher evaluation

**Video hosting:** S3 + CloudFront (private, signed URLs)
**Live classes:** Zoom SDK integration (cost-effective vs. building WebRTC)

**Deliverables at end of Phase 3:**
- [ ] Parent app on Play Store + App Store (beta)
- [ ] Student app functional
- [ ] Bus tracking live
- [ ] LMS with recorded classes operational

---

### PHASE 4 — AI / ANALYTICS ENGINE
**Duration:** 6–8 weeks
**Goal:** The differentiator. AI-powered insights that no traditional school chain has.

#### 4.1 Data Lake Architecture
- All service events stream to S3 Data Lake (via Kinesis Firehose)
- AWS Glue ETL jobs for transformation
- Athena for ad-hoc SQL queries
- QuickSight (or Grafana) for BI dashboards

#### 4.2 AI/ML Models

| Model | Input | Output | Scenario |
|---|---|---|---|
| Dropout Predictor | Attendance + grades + fee payment | Dropout risk score | Scenario 34 |
| Performance Forecaster | Historical marks + test scores | Predicted board exam score | Scenario 34 |
| Weak Student Detector | Rolling average marks, assignment scores | Flag + auto-assign mentor | Scenario 10 |
| Personalized Content Recommender | Learning history, weak topics | Next content to study | Scenario 35 |
| Fee Default Predictor | Payment history + parent profile | Default risk | Scenario 27 |

**Tech Stack:**
- Model training: SageMaker (or Python scripts on EC2)
- Model serving: SageMaker Endpoints → `analytics-service`
- Feature store: S3 + Glue

#### 4.3 KPI Dashboards (AI-augmented)
- Branch health score (composite: admissions + results + fee collection + attendance)
- Teacher effectiveness score
- Predictive revenue projection
- Student cohort analysis

**Deliverables at end of Phase 4:**
- [ ] Data lake ingesting all service events
- [ ] At least 3 AI models live in production
- [ ] KPI dashboards accessible to Master Branch

---

### PHASE 5 — MULTI-BRANCH EXPANSION + COMPLIANCE + HARDENING
**Duration:** 4–6 weeks
**Goal:** Scale from 1 branch to 5 branches. Governance, compliance, and production hardening.

#### 5.1 Multi-Tenancy Architecture
- Branch isolation: all data tagged with `branch_id` + `state_id`
- Row-level security in PostgreSQL per branch
- Master branch gets read access to all branches, zero cross-branch data leakage for branch users
- Scenario 36: Central policy push (curriculum, fees, policies) from Master → all branches
- Scenario 37: Inter-branch transfer fully automated

#### 5.2 Compliance & Audit
- Scenario 30: CBSE audit readiness — automated report generation
- Scenario 31: Government data submission formats
- Full audit log for all financial transactions (immutable, stored in S3)
- DPDP Act (India's data protection law) compliance: consent management, data minimization

#### 5.3 Security Hardening
- Scenario 32: Penetration testing + remediation
- Scenario 33: Intrusion detection (AWS GuardDuty)
- Secrets rotation (Secrets Manager)
- TLS 1.3 enforced everywhere
- OWASP Top 10 audit

#### 5.4 Resilience & DR
- Multi-AZ RDS failover tested
- EKS node failure simulation (Chaos Engineering — Chaos Mesh)
- Scenario 40: Offline mode for attendance (PWA fallback)
- Scenario 41: Data recovery drill — RDS snapshot restore tested
- RTO: 1 hour, RPO: 15 minutes

#### 5.5 Performance Testing
- Load test: 10,000 concurrent users (fee payment day simulation)
- Database query optimization (EXPLAIN ANALYZE on all slow queries)
- Redis caching for all dashboard reads

**Deliverables at end of Phase 5:**
- [ ] 5 branches onboarded
- [ ] Security audit passed
- [ ] DR drill completed
- [ ] CBSE compliance reports auto-generated

---

### PHASE 6 — FRANCHISE / SAAS READINESS
**Duration:** 6–8 weeks (post-stabilization)
**Goal:** Turn the platform into a SaaS product that can be licensed to other school chains.

#### 6.1 SaaS Multi-Tenancy
- Tenant onboarding API (new school chain = new tenant in minutes)
- White-label branding (logo, colors, domain per tenant)
- Tiered pricing: Basic (ERP only), Pro (ERP + LMS), Enterprise (Full AI stack)

#### 6.2 Franchise Model Support
- Scenario 38/39: Lead tracking and marketing attribution per franchise
- Franchise performance benchmarking dashboard
- SLA monitoring per franchise

#### 6.3 Future Integrations
- UDISE+ (government school data portal)
- DigiLocker (student document storage)
- NATS/CUET exam prep module

---

## OVERALL TIMELINE SUMMARY

| Phase | Name | Duration | Key Milestone |
|---|---|---|---|
| Phase 0 | DevOps Foundation | 3–4 weeks | EKS + RDS + CI/CD live |
| Phase 1 | Core ERP (Admission + Fee + Attendance) | 6–8 weeks | First student admitted and fee paid |
| Phase 2 | Academics + Staff + Admin Panel | 6–8 weeks | Admin panel live, exams working |
| Phase 3 | Mobile App + Transport + LMS | 8–10 weeks | Parent app on Play Store |
| Phase 4 | AI + Analytics | 6–8 weeks | 3 AI models in production |
| Phase 5 | Multi-Branch + Compliance + Hardening | 4–6 weeks | 5 branches onboarded |
| Phase 6 | SaaS / Franchise Readiness | 6–8 weeks | First external client onboarded |
| **Total** | | **~42–52 weeks** | |

> Note: Phases 0–3 are the minimum viable product (MVP) for a single branch launch.
> Phase 4–5 enable the full vision. Phase 6 is the future business model.

---

## RECOMMENDED BUILD ORDER (FOR DEVOPS ENGINEER)

Given your background, this is the natural path:

```
Week 1–4   : Phase 0 — You own this entirely (EKS, RDS, CI/CD, monitoring)
Week 5–12  : Phase 1 — Backend microservices + APIs (you can drive this)
Week 13–20 : Phase 2 — Remaining services + React admin panel
Week 21–30 : Phase 3 — Flutter app + Transport + LMS (may need Flutter dev)
Week 31–38 : Phase 4 — Data lake + AI/ML (may need data engineer)
Week 39–44 : Phase 5 — Scale + harden
Week 45+   : Phase 6 — SaaS pivot
```

---

## OPEN QUESTIONS FOR YOUR REVIEW

Before we start implementation, please confirm or decide:

1. **Project name confirmed?** Using "Vidyalaya" — is this final?
2. **Backend language:** Node.js only, or .NET for some services? (BRD says Node.js / .NET)
3. **React UI library:** Material UI or Ant Design (or another)?
4. **Payment gateway:** Razorpay (recommended for India UPI) — confirmed?
5. **Live classes:** Zoom SDK integration or build custom WebRTC?
6. **Phase to start with:** Are we starting Phase 0 (infra) or Phase 1 (backend) first?
7. **Team size:** Are you building solo or with a team? This affects phasing.
8. **First branch location:** One pilot campus to deploy MVP on?
9. **Mobile app priority:** Flutter parent app — is Phase 3 the right time, or do you want it earlier?
10. **SaaS roadmap:** Is Phase 6 (franchise/SaaS) in scope for this project, or out of scope for now?

---

## WHAT IS NOT IN SCOPE (YET)

- Hostel management module
- Olympiad / coding training platform
- Career counseling module
- DigiLocker / UDISE+ government integrations
- International expansion

---

*Review this document, provide your answers to the open questions above, and we will start implementation.*
