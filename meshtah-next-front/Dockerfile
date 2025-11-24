FROM node:20-bullseye

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app files
COPY . .

# Build Next.js
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
