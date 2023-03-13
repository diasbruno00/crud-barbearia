const db = require("./db");

class AgendaDao {
  inserirAgendaDB(agenda) {
    return new Promise((resolve, reject) => {
      db.query(
        "insert into agenda (horas,datas,clienteID,barbeiro,status) values (?,?,?,?,?)",
        [
          agenda.horas,
          agenda.datas,
          agenda.idCliente,
          agenda.nomeBarbeiro,
          agenda.status,
        ],
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
        "update agenda set clienteID = ?, barbeiro = ?, horas = ?, datas = ? where id = ?",
        [agenda.idCliente, agenda.nomeBarbeiro, agenda.horas, agenda.datas, id],
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
  updateAllAgendaDB(agenda, id, opcao) {
    return new Promise((resolve, reject) => {
      db.query(
        "update agenda set clienteID = ?, barbeiro = ?, horas = ?, datas = ?, status = ? where id = ?",
        [agenda.idCliente, agenda.nomeBarbeiro, agenda.horas, agenda.datas,opcao, id],
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
      db.query("select * from agenda where id = ?", [id], (erro, resultado) => {
        if (erro) {
          reject(erro);
          return;
        } else {
          const result = JSON.parse(JSON.stringify(resultado));
          return resolve(result[0]);
        }
      });
    });
  }
  buscaEdicaoAgendados(id) {
    return new Promise((resolve, reject) => {
      db.query(
        " select a.horas , a.datas, a.barbeiro, a.id , a.status, c.nomeCliente, a.clienteID from agenda as a , cliente as c where  a.clienteID = c.id and a.id = ? ;",
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
  verificarDisponibilidadeDeHorarioData(hora,data) {
    return new Promise((resolve, reject) => {
      db.query("select * from agenda where datas = ? and horas = ?", [data,hora], (erro, resultado) => {
        if (erro) {
          reject(erro);
          return;
        } else {
          const result = JSON.parse(JSON.stringify(resultado));
          return resolve(result[0]);
        }
      });
    });
  }
  
  selectAllIdEditarAgenda(id) {
    return new Promise((resolve, reject) => {
      db.query("select * from agenda where id = ?", [id], (erro, resultado) => {
        if (erro) {
          reject(erro);
          return;
        } else {
          return resolve(resultado);
        }
      });
    });
  }
  selectAllNomesAgendados() {
    return new Promise((resolve, reject) => {
      db.query(
        "select nomeCliente, nome, a.id,a.horas,a.datas,a.status,a.clienteID from agenda as a , cliente as c, barbeiro as b where a.clienteID = c.id and b.nome = a.barbeiro order by datas",
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

  pesquisarNomeNaAgenda(nome) {
    return new Promise((resolve, reject) => {
      db.query(
        "select nomeCliente, nome, a.id,a.horas,a.datas,a.status,a.clienteID from agenda as a , cliente as c, barbeiro as b where a.clienteID = c.id and b.nome = a.barbeiro  and nomeCliente = ? ",
        [nome],
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
        "select * from agenda where clienteID =  ?",
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

  selectAllClienteAgenda() {
    return new Promise((resolve, reject) => {
      db.query("select clienteID from agenda", (erro, resultado) => {
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
