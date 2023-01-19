const Cliente = require("../models/cliente");
const ClienteDAO = require("../dataBase/clienteDao");

function salvarDadosClientes(req, res, next) {

  const cliente = new Cliente(req.body.nome, req.body.idade, req.body.email);

  const clienteDao = new ClienteDAO();

  if (cliente.erros.length == 0) {

    clienteDao.inserirClientesDB(cliente); // inserir cliente no banco de dados
    req.flash("sucesso",`${cliente.nome} cadastrado com sucsso`)
    res.redirect("/cadastro/cliente")
  } else {
    req.flash("erro","verifique se os dados inseridos estao corretos")
    res.redirect("/cadastro/cliente")
  }
}

function carregarPaginaCadastroCliente(req, res, next) {  // Get
  res.render("cadastroClienteView");
}

async function carregarPaginaListarCliente(req, res, next) {
  const clienteDao = new ClienteDAO();
  const nome = req.query.pesquisarCliente;

  if (nome) {
    const listaClientesNome = await clienteDao.selectAllNomeCliente(nome);
    res.render("listarClientesView", {
      lista: listaClientesNome,
    });
  } else {
    try {
      const listaCliente = await clienteDao.selectAllCliente(); // consulta de todos os clientes do banco de dados
      res.render("listarClientesView", {
        lista: listaCliente,
        sucess: true,
      });
    } catch (error) {
      console.log("erro ao selecionar todos os dados da tabela cliente");
    }
  }
}

function editarDadosCliente(req, res, next) {
  const id = req.params.id;
  const clienteDao = new ClienteDAO();
  const cliente = new Cliente(req.body.nome, req.body.idade, req.body.email);

  clienteDao.updateClientesDB(cliente, id);

  req.flash("sucesso",`Dados do ${cliente.nome} alterado com sucesso `)
  res.redirect("/lista/cliente")

}

async function carregarPaginaEditarCliente(req, res, next) { // GET
  const clienteDao = new ClienteDAO();
  const id = req.params.id;
  const lista = await clienteDao.selectAllIdCliente(id);

  res.render("editarClienteView", {
    lista,
  });
}

 function excluirCliente(req, res, next) {
  const id = req.params.id;
  const clienteDao = new ClienteDAO();

  clienteDao.excluirClienteDB(id);

  // const listaCliente = await clienteDao.selectAllCliente()
  req.flash("sucesso",`Dados excluido com sucesso`)
  res.redirect("/lista/cliente")

}

module.exports = {
  salvarDadosClientes,
  carregarPaginaCadastroCliente,
  carregarPaginaListarCliente,
  carregarPaginaEditarCliente,
  editarDadosCliente,
  excluirCliente,
};
