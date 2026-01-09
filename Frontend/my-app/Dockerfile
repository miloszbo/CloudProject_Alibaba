<<<<<<< Updated upstream
FROM node:lts-alpine AS build-stage

WORKDIR /app

=======
#FROM node:20-alpine AS development-dependencies-env
#COPY . /app
#WORKDIR /app
#RUN npm ci

#FROM node:20-alpine AS production-dependencies-env
#COPY ./package.json package-lock.json /app/
#WORKDIR /app
#RUN npm ci --omit=dev

#FROM node:20-alpine AS build-env
#COPY . /app/
#COPY --from=development-dependencies-env /app/node_modules /app/node_modules
#WORKDIR /app
#RUN npm run build

#FROM node:20-alpine
#COPY ./package.json package-lock.json /app/
#COPY --from=production-dependencies-env /app/node_modules /app/node_modules
#COPY --from=build-env /app/build /app/build
#WORKDIR /app
#CMD ["npm", "run", "start"]


FROM node:lts-alpine AS build-stage

WORKDIR /app

>>>>>>> Stashed changes
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-alpine AS prod

WORKDIR /app

COPY --from=build-stage /app /app

RUN npm install

<<<<<<< Updated upstream
EXPOSE 80

CMD [ "npm", "run", "dev" ]
=======
EXPOSE 5173

CMD [ "npm", "run", "start"] 
>>>>>>> Stashed changes
