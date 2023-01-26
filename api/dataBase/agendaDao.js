const { json } = require("body-parser");
const db = require("./db");

class AgendaDao {
  inserirAgendaDB(agenda, idBarbeiro, idCliente) {
    return new Promise((resolve, reject) => {
      db.query(
        "insert into agenda (horas,datas,clienteID,barbeiroID) values (?,?,?,?)",
        [agenda.horas, agenda.datas, idCliente, idBarbeiro],
        (erro, resultado) => {
          if (erro) {
            reject(erro);
            return;
          } else {
            //const data = JSON.parse(JSON.stringify(resultado))
            return resolve(resultado);
          }
        }
      );
    });
  }
}

module.exports = AgendaDao;
