class Agenda{
    constructor(idcliente,idbarbeiro,data,hora){
     this.idCliente = idcliente
     this.idBarbeiro = idbarbeiro
     this.datas = data
     this.horas = hora
     this.status = "Agendada"
    }
}

module.exports = Agenda