FROM node:argon

MAINTAINER Bjorgvin Reynisson

ENV PORT=5000

COPY . /var/www
WORKDIR /var/www

RUN npm install

EXPOSE $PORT 5432

ENTRYPOINT ["npm", "start"]