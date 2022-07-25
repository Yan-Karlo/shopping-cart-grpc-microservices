##########################################
## Products Microservice                ##
##########################################
FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

WORKDIR ./home/node/app

COPY . .
COPY package*.json .

# RUN npm install
# RUN npm install -g nodemon

EXPOSE 3002
CMD ["npm", "run", "start:product:server"]