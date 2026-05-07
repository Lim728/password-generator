# Docker Setup Guide | Docker 使用指南

## English

### Prerequisites

- Docker installed on your system
- Docker Compose (optional, for easier management)

### Quick Start with Docker Compose

The easiest way to run Password Generator with Docker:

```bash
# Clone the repository
git clone https://github.com/Lim728/password-generator.git
cd password-generator

# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

The application will be available at `http://localhost:3000`

### Building and Running with Docker

If you prefer to use Docker directly without Docker Compose:

```bash
# Build the Docker image
docker build -t password-generator .

# Run the container
docker run -d \
  --name password-generator \
  -p 3000:3000 \
  -v password-generator-data:/app/data \
  password-generator

# View logs
docker logs -f password-generator

# Stop the container
docker stop password-generator

# Remove the container
docker rm password-generator
```

### Persistent Data

The application uses a volume to store data persistently:

```bash
# Using Docker Compose (automatic)
# Data is stored in: password-generator-data volume

# Using Docker directly
docker run -d \
  -v password-generator-data:/app/data \
  password-generator
```

### Environment Variables

You can customize the application with environment variables:

```bash
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  password-generator
```

### Health Check

The Docker image includes a health check that runs every 30 seconds:

```bash
# Check container status
docker ps

# Should show: healthy, unhealthy, or starting
```

### Troubleshooting

**Port already in use:**
```bash
# Use a different port
docker run -d -p 8080:3000 password-generator
# Access at http://localhost:8080
```

**View container logs:**
```bash
docker logs password-generator
```

**Access container shell:**
```bash
docker exec -it password-generator sh
```

**Remove all data and start fresh:**
```bash
docker-compose down -v
docker-compose up -d
```

---

## 中文

### 前置要求

- 系统上已安装Docker
- Docker Compose（可选，便于管理）

### 使用Docker Compose快速开始

使用Docker运行密码生成器的最简单方式：

```bash
# 克隆仓库
git clone https://github.com/Lim728/password-generator.git
cd password-generator

# 启动应用
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止应用
docker-compose down
```

应用将在 `http://localhost:3000` 可用

### 使用Docker构建和运行

如果您更喜欢直接使用Docker而不使用Docker Compose：

```bash
# 构建Docker镜像
docker build -t password-generator .

# 运行容器
docker run -d \
  --name password-generator \
  -p 3000:3000 \
  -v password-generator-data:/app/data \
  password-generator

# 查看日志
docker logs -f password-generator

# 停止容器
docker stop password-generator

# 删除容器
docker rm password-generator
```

### 数据持久化

应用使用卷来持久化存储数据：

```bash
# 使用Docker Compose（自动）
# 数据存储在：password-generator-data 卷中

# 直接使用Docker
docker run -d \
  -v password-generator-data:/app/data \
  password-generator
```

### 环境变量

您可以使用环境变量自定义应用：

```bash
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  password-generator
```

### 健康检查

Docker镜像包含每30秒运行一次的健康检查：

```bash
# 检查容器状态
docker ps

# 应显示：healthy、unhealthy 或 starting
```

### 故障排除

**端口已被占用：**
```bash
# 使用不同的端口
docker run -d -p 8080:3000 password-generator
# 访问 http://localhost:8080
```

**查看容器日志：**
```bash
docker logs password-generator
```

**访问容器shell：**
```bash
docker exec -it password-generator sh
```

**删除所有数据并重新开始：**
```bash
docker-compose down -v
docker-compose up -d
```

### Docker镜像信息

- **基础镜像**: node:22-alpine
- **工作目录**: /app
- **暴露端口**: 3000
- **数据卷**: /app/data
- **构建方式**: 多阶段构建（优化镜像大小）

### 性能优化

Docker镜像使用以下优化：

- ✅ 多阶段构建 - 减小最终镜像大小
- ✅ Alpine Linux - 轻量级基础镜像
- ✅ 生产依赖 - 仅安装必要的包
- ✅ 健康检查 - 自动监控容器状态
- ✅ 数据卷 - 持久化存储

### 在云平台部署

#### Heroku
```bash
heroku create your-app-name
heroku container:push web
heroku container:release web
```

#### AWS ECS
```bash
# 推送镜像到ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag password-generator:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/password-generator:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/password-generator:latest
```

#### Docker Hub
```bash
# 登录Docker Hub
docker login

# 标记镜像
docker tag password-generator:latest your-username/password-generator:latest

# 推送镜像
docker push your-username/password-generator:latest
```
