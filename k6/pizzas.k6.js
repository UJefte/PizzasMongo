import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"
import { check } from 'k6'
import http from 'k6/http'

const baseUrl = 'http://localhost:3000/api/v1/'

//que se repita 10 veces la prueba
export const options = {
    vus: 1,
    iterations: 10
}

const headers = { headers: { 'Content-Type': 'application/json' } }

export default function () {
    //lista de pizzas
    const response = http.get(baseUrl + "pizzas")
    check(response, {
        'Lista de pizzas status code 200': (r) => r.status == 200
    })

    //agregar una pizza y guardar su id para las demas pruebas
    const pizza = JSON.stringify({ nombre: "Pepperoni", descripcion: "Pepperoni y queso" })
    const response01 = http.post(baseUrl + "pizzas", pizza, headers)
    check(response01, {
        'Agregar pizza status code 201': (r) => r.status == 201
    })
    const id = response01.json("id")

    //obtener la pizza que se acaba de agregar
    const response02 = http.get(baseUrl + "pizzas/" + id)
    check(response02, {
        'Pizza por id status code 200': (r) => r.status == 200
    })

    //actualizar la pizza
    const pizzaNueva = JSON.stringify({ nombre: "Pepperoni", descripcion: "Pepperoni, champiñones y queso" })
    const response03 = http.put(baseUrl + "pizzas/" + id, pizzaNueva, headers)
    check(response03, {
        'Actualizar pizza status code 202': (r) => r.status == 202
    })

    //borrar la pizza
    const response04 = http.del(baseUrl + "pizzas/" + id)
    check(response04, {
        'Borrar pizza status code 202': (r) => r.status == 202
    })
}

export function handleSummary(data) {
    return {
        "reportes/k6.html": htmlReport(data)
    }
}
