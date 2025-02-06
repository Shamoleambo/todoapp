FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm i
RUN npm i -g serve
COPY . .
EXPOSE 3000
CMD ["serve", "-s", "./dist"]