FROM node:12-alpine as builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
ENV NODE_ENV=production API_URL=http://localhost:3000 API_KEY=Y2tfMzQ4ZGQxNzVhYjcxMmJlZGI1YTc1ZTNlNmE4NTNlZDdlMzFmNzBkZjpjc185ZTZmZWRjNzc1MmVjNjJlYTVkMGVhNDVhMDEyZTFmMGQyNGIzYmU5 WEB_API_URL=https://api.shorten.godmerch.com

COPY . .
RUN yarn build

#######################
FROM node:12-alpine

ENV NODE_ENV=production API_URL=http://localhost:3000 API_KEY=Y2tfMzQ4ZGQxNzVhYjcxMmJlZGI1YTc1ZTNlNmE4NTNlZDdlMzFmNzBkZjpjc185ZTZmZWRjNzc1MmVjNjJlYTVkMGVhNDVhMDEyZTFmMGQyNGIzYmU5 WEB_API_URL=https://api.shorten.godmerch.com
ENV HOST=0.0.0.0 PORT=3000

COPY --from=builder /app /app
RUN apk add --no-cache tini
RUN chown -R node:node /app

USER node
WORKDIR /app
EXPOSE 3000
ENTRYPOINT ["tini","--","npx"]
CMD ["nuxt", "start"]


