FROM node:latest
ENV PORT=8080
WORKDIR /app
COPY package.json . 
RUN npm install && npm install typescript -g
COPY . .
RUN tsc
EXPOSE 8080
CMD ["node", "./dist/main/server.js"]
