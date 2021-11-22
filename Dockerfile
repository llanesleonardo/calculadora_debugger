#Specify a base image lts long term 
FROM node:lts-alpine
WORKDIR /opt/app/client
#copy dependencies  from client to wordir
COPY client/package*.json ./
#Install modules
RUN npm ci
#copiar todo el proyecto del client a workdir
COPY ./client ./
#construir build
RUN npm run build

#Start process node / api
WORKDIR /opt/app/api
#copy dependencies  from client to wordir
COPY api/package*.json ./
#Install modules
RUN npm ci
#copiar todo el proyecto del client a workdir
COPY ./api ./
#construir build
RUN npm run build

#copiar todos los archivos del build de reactjs al public de la carpeta api
RUN cd /opt/app/client/build && cp -R * /opt/app/api/public
WORKDIR /opt/app/api
#Default command
CMD ["npm","run","prod"]
