#!/bin/bash

# At Eaze Backend Docker Setup Script
# This script sets up the Docker environment for the backend

set -e

echo "🚀 Setting up At Eaze Backend Docker Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_success "Docker and Docker Compose are installed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_status "Creating .env file from template..."
    cp env.example .env
    print_warning "Please update the .env file with your actual configuration values"
else
    print_status ".env file already exists"
fi

# Create SSL directory for production
if [ ! -d ssl ]; then
    print_status "Creating SSL directory..."
    mkdir -p ssl
    print_warning "Please add your SSL certificates to the ssl/ directory for production"
fi

# Function to build and start development environment
start_dev() {
    print_status "Starting development environment..."
    docker-compose --profile dev up -d --build
    print_success "Development environment started!"
    print_status "Backend API: http://localhost:4000"
    print_status "MongoDB: localhost:27017"
    print_status "Mongo Express: http://localhost:8081 (admin/password123)"
}

# Function to build and start production environment
start_prod() {
    print_status "Starting production environment..."
    docker-compose --profile prod up -d --build
    print_success "Production environment started!"
    print_status "Backend API: http://localhost:4000"
    print_status "MongoDB: localhost:27017"
}

# Function to start with Nginx
start_with_nginx() {
    print_status "Starting production environment with Nginx..."
    docker-compose --profile prod --profile with-nginx up -d --build
    print_success "Production environment with Nginx started!"
    print_status "Backend API: https://localhost (via Nginx)"
    print_warning "Make sure to add SSL certificates to ssl/ directory"
}

# Function to stop all containers
stop_all() {
    print_status "Stopping all containers..."
    docker-compose down
    print_success "All containers stopped"
}

# Function to view logs
view_logs() {
    print_status "Showing logs..."
    docker-compose logs -f
}

# Function to clean up
cleanup() {
    print_status "Cleaning up Docker resources..."
    docker-compose down -v --remove-orphans
    docker system prune -f
    print_success "Cleanup completed"
}

# Function to show status
show_status() {
    print_status "Container status:"
    docker-compose ps
}

# Function to restart services
restart() {
    print_status "Restarting services..."
    docker-compose restart
    print_success "Services restarted"
}

# Function to show help
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev           Start development environment"
    echo "  prod          Start production environment"
    echo "  nginx         Start production environment with Nginx"
    echo "  stop          Stop all containers"
    echo "  logs          View logs"
    echo "  status        Show container status"
    echo "  restart       Restart services"
    echo "  cleanup       Clean up Docker resources"
    echo "  help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev        # Start development environment"
    echo "  $0 prod       # Start production environment"
    echo "  $0 logs       # View logs"
}

# Main script logic
case "${1:-help}" in
    dev)
        start_dev
        ;;
    prod)
        start_prod
        ;;
    nginx)
        start_with_nginx
        ;;
    stop)
        stop_all
        ;;
    logs)
        view_logs
        ;;
    status)
        show_status
        ;;
    restart)
        restart
        ;;
    cleanup)
        cleanup
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac 