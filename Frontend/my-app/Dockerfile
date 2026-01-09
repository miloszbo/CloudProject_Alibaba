FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use a minimal Node image to serve files
FROM node:18-alpine

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy build files
COPY --from=build /app/build ./build

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]
