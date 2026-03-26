#!/bin/bash
# ============================================================
#  Vignan School App - Full AWS Deployment (Setup + Deploy)
#  Run this on a fresh AWS EC2 instance (Amazon Linux 2 / Ubuntu)
#  Instance: t3.medium or larger (2 vCPU, 4GB RAM minimum)
# ============================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "========================================================"
echo "  Vignan School - Full AWS Cloud Deployment"
echo "  3-Tier: React + Node.js + PostgreSQL on Kind K8s"
echo "========================================================"
echo ""

# ---- Phase 1: Install Prerequisites ----
echo ">>> PHASE 1: Installing prerequisites..."
echo ""
bash "$SCRIPT_DIR/aws-setup.sh"

# Check if docker is accessible (user might need to re-login)
if ! docker info &>/dev/null; then
    echo ""
    echo "ERROR: Docker is not accessible for current user."
    echo "This usually happens on first install. Please run:"
    echo ""
    echo "  sudo su - $USER"
    echo "  cd $SCRIPT_DIR && ./deploy.sh"
    echo ""
    echo "Or log out and log back in, then run ./deploy.sh"
    exit 1
fi

echo ""
echo ">>> PHASE 2: Deploying to Kind Kubernetes..."
echo ""

# ---- Phase 2: Run Kind deployment ----
bash "$SCRIPT_DIR/deploy.sh"

# ---- Phase 3: Show access instructions ----
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo "YOUR_EC2_PUBLIC_IP")

echo ""
echo "========================================================"
echo "  AWS DEPLOYMENT COMPLETE!"
echo "========================================================"
echo ""
echo "  The app is running on Kind inside this EC2 instance."
echo "  Kind binds to localhost:80 on the EC2 host."
echo ""
echo "  ACCESS OPTIONS:"
echo ""
echo "  1. SSH Tunnel (Recommended for testing):"
echo "     From your local machine, run:"
echo "     ssh -L 8080:localhost:80 -i your-key.pem ec2-user@${PUBLIC_IP}"
echo "     Then open: http://localhost:8080"
echo ""
echo "  2. Port Forward with kubectl:"
echo "     kubectl port-forward -n vignan-school svc/frontend-service 8080:80 --address 0.0.0.0 &"
echo "     Then open: http://${PUBLIC_IP}:8080"
echo "     (Requires port 8080 open in Security Group)"
echo ""
echo "  3. NodePort (if Security Group allows):"
echo "     kubectl patch svc frontend-service -n vignan-school -p '{\"spec\":{\"type\":\"NodePort\"}}'"
echo "     NODE_PORT=\$(kubectl get svc frontend-service -n vignan-school -o jsonpath='{.spec.ports[0].nodePort}')"
echo "     echo \"Access: http://${PUBLIC_IP}:\$NODE_PORT\""
echo ""
echo "  USEFUL COMMANDS:"
echo "     kubectl get pods -n vignan-school"
echo "     kubectl get svc -n vignan-school"
echo "     kubectl logs -n vignan-school deployment/backend"
echo "     kubectl logs -n vignan-school deployment/frontend"
echo "     curl localhost/api/health"
echo "========================================================"
