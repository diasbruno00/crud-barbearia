const express = require("express")
const route = express.Router()

const homeApi = require("./api/controllers/homeControllers")
const clienteApi = require("./api/controllers/clientesControllers")
const loginApi = require("./api/controllers/loginControllers")


//rota cadastro usuario
route.post("/cadastro/cliente", clienteApi.salvarDadosClientes )
route.get("/cadastro/cliente", clienteApi.carregarPaginaCadastroCliente)

//rota lista de clientes
route.get("/lista/cliente", clienteApi.carregarPaginaListarCliente)

//rota edicao de cliente
route.get("/editar/cliente/:id",clienteApi.carregarPaginaEditarCliente)
route.post("/editar/cliente/:id",clienteApi.editarDadosCliente)

//rota excluir clientes
route.get("/excluir/cliente/:id",clienteApi.excluirCliente)

//rota pagina login
route.post("/login",loginApi.salvarDadosLogin)
route.get("/login", loginApi.carregarPaginaLogin)

//rota da pagina Home
route.get("/home", homeApi.carrregarPaginaHome)


module.exports = route

