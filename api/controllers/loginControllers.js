const Login = require("../models/login");

function carregarPaginaLogin(req, res, next) {
  res.render("loginView");
}

function salvarDadosLogin(req, res, next) {
  const login = new Login(
    req.body.email,
    req.body.senha,
    req.body.confirmarSenha
  );

  if (login.erros.length > 0) {
    res.render("loginView", {
      erro: true,
      informacoes: login,
    });
  } else {
  }
}
module.exports = { carregarPaginaLogin, salvarDadosLogin };
