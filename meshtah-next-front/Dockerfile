FROM node:20-bullseye

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y python3 make g++ \
 && npm install \
 && npm run build \
 && apt-get remove -y python3 make g++ && apt-get autoremove -y

ENV NODE_ENV=production

CMD ["npm", "run", "start"]

EXPOSE 3000
