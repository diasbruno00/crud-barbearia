const db = require("./db");

class AgendaDao {

  inserirAgendaDB(agenda,) {
    return new Promise((resolve, reject) => {
      db.query(
        "insert into agenda (horas,datas,clienteID,barbeiroID,status) values (?,?,?,?,?)",
        [agenda.horas, agenda.datas, agenda.idCliente, agenda.idBarbeiro ,agenda.status],
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
  updateAgendaDB(agenda, id) {
    return new Promise((resolve, reject) => {
      db.query(
        "update agenda set clienteID = ?, barbeiroID = ?, horas = ?, datas = ? where id = ?",
        [
          agenda.idCliente,
          agenda.idBarbeiro,
          agenda.horas,
          agenda.datas,
          id
        ],
        (erro, resultado) => {
          if (erro) {
            reject(erro);
            return;
          } else {
            return resolve(resultado);
          }
        }
      );
    });
  }

  selectAllIdAgenda(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "select * from agenda where id = ?",
        [id],
        (erro, resultado) => {
          if (erro) {
            reject(erro);
            return;
          } else {
            const result = JSON.parse(JSON.stringify(resultado));
            return resolve(result[0]);
          }
        }
      );
    });
  }
  selectAllIdEditarAgenda(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "select * from agenda where id = ?",
        [id],
        (erro, resultado) => {
          if (erro) {
            reject(erro);
            return;
          } else {
            return resolve(resultado);
          }
        }
      );
    });
  }

  selectAllDataAgenda(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "select * from agenda where clienteID =  ?",[id],
        (erro, resultado) => {
          if (erro) {
            reject(erro);
            return;
          } else {
            return resolve(resultado);
          }
        }
      );
    });
  }


  selectAllAgenda() {
    return new Promise((resolve, reject) => {
      db.query("select * from agenda", (erro, resultado) => {
        if (erro) {
          reject(erro);
          return;
        } else {
          return resolve(resultado);
        }
      });
    });
  }

  excluirAgendaDB(id) {
    return new Promise((resolve, reject) => {
      db.query("delete from agenda where id = ? ", [id], (erro, resultado) => {
        if (erro) {
          reject(erro);
          return;
        } else {
          return resolve(resultado);
        }
      });
    });
  }
}

module.exports = AgendaDao;
