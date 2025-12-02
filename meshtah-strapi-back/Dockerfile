FROM node:20-bullseye AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    wget \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

FROM node:20-bullseye
WORKDIR /app

COPY --from=builder /app /app

ENV NODE_ENV=production

EXPOSE 1337
CMD ["npm", "run", "start"]
