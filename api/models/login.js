class Login {
    
    constructor(email, senha, senhaValida){
        this.senha = senha
        this.email = email
        this.senhaValida = senhaValida
        this.erros = []
        this.validarFormulario()
    }

    validarFormulario(){
        if(this.senha != this.senhaValida){
        this.erros.push("Senhas nao coincidem")
        }
        if(this.email.length == 0){
            this.erros.push("Email invalido")  
        } 
        if(this.senha.length == 0){ 
        this.erros.push("Senha invalida")
        }
        if(this.senha.length == 0){
        this.erros.push("Campo de confimacao de senha invalida")
        }
    }

}

module.exports = Login