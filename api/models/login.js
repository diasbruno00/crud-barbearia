class Login {
  constructor(email, senha, senhaValida) {
    this.senha = senha;
    this.email = email;
    this.senhaValida = senhaValida;
    this.erros = [];
    this.validarFormulario();
  }

  validarFormulario() {
    if (this.senha != this.senhaValida) {
      this.erros.push("Senhas nao coincidem");
    } else if (this.email.length == 0) {
      this.erros.push("Input do Email vazio");
    } else if (this.senha.length == 0) {
      this.erros.push("Input da senha vazio");
    } else if (this.senha.length == 0) {
      this.erros.push("Input de validacao de senha vazio");
    }
  }
}

module.exports = Login;
