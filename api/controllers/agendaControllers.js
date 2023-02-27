const Agenda = require("../models/agenda");
const AgendaDao = require("../database/agendaDao");
const ClienteDao = require("../dataBase/clienteDao");
const BarbeiroDao = require("../dataBase/barbeiroDao");
const moment = require("moment");

async function carregarPaginaAgendarCorte(req, res, next) {
  const clienteDao = new ClienteDao();
  const barbeiroDao = new BarbeiroDao();

  const listaBarbeiro = await barbeiroDao.selectAllBarbeiroAgenda()
  const listaCliente = await clienteDao.selecionarNomesCliente()

  res.render("agendarCorteView", { listaBarbeiro , listaCliente});

}

async function salvarDadosAgendarCorte(req, res, next) {
  const agendaDao = new AgendaDao();
  const clienteDao = new ClienteDao();

  console.log("nome encontrado: " +req.body.nomeCliente)

  const cliente = await clienteDao.buscarIDporNome(req.body.nomeCliente);
  console.log("cliente encontrado"+cliente.id)
  if (cliente) {
    const agenda = new Agenda(
      cliente.id,
      req.body.nomeBarbeiro,
      req.body.data,
      req.body.hora
    );

      agendaDao.inserirAgendaDB(agenda);
      req.flash("sucesso", "Horario agendado com sucesso");
      res.redirect("/agendar/corte");
  } else {
    req.flash(
      "erro",
      `id: ${req.body.idCliente} do cliente nao encontrado no banco de dados`
    );
    res.redirect("/agendar/corte");
  }
}
/*
async function carregarPaginaListaAgenda(req, res, next) {
  const agendaDao = new AgendaDao();

  const id = req.query.pesquisarAgenda; // id do cliente
  if (!id) {
    try {
      const lista = await agendaDao.selectAllAgenda();
      console.log(lista);
      const listaFormatada = lista.map((item) => {
        const dataHoraMoment = moment(item.datas);
        return {
          id: item.id,
          idCliente: item.clienteID,
          nomeBarbeiro: item.barbeiro,
          data: dataHoraMoment.format("DD/MM/YYYY"),
          hora: item.horas,
          status: item.status,
        };
      });
      res.render("listaAgendaHorarios", { listaFormatada });
    } catch (error) {
      req.flash("erro", "erro ao carregar dados da agenda");
      res.redirect("/home");
    }
  } else {
    const lista = await agendaDao.selectAllDataAgenda(id);
    res.render("listaAgendaHorarios", { lista });
  }
}

*/

async function carregarPaginaListaAgenda(req, res, next) {
  const clienteDao = new ClienteDao();
  const agendaDao = new AgendaDao();

  const lista =  await agendaDao.selectAllNomesAgendados()
  const listaFormatada = lista.map((item) => {
    const dataHoraMoment = moment(item.datas);
    return {
      id: item.id,
      nomeCliente: item.nomeCliente,
      nomeBarbeiro: item.nome,
      data: dataHoraMoment.format("DD/MM/YYYY"),
      hora: item.horas,
      status: item.status,
    };
  });

  res.render("listaAgendaHorarios",{listaFormatada})

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

  res.render("editarAgendaCorteView", { listaFormatada });
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
