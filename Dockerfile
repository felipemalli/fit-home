FROM node:19
WORKDIR /usr/src/fit-home-api
COPY ./package.json .
RUN npm install --only=prod