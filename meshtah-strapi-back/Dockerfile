FROM node:20-bookworm

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install --production

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

RUN npm rebuild better-sqlite3 --build-from-source

RUN npm prune --production

ENV NODE_ENV=production

EXPOSE 1337

CMD ["npm", "run", "start"]
