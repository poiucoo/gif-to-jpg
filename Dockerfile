FROM node:18-slim

# 避免 tzdata 問互動
ENV DEBIAN_FRONTEND=noninteractive

# 安裝 sharp 所需的系統套件
RUN apt-get update && apt-get install -y \
    libc6 \
    libvips42 \
    libvips-dev \
    build-essential \
    python3 \
    pkg-config \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
