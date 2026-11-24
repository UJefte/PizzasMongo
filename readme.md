# Pizzas Mongo

CRUD de pizzas con Node.js, Express y MongoDB. Es el mismo proyecto de Pizzas V2, solo cambió el repositorio (`repositorios/pizza.repositorio.js`) para guardar en Mongo en lugar de memoria.

## Base de datos

Mongo corre en Docker:

```
docker compose up -d
```

- Cadena de conexión: `mongodb://localhost:27017`
- Base: `pizzeria`
- Colección: `pizzas`

## Ejecutar

```
npm install
npm run dev
```

## Pruebas

Colección de Postman en la carpeta `postman` (ambiente `dev`).

Para generar el reporte HTML con newman y htmlextra (con el servidor corriendo):

```
npm run reporte
```

El reporte queda en [`reportes/reporte.html`](reportes/reporte.html).

Prueba con K6 de los endpoints (con el servidor corriendo):

```
npm run k6
```

- Script: [`k6/pizzas.k6.js`](k6/pizzas.k6.js)
- Reporte: [`reportes/k6.html`](reportes/k6.html)

![Postman](capturas/postman-1.png)

![Postman](capturas/postman-2.png)
