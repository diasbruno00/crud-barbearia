const Login = require("../models/login");
const LoginDao = require("../dataBase/loginDao");

function carregarPaginaLogin(req, res, next) {
  res.render("loginView");
}

async function salvarDadosLogin(req, res, next) {
  const loginDao = new LoginDao();

  const login = new Login(
    req.body.email,
    req.body.senha,
    req.body.confirmarSenha
  );

  if (login.erros.length > 0) {
    req.flash("erro", `Erro: ${login.erros}`);
    res.redirect("/login");
  } else {
    try {
      const resultado = await loginDao.selectAllLogin(login);
      req.session.usuario = resultado;
      if (resultado) {
        req.flash("sucesso", `Login efetuado com sucesso`);
        res.redirect("/login");
      } else {
        req.flash("erro", `Dados informados incorretos`);
        res.redirect("/login");
      }
    } catch (error) {
      console.log("erro ao realizar login");
    }
  }
}

function deslogar(req, res, next) {
  req.session.destroy();
  res.redirect("/login/entrar");
}

module.exports = { carregarPaginaLogin, salvarDadosLogin, deslogar };
