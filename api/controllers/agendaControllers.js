const Agenda = require("../models/agenda");
const ClienteDao = require("../dataBase/clienteDao");
const BarbeiroDao = require("../dataBase/barbeiroDao");
const AgendaDao = require("../dataBase/agendaDao");

const clienteDao = new ClienteDao();
const barbeiroDao = new BarbeiroDao();
const agendaDao = new AgendaDao();

async function carregarPaginaAgendarCorte(req, res, next) {
  const listaClientes = await clienteDao.selectAllCliente();
  const listaBarbeiros = await barbeiroDao.selectAllBarbeiro();

  console.log(listaClientes);
  res.render("agendarCorteView", {
    listaClientes,
    listaBarbeiros,
  });
}

async function salvarDadosAgendarCorte(req, res, next) {
  const agenda = new Agenda(
    req.body.cliente,
    req.body.barbeiro,
    req.body.data,
    req.body.hora
  );

  const cliente = await clienteDao.selectAllNomeCliente(agenda.cliente);
  const barbeiro = await barbeiroDao.selectAllBarbeiroNome(agenda.barbeiro);

  console.log("id do cliente: " + cliente[0].id);

  if (cliente && barbeiro) {
    const resultado = await agendaDao.inserirAgendaDB(
      agenda,
      barbeiro[0].id,
      cliente[0].id
    );
    console.log(resultado);
    req.flash("sucesso", "Horario marcado com sucesso");
    res.redirect("/agendar/corte");
  } else {
    req.flas("erro", "Dados invalidos");
    res.redirect("/agendar/corte");
  }
}

module.exports = { carregarPaginaAgendarCorte, salvarDadosAgendarCorte };
