FROM node:12-alpine

WORKDIR /app
COPY . /app/

RUN npm install

ENTRYPOINT ["bin/do"]
CMD ["--help"]