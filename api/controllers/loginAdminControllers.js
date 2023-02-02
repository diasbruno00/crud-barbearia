const Login = require("../models/login");
const LoginAdminDao = require("../dataBase/loginAdminDao");

function carregarPaginaLoginAdmin(req, res, next) {
  res.render("loginAdminView");
}

async function salvarDadosLoginAdmin(req, res, next) {
  const login = new Login(
    req.body.email,
    req.body.senha
      );
  const loginAdminDao = new LoginAdminDao();
  try {
    if (login.erros.length == 0) {
      const resultado = await loginAdminDao.selectAllLogin(login);
      console.log(resultado)
      if (resultado) {
        req.session.administrador = resultado;
        req.flash("sucesso", `Login efetuado com sucesso`);
        res.redirect("/login/admin/entrar");
      }else{
        req.flash("erro", `Dados informados nao encontrado no banco de dados`);
        res.redirect("/login/admin/entrar");
      }
    } else {
      req.flash("erro", `Erro: ${login.erros}`);
      res.redirect("/login/admin/entrar");
    }
  } catch (error) {
      req.flash("erro", `Dados informados nao encontrado no banco de dados`);
      res.redirect("/login/admin/entrar");
    }
  }

  function deslogarAdmin(req,res,next){
    req.session.destroy();
    res.redirect("/login/Admin/entrar");
  }
module.exports = { carregarPaginaLoginAdmin, salvarDadosLoginAdmin,deslogarAdmin };
