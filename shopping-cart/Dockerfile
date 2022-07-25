##########################################
## Cart Microservice                    ##
##########################################
FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

WORKDIR ./home/node/app

COPY . .
COPY package*.json .
# copy ../proto ../proto

EXPOSE 3001
CMD ["npm", "run", "start:cart:server"]