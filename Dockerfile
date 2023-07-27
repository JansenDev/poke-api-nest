FROM node:lts-alpine
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot
WORKDIR /srv/app

ARG APP_PORT=8080

COPY ./src /srv/app/src
COPY *.json .

RUN npm install -g @nestjs/cli
RUN npm install --production
RUN npm run build
RUN echo $APP_PORT

EXPOSE $APP_PORT
USER nonroot

CMD [ "node", "/srv/app/dist/main.js" ]
