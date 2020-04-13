FROM node:12-alpine

WORKDIR /app
COPY . /app/

ENTRYPOINT ["bin/do"]
CMD ["--help"]