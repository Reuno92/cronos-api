FROM node:17-alpine as development

WORKDIR /usr/src/app
COPY package*.json .

RUN npm install glob rimraf

RUN npm install

RUN npm cache clean --force

COPY . .

RUN npm run build

FROM node:17-alpine as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist

COPY package*.json .

RUN npm install --no-optional
RUN npm cache clean --force

COPY . .

CMD ["node", "dist/main"]
