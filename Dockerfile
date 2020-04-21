FROM node:13
WORKDIR /app
COPY . /app
RUN npm install
CMD node app.js