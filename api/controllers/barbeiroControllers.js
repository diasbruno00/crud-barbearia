const Barbeiro = require("../models/barbeiro");
const BarbeiroDao = require("../dataBase/barbeiroDao");

function carregarPaginaCadatroBarbeiro(req, res, next) {
  res.render("cadastroBarbeiroView");
}

function salvarDadosBarbeiro(req, res, next) {
  const barbeiro = new Barbeiro(
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.especialidade
  );
  console.log(barbeiro.erros.length);

  if (barbeiro.erros.length == 0) {
    req.flash("sucesso", `${barbeiro.nome} cadastrado com sucesso`);
    const barbeiroDao = new BarbeiroDao();
    barbeiroDao.inserirBarbeiroDB(barbeiro);
    res.redirect("/cadastro/barbeiro");
  } else {
    req.flash("erro", `Erro: ${barbeiro.erros}`);
    res.redirect("/cadastro/barbeiro");
  }
}

async function carregarPaginaListaBarbeiro(req, res, next) {
  const barbeiroDao = new BarbeiroDao();
  const nome = req.query.pesquisarBarbeiro;
  if (!nome) {
    const lista = await barbeiroDao.selectAllBarbeiro();
    res.render("listarBarbeiroView", {
      lista,
    });
  } else {
    const lista = await barbeiroDao.selectAllBarbeiroNome(nome);
    res.render("listarBarbeiroView", {
      lista,
    });
  }
}

function excluirDadosBarbeiro(req, res, next) {
  const barbeiroDao = new BarbeiroDao();
  const id = req.params.id;
  barbeiroDao.excluirBarbeiroDB(id);
  req.flash("sucesso", "Dados excluido com sucesso");
  res.redirect("/lista/barbeiro");
}

module.exports = {
  carregarPaginaCadatroBarbeiro,
  salvarDadosBarbeiro,
  carregarPaginaListaBarbeiro,
  excluirDadosBarbeiro,
};
