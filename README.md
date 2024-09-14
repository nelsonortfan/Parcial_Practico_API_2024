## Description

A continuación los comandos para ejecutar el proyecto, realizar las pruebas, ver las collections y ver los resultados.

## Project setup

Ejecutar el siguiente comando para descargar las librerias

```bash
$ npm install
```

## Run tests

Para ejecutar los tests de la lógica ejecutar el siguiente comando:

```bash
# unit tests
$ npm run test:watch

```
Al ejecutar este comando, se vera el siguiente resultado:
![alt text](imagenes/all_test.JPG)

Para la entidad Club, estos son los tests:

![alt text](imagenes/Test_logica_club.JPG)

Para la entidad Socio, estos son los tests:

![alt text](imagenes/Test_logica_socio.JPG)

Y estos son los tests de la asociación:

![alt text](imagenes/Test_logica_asociacion.JPG)

## Compile and run the project

Para ejecutar la aplicación ejecutar el siguiente comando:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



## Collections

En el folder collections se encuentran las collections de cada una de las entidades y la asociación. De igual manera, en cada collection se encuentra la documentación de cada endpoint como se aprecia a continuación:

![alt text](<imagenes/Documentación APIs.JPG>)

De igual manera se que estos son los endpoints a ejecutar en la collection para la entidad club (para ello debe ejecutar la aplicación):

![alt text](imagenes/correr_collection_club_1.JPG)

Como resultado, los tests son exitosos:

![alt text](imagenes/correr_collection_club_2.JPG)

Para la collection de socio, estos son los endpoints:

![alt text](imagenes/correr_collection_socio_1.JPG)

Y los resultados son:

![alt text](imagenes/correr_collection_socio_2.JPG)

Finalmente, la collection de la asociacion junto con sus endpoints es:

![alt text](imagenes/correr_collection_club_socio_1.JPG)

Y este es el resultado:

![alt text](imagenes/correr_collection_socio_2.JPG)
