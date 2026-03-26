#!/bin/bash
echo "Tearing down Vignan School cluster..."
kind delete cluster --name vignan-school
echo "Cluster deleted successfully!"
