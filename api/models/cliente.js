class Cliente {
  constructor(nome, idade, email,telefone,corte) {
    this.nome = nome;
    this.idade = idade;
    this.email = email;
    this.id;
    this.telefone = telefone;
    this.corte = corte;
    this.erros = [];
    //this.validarFormulario();
  }

  validarFormulario() {
    if (this.email.length == 0) {
      this.erros.push("Input de email vazio ");
    }
   else if (this.idade < 0) {
      this.erros.push("Idade invalida ");
    }
   else if (this.nome.length == 0) {
      this.erros.push("Input nome vazio ");
    }
  else  if (this.idade.length == 0) {
      this.erros.push("input idade vazio");
    }
  else if (this.telefone.length ==0){
      this.erros.push("input telefone vazio")
  }
  }
}

module.exports = Cliente;
