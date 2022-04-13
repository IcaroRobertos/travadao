const express = require("express")

const app = express()

const routes = express.Router()

routes.get("/", (request, response) => response.json({ok: true}))

const todos = []

/**
 * Criar TODO
 */
routes.post("/todo", (request, response) => {
    todos.push(request.body)

    return response.json({todos})
})

/**
 * Listar TODOs
 */
routes.get("/todo", (request, response) => response.json({todos}))

/**
 * Atualizer TODO
 */
routes.put("/todo/:id", (request, response) => {
    const id = request.params.id

    const index = todos.findIndex((todo) => todo.id === parseInt(id, 10))

    todos[index] = request.body

    return response.json({todos})
})

/**
 * Remover TODO
 */
routes.delete("/todo/:id", (request, response) => {
    const id = request.params.id

    const index = todos.findIndex((todo) => todo.id === parseInt(id, 10))

    todos.splice(index, 1)

    return response.json({todos})
})

/**
 * Setar TODO como `finished` (Concluído)
 */
routes.patch("/todo/:id", (request, response) => {
    const id = request.params.id

    const index = todos.findIndex((todo) => todo.id === parseInt(id, 10))

    todos[index].finish = request.body.finish

    return response.json({todos})
})

app.use(express.json())
app.use(routes)

app.listen(8888, () => console.log("Aplicativo rodando na porta 8888"))