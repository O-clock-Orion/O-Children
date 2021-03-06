FROM node:11-alpine

RUN mkdir -p /src
WORKDIR /src

ARG ENV
ENV ENV=$ENV

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g


COPY package*.json .
RUN yarn --slient

COPY . .

RUN chmod +x .docker/start-client.sh ./run.sh

CMD .docker/start-client.sh ${ENV}
