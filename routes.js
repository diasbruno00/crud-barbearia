const express = require("express")
const route = express.Router()


const homeApi = require("./api/controllers/homeControllers")
const clienteApi = require("./api/controllers/clientesControllers")
const loginApi = require("./api/controllers/loginControllers")

const Middlewares = require("./api/Middlewares/middlewares")
const middlewares = new Middlewares()

//rota cadastro usuario
route.post("/cadastro/cliente", middlewares.verficandoLogin,clienteApi.salvarDadosClientes )
route.get("/cadastro/cliente",middlewares.verficandoLogin, clienteApi.carregarPaginaCadastroCliente)

//rota lista de clientes
route.get("/lista/cliente",middlewares.verficandoLogin, clienteApi.carregarPaginaListarCliente)

//rota edicao de cliente
route.get("/editar/cliente/:id",middlewares.verficandoLogin,clienteApi.carregarPaginaEditarCliente)
route.post("/editar/cliente/:id",middlewares.verficandoLogin,clienteApi.editarDadosCliente)

//rota excluir clientes
route.get("/excluir/cliente/:id",middlewares.verficandoLogin,clienteApi.excluirCliente)

//rota pagina login
route.post("/login/entrar",loginApi.salvarDadosLogin)
route.get("/login/entrar", loginApi.carregarPaginaLogin)
route.get("/login/deslogar",loginApi.deslogar)

//rota da pagina Home
route.get("/home", homeApi.carrregarPaginaHome)


module.exports = route

