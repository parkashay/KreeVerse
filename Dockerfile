FROM node:18.19.0

WORKDIR /src/app

COPY ./package.json ./
COPY ./package-lock.json ./

COPY ./ .
RUN npm install -g npm@9.6.1
RUN npm install --legacy-peer-deps
ARG CI_COMMIT_SHA
ENV CI_COMMIT_SHA=$CI_COMMIT_SHA

EXPOSE 3001

CMD ["npm", "run" ,"dev"] # will launch the remix app when we run this Docker image.
