class Cliente {
  constructor(nome, idade, email,telefone,corte) {
    this.nome = nome;
    this.idade = idade;
    this.email = email;
    this.id;
    this.telefone = telefone;
    this.corte = corte;
    this.erros = [];
    this.validarFormulario();
  }

  validarFormulario() {
    if (this.email.length == 0) {
      this.erros.push("email informado invalido ");
    }
   else if (this.idade < 0) {
      this.erros.push("Idade informada invalido ");
    }
   else if (this.nome.length == 0) {
      this.erros.push("nome invalido ");
    }
  else  if (this.idade.length == 0) {
      this.erros.push("idade invalida");
    }
  else if (this.telefome.length ==0){
      this.erros.push("telefone invalido")
  }
  }
}

module.exports = Cliente;
