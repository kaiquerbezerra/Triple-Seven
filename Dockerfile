FROM node:14

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${PORT}

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD ["npm", "start"]