FROM node:20-bullseye

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    wget \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
