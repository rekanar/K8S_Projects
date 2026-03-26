#!/bin/bash
set -e

echo "============================================"
echo "  Vignan School - 3-Tier App Deployment"
echo "  Deploying to Kind Kubernetes Cluster"
echo "============================================"
echo ""

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Step 1: Create Kind cluster
echo "[1/7] Creating Kind cluster..."
if kind get clusters 2>/dev/null | grep -q "vignan-school"; then
    echo "  Cluster 'vignan-school' already exists. Deleting..."
    kind delete cluster --name vignan-school
fi
kind create cluster --config "$PROJECT_DIR/kind-config.yaml"
echo "  Cluster created successfully!"
echo ""

# Step 2: Install NGINX Ingress Controller
echo "[2/7] Installing NGINX Ingress Controller..."
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

echo "  Waiting for ingress controller pod to be created..."
for i in $(seq 1 30); do
  if kubectl get pods -n ingress-nginx -l app.kubernetes.io/component=controller 2>/dev/null | grep -q "ingress-nginx"; then
    echo "  Pod found! Waiting for it to become ready..."
    break
  fi
  echo "  Attempt $i/30 - Pod not yet created, waiting 5s..."
  sleep 5
done

kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=180s
echo "  Ingress controller ready!"
echo ""

# Step 3: Build Docker images
echo "[3/7] Building Docker images..."
echo "  Building backend image..."
docker build -t vignan-backend:latest "$PROJECT_DIR/backend"
echo "  Building frontend image..."
docker build -t vignan-frontend:latest "$PROJECT_DIR/frontend"
echo "  Images built successfully!"
echo ""

# Step 4: Load images into Kind
echo "[4/7] Loading images into Kind cluster..."
kind load docker-image vignan-backend:latest --name vignan-school
kind load docker-image vignan-frontend:latest --name vignan-school
echo "  Images loaded!"
echo ""

# Step 5: Create namespace and secrets
echo "[5/7] Creating Kubernetes resources..."
kubectl apply -f "$PROJECT_DIR/k8s/namespace.yaml"
kubectl apply -f "$PROJECT_DIR/k8s/secret.yaml"
kubectl apply -f "$PROJECT_DIR/k8s/configmap.yaml"
echo "  Namespace, secrets, and configmaps created!"
echo ""

# Step 6: Create PostgreSQL init configmap from SQL file and deploy database
echo "[6/7] Deploying PostgreSQL database..."
kubectl create configmap postgres-init-script \
  --from-file=init.sql="$PROJECT_DIR/database/init.sql" \
  --namespace=vignan-school \
  --dry-run=client -o yaml | kubectl apply -f -
kubectl apply -f "$PROJECT_DIR/k8s/postgres.yaml"
echo "  Waiting for PostgreSQL pod to be created..."
for i in $(seq 1 20); do
  if kubectl get pods -n vignan-school -l app=postgres 2>/dev/null | grep -q "postgres"; then
    break
  fi
  sleep 3
done
kubectl wait --namespace vignan-school \
  --for=condition=ready pod \
  --selector=app=postgres \
  --timeout=180s
echo "  PostgreSQL is ready!"
echo ""

# Step 7: Deploy backend and frontend
echo "[7/7] Deploying backend and frontend..."
kubectl apply -f "$PROJECT_DIR/k8s/backend.yaml"
kubectl apply -f "$PROJECT_DIR/k8s/frontend.yaml"
kubectl apply -f "$PROJECT_DIR/k8s/ingress.yaml"

echo "  Waiting for pods to be scheduled..."
for i in $(seq 1 20); do
  if kubectl get pods -n vignan-school -l app=backend 2>/dev/null | grep -q "backend"; then
    break
  fi
  sleep 3
done

echo "  Waiting for backend to be ready..."
kubectl wait --namespace vignan-school \
  --for=condition=ready pod \
  --selector=app=backend \
  --timeout=180s

echo "  Waiting for frontend to be ready..."
kubectl wait --namespace vignan-school \
  --for=condition=ready pod \
  --selector=app=frontend \
  --timeout=180s

echo ""
echo "============================================"
echo "  Deployment Complete!"
echo "============================================"
echo ""
echo "  Application: http://localhost"
echo "  API Health:  http://localhost/api/health"
echo ""
echo "  Namespace: vignan-school"
echo ""
echo "  Pods:"
kubectl get pods -n vignan-school
echo ""
echo "  Services:"
kubectl get svc -n vignan-school
echo ""
echo "============================================"
echo "  Architecture:"
echo "  [Frontend:80] -> [Backend:5000] -> [PostgreSQL:5432]"
echo "       Nginx         Express/Node       PostgreSQL 15"
echo "       React 18      REST API           Vignan School DB"
echo "============================================"
