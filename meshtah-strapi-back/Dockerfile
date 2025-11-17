FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# build admin panel
RUN npm run build

# expose port
EXPOSE 1337

CMD ["npm", "run", "develop"]

