# FROM node:alpine

# WORKDIR /usr/app

# COPY package*.json .

# RUN npm ci

# COPY . .

# CMD [ "npm", "run", "dev" ]

FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]
