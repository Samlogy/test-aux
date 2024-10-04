FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn global add serve

EXPOSE 5173

CMD ["serve", "-s", "build", "-l", "5173"]