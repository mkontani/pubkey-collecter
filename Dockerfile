FROM node:12-alpine

WORKDIR /app
COPY . /app/

CMD ["npm", "start"]