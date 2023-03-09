class Middlewares {
  middlewaresGlobal = (req, res, next) => {
    res.locals.sucesso = req.flash("sucesso");
    res.locals.erro = req.flash("erro");
    res.locals.alerta = req.flash("alerta");
    res.locals.usuario = req.session.usuario;
    res.locals.administrador = req.session.administrador
    next();
  };

  verficandoLogin = (req, res, next) => {
    if (!req.session.usuario) {
      req.flash(
        "alerta",
        "E necessario efetuar login para ter acesso a area do cliente"
      );
      req.session.save(() => {
        res.redirect("/login/entrar");
      });
      return;
    }
    next();
  };

  verficandoLoginAdmin = (req, res, next) => {
    if (!req.session.administrador) {
      req.flash(
        "alerta",
        "E necessario efetuar login para ter acesso a area do administrador"
      );
      req.session.save(() => {
        res.redirect("/login/admin/entrar");
      });
      return;
    }
    next();
  };
}
module.exports = Middlewares;
