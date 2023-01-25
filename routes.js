const express = require("express")
const route = express.Router()


const homeApi = require("./api/controllers/homeControllers")
const clienteApi = require("./api/controllers/clientesControllers")
const loginApi = require("./api/controllers/loginControllers")
const barbeiroApi = require("./api/controllers/barbeiroControllers")

const Middlewares = require("./api/Middlewares/middlewares")
const middlewares = new Middlewares()

//rotas de cliente
route.post("/cadastro/cliente", middlewares.verficandoLogin,clienteApi.salvarDadosClientes )
route.get("/cadastro/cliente",middlewares.verficandoLogin, clienteApi.carregarPaginaCadastroCliente)
route.get("/lista/cliente",middlewares.verficandoLogin, clienteApi.carregarPaginaListarCliente)
route.get("/editar/cliente/:id",middlewares.verficandoLogin,clienteApi.carregarPaginaEditarCliente)
route.post("/editar/cliente/:id",middlewares.verficandoLogin,clienteApi.editarDadosCliente)
route.get("/excluir/cliente/:id",middlewares.verficandoLogin,clienteApi.excluirCliente)

//rotas de barbeiro
route.get("/cadastro/barbeiro",barbeiroApi.carregarPaginaCadatroBarbeiro)
route.post("/cadastro/barbeiro",barbeiroApi.salvarDadosBarbeiro)
route.get("/lista/barbeiro",barbeiroApi.carregarPaginaListaBarbeiro)
route.get("/excluir/barbeiro/:id",barbeiroApi.excluirDadosBarbeiro)
route.post("/editar/barbeiro/:id",barbeiroApi.editarDadosBarbeiro)
route.get("/editar/barbeiro/:id",barbeiroApi.carregarPaginaEditarBarbeiro)



//rota pagina login
route.post("/login/entrar",loginApi.salvarDadosLogin)
route.get("/login/entrar", loginApi.carregarPaginaLogin)
route.get("/login/deslogar",loginApi.deslogar)

//rota da pagina Home
route.get("/home", homeApi.carrregarPaginaHome)




module.exports = route

