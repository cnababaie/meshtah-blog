FROM node:20-bullseye

WORKDIR /app

# Install build dependencies for better-sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app files
COPY . .

# Build Strapi
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
