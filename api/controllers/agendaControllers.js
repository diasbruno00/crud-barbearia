const Agenda = require("../models/agenda");
const AgendaDao = require("../database/agendaDao");
const ClienteDao = require("../dataBase/clienteDao");
const BarbeiroDao = require("../dataBase/barbeiroDao");

function carregarPaginaAgendarCorte(req, res, next) {
  res.render("agendarCorteView");
}

async function salvarDadosAgendarCorte(req, res, next) {
  const agendaDao = new AgendaDao();
  const clienteDao = new ClienteDao();
  const barbeiroDao = new BarbeiroDao();

  const agenda = new Agenda(
    req.body.idCliente,
    req.body.idBarbeiro,
    req.body.data,
    req.body.hora
  );

  const cliente = await clienteDao.selectAllIdCliente(req.body.idCliente);
  console.log(cliente)
  if (cliente) {
    const barbeiro = await barbeiroDao.selectAllIdBarbeiro(req.body.idBarbeiro);
    console.log(barbeiro)
    if (barbeiro) {
      agendaDao.inserirAgendaDB(agenda);
      req.flash("sucesso", "Horario agendado com sucesso");
      res.redirect("/agendar/corte");
    } else {
      req.flash("erro", `id: ${req.body.idBarbeiro} do barbeiro invalido`);
      res.redirect("/agendar/corte");
    }
  } else {
    req.flash("erro", `id: ${req.body.idCliente} do cliente invalido`);
    res.redirect("/agendar/corte");
  }
}

async function carregarPaginaListaAgenda(req, res, next) {
  const agendaDao = new AgendaDao();
  const id = req.query.pesquisarAgenda; // id do cliente
  if (!id) {
    try {
      const lista = await agendaDao.selectAllAgenda();
      res.render("listaAgendaHorarios", { lista });
    } catch (error) {
      req.flash("erro", "erro ao carregar dados da agenda");
      res.redirect("/home");
    }
  } else {
    const lista = await agendaDao.selectAllDataAgenda(id);
    res.render("listaAgendaHorarios", { lista });
  }
}

function excluirDadosAgenda(req, res, next) {
  const id = req.params.id;
  const agendaDao = new AgendaDao();

  try {
    agendaDao.excluirAgendaDB(id);
    res.json({ message: "Dados excluídos com sucesso" });
  } catch (error) {
    console.log(error);
  }
}

async function carregarPaginaEditarAgenda(req, res, next) {
  const agendaDao = new AgendaDao();
  const id = req.params.id;

  const lista = await agendaDao.selectAllIdAgenda(id);

  if (lista) {
    res.render("editarAgendaCorteView", { lista });
  } else {
    req.flash("erro", "erro ao carregar dados do banco de dados");
    res.redirect("/agendar/corte");
  }
}

function editarDadosBarbeiro(req, res, next) {
  try {
    const agendaDao = new AgendaDao();
    const id = req.query.id;
    const agenda = new Agenda(
      req.body.idCliente,
      req.body.idBarbeiro,
      req.body.data,
      req.body.hora
    );
    agendaDao.updateAgendaDB(agenda, id);
    req.flash("sucesso", "dados atualizados com sucesso");
    res.redirect("/lista/agenda");
  } catch (error) {
    req.flash(
      "erro",
      "nao foi possivel atualizar os dados, verifique os dados informados"
    );
    res.redirect("/lista/agenda");
  }
}

module.exports = {
  carregarPaginaAgendarCorte,
  salvarDadosAgendarCorte,
  carregarPaginaListaAgenda,
  excluirDadosAgenda,
  carregarPaginaEditarAgenda,
  editarDadosBarbeiro,
};
