FROM node:20

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN echo hi

EXPOSE 4200

CMD [ "npx", "ng", "serve", "--host", "0.0.0.0", "--poll=2000" ]
