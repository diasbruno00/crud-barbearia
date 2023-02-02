class Login {
  constructor(email, senha) {
    this.senha = senha;
    this.email = email;
    this.erros = [];
    this.validarFormulario();
  }

  validarFormulario() {

    if (this.email.length == 0) {
      this.erros.push("Input do Email vazio");
    } else if (this.senha.length == 0) {
      this.erros.push("Input da senha vazio");
   
  }
}
}
module.exports = Login;
