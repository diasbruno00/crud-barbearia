class Middlewares {
  middlewaresGlobal = (req, res, next) => {
    res.locals.sucesso = req.flash("sucesso");
    res.locals.erro = req.flash("erro");
    res.locals.alerta = req.flash("alerta");
    res.locals.usuario = req.session.usuario;
    next();
  };

  verficandoLogin = (req, res, next) => {
    if (!req.session.usuario) {
      req.flash(
        "alerta",
        "E necessario efetuar login para ter acesso a essa area"
      );
      req.session.save(() => {
        res.redirect("/login/entrar");
      });
      return;
    }
    next();
  };
}
module.exports = Middlewares;
