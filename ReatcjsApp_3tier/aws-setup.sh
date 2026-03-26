#!/bin/bash
# ============================================================
#  Vignan School App - AWS EC2 (Amazon Linux 2 / Ubuntu) Setup
#  This script installs all prerequisites on a fresh EC2 instance
# ============================================================
set -e

echo "============================================"
echo "  AWS EC2 - Prerequisites Installation"
echo "============================================"
echo ""

# Detect OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
else
    echo "Cannot detect OS. Exiting."
    exit 1
fi

echo "Detected OS: $OS"
echo ""

# ---- Step 1: Install Docker ----
echo "[1/4] Installing Docker..."
if command -v docker &>/dev/null; then
    echo "  Docker already installed: $(docker --version)"
else
    if [ "$OS" = "amzn" ] || [ "$OS" = "rhel" ] || [ "$OS" = "centos" ]; then
        sudo yum update -y
        sudo yum install -y docker
        sudo systemctl start docker
        sudo systemctl enable docker
    elif [ "$OS" = "ubuntu" ] || [ "$OS" = "debian" ]; then
        sudo apt-get update -y
        sudo apt-get install -y ca-certificates curl gnupg
        sudo install -m 0755 -d /etc/apt/keyrings
        curl -fsSL https://download.docker.com/linux/$OS/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
        sudo chmod a+r /etc/apt/keyrings/docker.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/$OS $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
        sudo apt-get update -y
        sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin
        sudo systemctl start docker
        sudo systemctl enable docker
    fi
    # Add current user to docker group
    sudo usermod -aG docker $USER
    echo "  Docker installed: $(docker --version)"
fi
echo ""

# ---- Step 2: Install kubectl ----
echo "[2/4] Installing kubectl..."
if command -v kubectl &>/dev/null; then
    echo "  kubectl already installed: $(kubectl version --client --short 2>/dev/null || kubectl version --client)"
else
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
    rm -f kubectl
    echo "  kubectl installed: $(kubectl version --client --short 2>/dev/null || echo 'installed')"
fi
echo ""

# ---- Step 3: Install Kind ----
echo "[3/4] Installing Kind..."
if command -v kind &>/dev/null; then
    echo "  Kind already installed: $(kind version)"
else
    KIND_VERSION=$(curl -s https://api.github.com/repos/kubernetes-sigs/kind/releases/latest | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/')
    curl -Lo ./kind "https://kind.sigs.k8s.io/dl/${KIND_VERSION}/kind-linux-amd64"
    sudo install -o root -g root -m 0755 kind /usr/local/bin/kind
    rm -f kind
    echo "  Kind installed: $(kind version)"
fi
echo ""

# ---- Step 4: Install Git (if not present) ----
echo "[4/4] Installing Git..."
if command -v git &>/dev/null; then
    echo "  Git already installed: $(git --version)"
else
    if [ "$OS" = "amzn" ] || [ "$OS" = "rhel" ] || [ "$OS" = "centos" ]; then
        sudo yum install -y git
    elif [ "$OS" = "ubuntu" ] || [ "$OS" = "debian" ]; then
        sudo apt-get install -y git
    fi
    echo "  Git installed: $(git --version)"
fi
echo ""

echo "============================================"
echo "  Prerequisites Installation Complete!"
echo "============================================"
echo ""
echo "  IMPORTANT: If this is a fresh install, log out"
echo "  and log back in for docker group to take effect:"
echo ""
echo "    exit"
echo "    ssh <your-ec2-instance>"
echo ""
echo "  Then run the deployment:"
echo "    cd vignan-school-app"
echo "    ./deploy.sh"
echo "============================================"
