FROM node:22-alpine

ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# build Next.js
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "develop"]

