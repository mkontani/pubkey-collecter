FROM node:12-alpine

WORKDIR /app
COPY . /app/

RUN npm install --production

ENTRYPOINT ["bin/do"]
CMD ["--help"]