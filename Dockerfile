FROM node:14.15.4-alpine3.12

ENV HOME=/usr/src/app \
  TZ=America/Sao_Paulo \
  HTTP_PORT=80 \
  NODE_ENV=production

WORKDIR $HOME

RUN apk update && apk upgrade \
  && apk add --no-cache tzdata

COPY ./package.json $HOME

RUN npm install --production

COPY . $HOME

EXPOSE 80

CMD [ "npm", "start" ]
