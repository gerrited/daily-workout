FROM node:14

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY app.js .

CMD ["node", "app.js"]
