FROM node:8.10.0

WORKDIR /usr/src/app
COPY package.json /usr/src/app

RUN npm install react-hot-loader
RUN npm install --loglevel verbose
RUN npm install @reduxjs/toolkit react-redux
RUN npm install react-router-dom@6

CMD ["npm", "start"]