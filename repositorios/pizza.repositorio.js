//Esta es la capa donde se persisten los datos
//Ahora las pizzas se guardan en MongoDB

import { MongoClient } from "mongodb"

//cadena de conexion copiada de MongoDB Compass
const cadenaDeConexion = "mongodb://localhost:27017"

const cliente = new MongoClient(cadenaDeConexion)
const db = cliente.db("pizzeria")
const coleccion = db.collection("pizzas")

//para no regresar el _id que pone mongo, solo usamos nuestro id
const sinIdDeMongo = { projection: { _id: 0 } }

/**
 * Regresa todas las pizzas guardadas
 * Recibe: nada
 * Devuelve: un arreglo con las pizzas, si no hay ninguna regresa []
 */
export async function obtenerTodasLasPizzasAsync() {
   const pizzas = await coleccion.find({}, sinIdDeMongo).toArray()

   return pizzas
}

/**
 * Busca una pizza por su id
 * Recibe: el id de la pizza
 * Devuelve: la pizza encontrada o undefined si no existe
 */
export async function obtenerPizzaPorIdAsync(id) {
   const pizza = await coleccion.findOne({ id: Number(id) }, sinIdDeMongo)

   return pizza ?? undefined
}

/**
 * Guarda una pizza nueva
 * Recibe: la pizza con nombre y descripcion
 * Devuelve: el id que se le asigno a la pizza
 */
export async function agregarPizzaAsync(pizza) {
   //buscamos la pizza con el id mas grande para darle el siguiente
   const ultima = await coleccion.find().sort({ id: -1 }).limit(1).toArray()
   let id = 1
   if (ultima.length > 0) {
      id = ultima[0].id + 1
   }

   await coleccion.insertOne({ id: id, nombre: pizza.nombre, descripcion: pizza.descripcion })

   return id
}

/**
 * Actualiza el nombre y/o la descripcion de una pizza
 * Recibe: el id de la pizza y un objeto con los datos nuevos
 * Devuelve: la pizza ya actualizada o undefined si no existe
 */
export async function actualizarPizzaAsync(id, pizza) {
   //solo cambiamos los datos que si mandaron
   const datosNuevos = {}
   if (pizza.nombre != undefined) datosNuevos.nombre = pizza.nombre
   if (pizza.descripcion != undefined) datosNuevos.descripcion = pizza.descripcion

   const pizzaActualizada = await coleccion.findOneAndUpdate(
      { id: Number(id) },
      { $set: datosNuevos },
      { returnDocument: "after", projection: { _id: 0 } }
   )

   return pizzaActualizada ?? undefined
}

/**
 * Borra una pizza
 * Recibe: el id de la pizza
 * Devuelve: la pizza que se borro o undefined si no existe
 */
export async function borrarPizzaAsync(id) {
   const pizzaBorrada = await coleccion.findOneAndDelete({ id: Number(id) }, sinIdDeMongo)

   return pizzaBorrada ?? undefined
}
