# Node Version - v16
FROM node:18.9.1-slim

# Working directory - 
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY ./ .

EXPOSE 8080

CMD ["yarn", "start"]