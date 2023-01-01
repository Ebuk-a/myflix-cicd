#Get the base image
FROM node:alpine

#create and make /usr/src/app directory the home/ default directory into the docker container
WORKDIR /usr/src/app

#copy files starting with packages and of json format to the default(/usr/src/app) directory
COPY package*.json ./

# clean install npm (node) which will create the node_modules folder (having base image dependencies) on the default directory
RUN npm ci

#copy other files to the default directory
COPY . .

EXPOSE 5000

# CMD [ "npm", "run", "dev" ]

CMD [ "npm", "start" ]
