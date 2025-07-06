# Docker Setup for At Eaze Backend

This document provides comprehensive instructions for setting up and running the At Eaze backend using Docker.

## 🐳 Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- Git

## 📁 File Structure

```
backend/
├── Dockerfile                 # Multi-stage Docker build
├── .dockerignore             # Files to exclude from Docker build
├── docker-compose.yml        # Development and production services
├── docker-compose.prod.yml   # Production-specific configuration
├── nginx.conf               # Nginx reverse proxy configuration
├── mongo-init.js            # MongoDB initialization script
├── healthcheck.js           # Health check for containers
├── env.example              # Environment variables template
├── scripts/
│   └── docker-setup.sh      # Automated setup script
└── README-Docker.md         # This file
```

## 🚀 Quick Start

### 1. Clone and Navigate
```bash
cd backend
```

### 2. Setup Environment
```bash
# Copy environment template
cp env.example .env

# Edit .env file with your actual values
nano .env
```

### 3. Start Development Environment
```bash
# Using the setup script (recommended)
./scripts/docker-setup.sh dev

# Or using docker-compose directly
docker-compose --profile dev up -d --build
```

### 4. Access Services
- **Backend API**: http://localhost:4000
- **MongoDB**: localhost:27017
- **Mongo Express**: http://localhost:8081 (admin/password123)

## 🔧 Environment Variables

Create a `.env` file based on `env.example`:

```bash
# Server Configuration
NODE_ENV=development
PORT=4000

# MongoDB Configuration
MONGODB_URI=mongodb://admin:password123@mongodb:27017/at-eaze?authSource=admin
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password123

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Razorpay Configuration
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## 🛠️ Available Commands

### Using the Setup Script
```bash
# Development environment
./scripts/docker-setup.sh dev

# Production environment
./scripts/docker-setup.sh prod

# Production with Nginx
./scripts/docker-setup.sh nginx

# Stop all containers
./scripts/docker-setup.sh stop

# View logs
./scripts/docker-setup.sh logs

# Check status
./scripts/docker-setup.sh status

# Restart services
./scripts/docker-setup.sh restart

# Clean up
./scripts/docker-setup.sh cleanup
```

### Using Docker Compose Directly
```bash
# Development
docker-compose --profile dev up -d --build

# Production
docker-compose --profile prod up -d --build

# Production with Nginx
docker-compose --profile prod --profile with-nginx up -d --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up -d --build --force-recreate
```

## 🏗️ Docker Configuration Details

### Multi-Stage Dockerfile
- **Base stage**: Installs production dependencies
- **Development stage**: Includes dev dependencies and hot reload
- **Production stage**: Optimized for production with security

### Services
1. **MongoDB**: Database with authentication
2. **Backend**: Node.js API server
3. **Mongo Express**: Database management UI (dev only)
4. **Nginx**: Reverse proxy with SSL (production)

### Networks
- Custom bridge network for service communication
- Isolated from host network for security

### Volumes
- Persistent MongoDB data storage
- Source code mounting for development

## 🔒 Security Features

### Production Security
- Non-root user execution
- Resource limits
- Health checks
- SSL/TLS termination
- Rate limiting
- Security headers
- Network isolation

### Environment Security
- Environment variable validation
- Secure default configurations
- JWT secret requirements
- Database authentication

## 📊 Monitoring and Health Checks

### Health Check Endpoint
```bash
curl http://localhost:4000/health
```

### Container Health Checks
- Automatic health monitoring
- Restart on failure
- Resource usage monitoring

### Logging
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f mongodb
```

## 🚀 Production Deployment

### 1. Production Environment
```bash
# Start production environment
./scripts/docker-setup.sh prod

# Or with Nginx
./scripts/docker-setup.sh nginx
```

### 2. SSL Certificates
For production with HTTPS:
```bash
# Create SSL directory
mkdir -p ssl

# Add your certificates
cp your-cert.pem ssl/cert.pem
cp your-key.pem ssl/key.pem
```

### 3. Environment Variables
Update `.env` with production values:
```bash
NODE_ENV=production
JWT_SECRET=your-very-secure-jwt-secret
# ... other production values
```

### 4. Resource Limits
Production containers have resource limits:
- Backend: 512MB RAM, 0.5 CPU
- MongoDB: 1GB RAM

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
lsof -i :4000

# Stop conflicting services
sudo systemctl stop conflicting-service
```

#### 2. MongoDB Connection Issues
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

#### 3. Permission Issues
```bash
# Fix script permissions
chmod +x scripts/docker-setup.sh

# Fix file ownership
sudo chown -R $USER:$USER .
```

#### 4. Build Failures
```bash
# Clean build cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Debug Commands
```bash
# Enter container shell
docker-compose exec backend sh

# Check container resources
docker stats

# Inspect container
docker inspect at-eaze-backend-dev
```

## 📈 Performance Optimization

### Development
- Hot reload enabled
- Source code mounting
- Debug logging

### Production
- Multi-stage builds
- Optimized images
- Resource limits
- Gzip compression
- Caching headers

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy with Docker
        run: |
          docker-compose -f docker-compose.prod.yml up -d --build
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Nginx Docker Image](https://hub.docker.com/_/nginx)

## 🤝 Support

For issues and questions:
1. Check the troubleshooting section
2. Review container logs
3. Verify environment variables
4. Check Docker and Docker Compose versions

---

**Note**: Always update environment variables and secrets for production use. Never commit `.env` files with real credentials to version control. 