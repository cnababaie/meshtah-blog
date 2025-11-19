FROM node:22

ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# build admin panel
RUN npm run build

# expose port
EXPOSE 1337

CMD ["npm", "run", "develop"]

