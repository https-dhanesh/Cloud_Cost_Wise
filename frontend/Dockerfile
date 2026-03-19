FROM node:20-alpine AS build-stage
WORKDIR /app
RUN apk update && apk upgrade

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
RUN apk update && apk upgrade

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]