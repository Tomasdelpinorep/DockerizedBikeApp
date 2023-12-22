FROM node:14 as build
WORKDIR /app
COPY package*.json .

RUN npm install
COPY ./ /app
RUN npm build

FROM nginx:alpine
COPY --from=build /app/dist/appbike-front/browser /usr/share/nginx/html
EXPOSE 80
