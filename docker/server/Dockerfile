FROM node:20-alpine

WORKDIR /server

RUN npm install

RUN npm run start

EXPOSE 3018

CMD ["json-server", "--watch", "db.json"]