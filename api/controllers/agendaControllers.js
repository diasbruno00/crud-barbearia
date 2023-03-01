const Agenda = require("../models/agenda");
const AgendaDao = require("../database/agendaDao");
const ClienteDao = require("../dataBase/clienteDao");
const BarbeiroDao = require("../dataBase/barbeiroDao");
const moment = require("moment");

async function carregarPaginaAgendarCorte(req, res, next) {
  res.render("agendarCorteView");
}

async function salvarDadosAgendarCorte(req, res, next) {
  const agendaDao = new AgendaDao();
  const clienteDao = new ClienteDao();
  const barbeiroDao = new BarbeiroDao();

  const cliente = await clienteDao.buscarIDporNome(req.body.nomeCliente);
  const barbeiro = await barbeiroDao.selectNomeEspecificoBarbeiro(
    req.body.nomeBarbeiro
  );

  if (!cliente) {
    req.flash(
      "erro",
      ` ${req.body.nomeCliente} nao encontrado no banco de dados`
    );
    res.redirect("/agendar/corte");
  } else if (!barbeiro) {
    req.flash(
      "erro",
      `${req.body.nomeBarbeiro} nao encontrado no banco de dados`
    );
    res.redirect("/agendar/corte");
  } else if (cliente && barbeiro) {
    const agenda = new Agenda(
      cliente.id,
      req.body.nomeBarbeiro,
      req.body.data,
      req.body.hora
    );

    agendaDao.inserirAgendaDB(agenda);
    req.flash("sucesso", "Horario agendado com sucesso");
    res.redirect("/agendar/corte");
  }
}

async function carregarPaginaListaAgenda(req, res, next) {
  const clienteDao = new ClienteDao();
  const agendaDao = new AgendaDao();

  const pesquisarPeloNome = req.query.pesquisarAgenda;
  if (pesquisarPeloNome) {
    const lista = await agendaDao.pesquisarNomeNaAgenda(pesquisarPeloNome);
    const listaFormatada = lista.map((item) => {
      const dataHoraMoment = moment(item.datas);
      return {
        id: item.id,
        nomeCliente: item.nomeCliente,
        nomeBarbeiro: item.nome,
        data: dataHoraMoment.format("DD/MM/YYYY"),
        hora: item.horas,
        status: item.status,
        idCliente: item.clienteID,
      };
    });
    res.render("listaAgendaHorarios", { listaFormatada });
  } else {
    const lista = await agendaDao.selectAllNomesAgendados();
    const listaFormatada = lista.map((item) => {
      const dataHoraMoment = moment(item.datas);
      return {
        id: item.id,
        nomeCliente: item.nomeCliente,
        nomeBarbeiro: item.nome,
        data: dataHoraMoment.format("DD/MM/YYYY"),
        hora: item.horas,
        status: item.status,
        idCliente: item.clienteID,
      };
    });
    res.render("listaAgendaHorarios", { listaFormatada });
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

  const lista = await agendaDao.buscaEdicaoAgendados(id);

  console.log("id ao carregar: "+id);

  const listaFormatada = lista.map((item) => {
    const dataHoraMoment = moment(item.datas);
    return {
      id: item.id,
      nomeCliente: item.nomeCliente,
      nomeBarbeiro: item.barbeiro,
      data: dataHoraMoment.format("YYYY-MM-DD"),
      hora: item.horas
      };
  });

  res.render("editarAgendaCorteView", { listaFormatada });
}

async function editarDadosAgenda(req, res, next) {
  const agendaDao = new AgendaDao();
  const clienteDao = new ClienteDao();
  const barbeiroDao = new BarbeiroDao();
  const id = req.params.id;
  console.log("id ao salvar: "+id)
  const cliente = await clienteDao.buscarIDporNome(req.body.nomeCliente);
  const barbeiro = await barbeiroDao.selectNomeEspecificoBarbeiro( req.body.nomeBarbeiro);

  if (!cliente) {
    req.flash(
      "erro",
      ` ${req.body.nomeCliente} nao encontrado no banco de dados`
    );
    res.redirect("back");
  } else if (!barbeiro) {
    req.flash(
      "erro",
      `${req.body.nomeBarbeiro} nao encontrado no banco de dados`
    );
    res.redirect("back");
  } else if (cliente && barbeiro) {
    const agenda = new Agenda(
      cliente.id,
      req.body.nomeBarbeiro,
      req.body.data,
      req.body.hora
    );
    agendaDao.updateAgendaDB(agenda, id);
    req.flash("sucesso", "dados atualizados com sucesso");
    res.redirect("/lista/agenda");
  }
}

module.exports = {
  carregarPaginaAgendarCorte,
  salvarDadosAgendarCorte,
  carregarPaginaListaAgenda,
  excluirDadosAgenda,
  carregarPaginaEditarAgenda,
  editarDadosAgenda,
};
