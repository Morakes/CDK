# 构建阶段
FROM node:20-slim

# 设置工作目录
WORKDIR /app

# 安装系统依赖
RUN apt-get update -y && apt-get install -y openssl

# 配置npm和pnpm国内镜像源，安装PM2
RUN npm config set registry https://registry.npmmirror.com \
    && npm install -g pnpm pm2 \
    && pnpm config set registry https://registry.npmmirror.com

# 设置Prisma的二进制文件下载源
ENV PRISMA_ENGINES_MIRROR="https://registry.npmmirror.com/-/binary/prisma"

# 复制package.json和lock文件
COPY package.json pnpm-lock.yaml ./

# 复制prisma相关文件
COPY prisma ./prisma/

# 安装依赖并生成Prisma客户端
RUN pnpm install \
    && pnpm prisma generate

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# 暴露端口
EXPOSE 8081

# 使用PM2在生产模式下启动应用
CMD ["pm2-runtime", "start", "dist/src/main.js", "--name", "cdk-backend"]