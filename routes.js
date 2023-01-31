const express = require("express")
const route = express.Router()


const homeApi = require("./api/controllers/homeControllers")
const clienteApi = require("./api/controllers/clientesControllers")
const loginApi = require("./api/controllers/loginControllers")
const barbeiroApi = require("./api/controllers/barbeiroControllers")
const loginAdminApi = require("./api/controllers/loginAdminControllers")
const agendaApi = require('./api/controllers/agendaControllers')

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
route.get("/cadastro/barbeiro",middlewares.verficandoLoginAdmin,barbeiroApi.carregarPaginaCadatroBarbeiro)
route.post("/cadastro/barbeiro",middlewares.verficandoLoginAdmin,barbeiroApi.salvarDadosBarbeiro)
route.get("/lista/barbeiro",middlewares.verficandoLoginAdmin,barbeiroApi.carregarPaginaListaBarbeiro)
route.get("/excluir/barbeiro/:id",middlewares.verficandoLoginAdmin,barbeiroApi.excluirDadosBarbeiro)
route.post("/editar/barbeiro/:id",middlewares.verficandoLoginAdmin,barbeiroApi.editarDadosBarbeiro)
route.get("/editar/barbeiro/:id",middlewares.verficandoLoginAdmin,barbeiroApi.carregarPaginaEditarBarbeiro)

//rotas do agendar horario
route.get("/agendar/corte",middlewares.verficandoLogin,agendaApi.carregarPaginaAgendarCorte)
route.post("/agendar/corte",middlewares.verficandoLogin,agendaApi.salvarDadosAgendarCorte)
route.get("/lista/agenda",middlewares.verficandoLoginAdmin,agendaApi.carregarPaginaListaAgenda)
route.get("/excluir/agenda/:id", middlewares.verficandoLoginAdmin,agendaApi.excluirDadosAgenda)
route.get("/editar/agenda/:id",middlewares.verficandoLoginAdmin, agendaApi.carregarPaginaEditarAgenda)
route.post("/editar/agenda/:id",middlewares.verficandoLoginAdmin,agendaApi.editarDadosBarbeiro)


//rota pagina login clientes
route.post("/login/entrar",loginApi.salvarDadosLogin)
route.get("/login/entrar", loginApi.carregarPaginaLogin)
route.get("/login/deslogar",loginApi.deslogar)

// rota pagina login adminitrador
route.get("/login/admin/entrar", loginAdminApi.carregarPaginaLoginAdmin)
route.post("/login/admin/entrar", loginAdminApi.salvarDadosLoginAdmin)
route.get("/login/admin/deslogar",loginAdminApi.deslogarAdmin)



//rota da pagina Home
route.get("/home", homeApi.carrregarPaginaHome)


module.exports = route

