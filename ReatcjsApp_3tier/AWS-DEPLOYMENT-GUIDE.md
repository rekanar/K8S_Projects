# Vignan School App - AWS Cloud Deployment Guide

Deploy the 3-tier Vignan School application on an **AWS EC2 Linux** instance using **Kind Kubernetes**.

```
Architecture:
┌─────────────────────────────────────────────────────────────┐
│  AWS EC2 Instance (t3.medium / t3.large)                    │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Kind Kubernetes Cluster (3 nodes)                    │  │
│  │                                                       │  │
│  │  ┌─────────┐   ┌─────────────┐   ┌──────────────┐   │  │
│  │  │ Frontend │──▶│  Backend    │──▶│  PostgreSQL   │   │  │
│  │  │ React+   │   │  Express+   │   │  Database     │   │  │
│  │  │ Nginx    │   │  Node.js    │   │              │   │  │
│  │  │ (2 pods) │   │  (2 pods)   │   │  (1 pod+PVC) │   │  │
│  │  └─────────┘   └─────────────┘   └──────────────┘   │  │
│  │       │                                               │  │
│  │  ┌─────────┐                                          │  │
│  │  │ Ingress │  NGINX Ingress Controller                │  │
│  │  │ :80/:443│                                          │  │
│  │  └─────────┘                                          │  │
│  └───────────────────────────────────────────────────────┘  │
│       │                                                     │
│  Host Port 80 ◀── Kind extraPortMappings                    │
└─────────────────────────────────────────────────────────────┘
         │
    Internet / SSH Tunnel
```

---

## Prerequisites

- An AWS account
- SSH key pair for EC2 access

---

## Step 1: Launch an EC2 Instance

### Via AWS Console:

1. Go to **EC2 > Launch Instance**
2. Configure:

| Setting | Value |
|---------|-------|
| **Name** | `vignan-school-k8s` |
| **AMI** | Amazon Linux 2023 or Ubuntu 22.04 LTS |
| **Instance Type** | `t3.medium` (minimum: 2 vCPU, 4GB RAM) |
| **Key Pair** | Select/create your SSH key |
| **Storage** | 30 GB gp3 (minimum) |
| **Security Group** | See below |

### Security Group Rules:

| Type | Port | Source | Purpose |
|------|------|--------|---------|
| SSH | 22 | Your IP | SSH access |
| HTTP | 80 | 0.0.0.0/0 | App access (optional) |
| Custom TCP | 8080 | 0.0.0.0/0 | kubectl port-forward (optional) |

> For testing, you can use SSH tunnel instead and only need port 22.

### Via AWS CLI:

```bash
# Create security group
aws ec2 create-security-group \
  --group-name vignan-school-sg \
  --description "Vignan School K8s App"

# Allow SSH
aws ec2 authorize-security-group-ingress \
  --group-name vignan-school-sg \
  --protocol tcp --port 22 --cidr YOUR_IP/32

# Allow HTTP (optional - for direct access)
aws ec2 authorize-security-group-ingress \
  --group-name vignan-school-sg \
  --protocol tcp --port 80 --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
  --group-name vignan-school-sg \
  --protocol tcp --port 8080 --cidr 0.0.0.0/0

# Launch instance
aws ec2 run-instances \
  --image-id ami-0c02fb55956c7d316 \
  --instance-type t3.medium \
  --key-name your-key-name \
  --security-groups vignan-school-sg \
  --block-device-mappings '[{"DeviceName":"/dev/xvda","Ebs":{"VolumeSize":30,"VolumeType":"gp3"}}]' \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=vignan-school-k8s}]'
```

---

## Step 2: Connect to EC2

```bash
# Get the public IP from AWS Console or CLI
ssh -i your-key.pem ec2-user@<EC2_PUBLIC_IP>
# For Ubuntu: ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
```

---

## Step 3: Clone the Repository

```bash
# Clone the project
git clone https://github.com/<your-repo>/kubestarter.git
cd kubestarter/Projects/ReatcjsApp_3tier

# Or copy files via SCP
# scp -i your-key.pem -r ./ReatcjsApp_3tier ec2-user@<EC2_IP>:~/vignan-school-app
```

---

## Step 4: One-Command Deployment

### Option A: Full automated setup + deploy

```bash
chmod +x aws-deploy.sh aws-setup.sh deploy.sh teardown.sh
./aws-deploy.sh
```

### Option B: Step-by-step

```bash
# 1. Install prerequisites (Docker, kubectl, Kind)
chmod +x aws-setup.sh
./aws-setup.sh

# 2. IMPORTANT: Re-login for docker group permissions
exit
ssh -i your-key.pem ec2-user@<EC2_PUBLIC_IP>

# 3. Verify installations
docker --version
kubectl version --client
kind version

# 4. Deploy the app
cd kubestarter/Projects/ReatcjsApp_3tier
./deploy.sh
```

---

## Step 5: Access the Application

### Option 1: SSH Tunnel (Recommended - No Security Group changes needed)

From your **local machine** (not EC2):

```bash
ssh -i your-key.pem -L 8080:localhost:80 ec2-user@<EC2_PUBLIC_IP>
```

Then open in browser: **http://localhost:8080**

### Option 2: kubectl Port Forward (Requires port 8080 in Security Group)

On the EC2 instance:

```bash
kubectl port-forward -n vignan-school svc/frontend-service 8080:80 --address 0.0.0.0 &
```

Then open: **http://\<EC2_PUBLIC_IP\>:8080**

### Option 3: Direct via Ingress (Requires port 80 in Security Group)

Kind already maps port 80 to the host. If your Security Group allows port 80:

```bash
curl http://localhost        # Test on EC2
```

Then open: **http://\<EC2_PUBLIC_IP\>**

---

## Step 6: Verify Deployment

Run these on the EC2 instance:

```bash
# Check all pods are running
kubectl get pods -n vignan-school
# Expected output:
# NAME                        READY   STATUS    RESTARTS   AGE
# backend-xxxxx-xxxxx         1/1     Running   0          2m
# backend-xxxxx-xxxxx         1/1     Running   0          2m
# frontend-xxxxx-xxxxx        1/1     Running   0          2m
# frontend-xxxxx-xxxxx        1/1     Running   0          2m
# postgres-xxxxx-xxxxx        1/1     Running   0          3m

# Check services
kubectl get svc -n vignan-school
# Expected:
# NAME                TYPE        CLUSTER-IP     PORT(S)
# backend-service     ClusterIP   10.96.x.x      5000/TCP
# frontend-service    ClusterIP   10.96.x.x      80/TCP
# postgres-service    ClusterIP   10.96.x.x      5432/TCP

# Check ingress
kubectl get ingress -n vignan-school

# Test API health
curl http://localhost/api/health
# Expected: {"status":"healthy","database":"connected"}

# Test school data
curl http://localhost/api/school
curl http://localhost/api/students
curl http://localhost/api/teachers

# Check pod logs if needed
kubectl logs -n vignan-school deployment/backend
kubectl logs -n vignan-school deployment/postgres
```

---

## Troubleshooting

### Pod stuck in Pending/CrashLoopBackOff

```bash
kubectl describe pod <pod-name> -n vignan-school
kubectl logs <pod-name> -n vignan-school
```

### Backend can't connect to database

```bash
# Check PostgreSQL is running
kubectl get pods -n vignan-school -l app=postgres

# Check DB logs
kubectl logs -n vignan-school deployment/postgres

# Verify init script was loaded
kubectl exec -n vignan-school deployment/postgres -- psql -U vignan_admin -d vignan_school -c "\dt"
```

### Ingress not working

```bash
# Check ingress controller
kubectl get pods -n ingress-nginx

# Check ingress resource
kubectl describe ingress vignan-ingress -n vignan-school

# Test directly via port-forward
kubectl port-forward -n vignan-school svc/frontend-service 8080:80 --address 0.0.0.0
kubectl port-forward -n vignan-school svc/backend-service 5000:5000 --address 0.0.0.0
```

### Docker permission denied

```bash
sudo usermod -aG docker $USER
# Then log out and back in
exit
ssh -i your-key.pem ec2-user@<EC2_IP>
```

### Not enough resources

- Minimum: **t3.medium** (2 vCPU, 4GB RAM)
- Recommended: **t3.large** (2 vCPU, 8GB RAM)
- Storage: 30GB minimum

---

## Cleanup

### Delete the Kind cluster (keeps EC2 running)

```bash
./teardown.sh
```

### Terminate the EC2 instance

```bash
# Via AWS CLI
aws ec2 terminate-instances --instance-ids <INSTANCE_ID>
```

### Delete all AWS resources

```bash
aws ec2 terminate-instances --instance-ids <INSTANCE_ID>
aws ec2 delete-security-group --group-name vignan-school-sg
aws ec2 delete-key-pair --key-name your-key-name
```

---

## Cost Estimate

| Resource | Cost (approx) |
|----------|---------------|
| t3.medium (on-demand) | ~$0.0416/hr (~$30/month) |
| 30GB gp3 EBS | ~$2.40/month |
| **Total** | **~$33/month** |

> Use Spot instances for up to 90% savings for development/testing.
