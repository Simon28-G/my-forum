# Base image
FROM node:14 AS build

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install 

# add app
COPY . ./

RUN npm run build --

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
