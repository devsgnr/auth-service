# Node Version - v16
FROM node:16

# Working directory - 
WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY ./ .

EXPOSE 8080

CMD ["yarn", "start"]