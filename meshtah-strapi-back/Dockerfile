FROM node:20-bullseye
WORKDIR /app

COPY --from=builder /app /app

# ← ADD THIS LINE ←
RUN npm rebuild better-sqlite3 --build-from-source

ENV NODE_ENV=production

EXPOSE 1337
CMD ["npm", "run", "start"]