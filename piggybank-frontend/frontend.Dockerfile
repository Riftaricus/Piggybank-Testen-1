# frontend/Dockerfile

FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

# Copy the built static files into nginx's web root
# adjust "dist" to "build" if you're using Create React App instead of Vite
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]