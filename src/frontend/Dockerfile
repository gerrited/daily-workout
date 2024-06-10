FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG COMMIT_ID
ENV COMMIT_ID=${COMMIT_ID}

EXPOSE 3000

CMD ["node", "app.js"]
