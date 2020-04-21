FROM node:13
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 4500
CMD node app.js