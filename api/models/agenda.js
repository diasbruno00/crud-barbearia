class Agenda{
    constructor( cliente,barbeiro,data,hora){
     this.idCliente = cliente
     this.nomeBarbeiro = barbeiro
     this.datas = data
     this.horas = hora
     this.status = "Agendada"
    }
}

module.exports = Agenda