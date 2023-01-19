class Cliente {
  constructor(nome, idade, email) {
    this.nome = nome;
    this.idade = idade;
    this.email = email;
    this.id;
    this.erros = [];
    this.validarFormulario();
  }

  validarFormulario() {
    if (this.email.length == 0) {
      this.erros.push("email informado invalido ");
    }
    if (this.idade < 0) {
      this.erros.push("Idade informada invalido ");
    }
    if (this.nome.length == 0) {
      this.erros.push("nome invalido ");
    }
    if (this.idade.length == 0) {
      this.erros.push("idade invalida");
    }
  }
}

module.exports = Cliente;
