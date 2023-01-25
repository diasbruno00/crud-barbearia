class Barbeiro {
  constructor(nome, email, telefone, especialidade) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.especialidade = especialidade;
    this.id;
    this.erros = [];
    this.validarFormulario();
  }

  validarFormulario() {
    if (this.nome.length == 0) {
      this.erros.push ("Input nome invalido")
    }
    else if (this.email.length == 0) {
      this.erros.push("input email invalido");
    }
   else if (this.telefone.length == 0) {
      this.erros.push ("input telefone invalido")
    }
  }
  
}
module.exports = Barbeiro;
