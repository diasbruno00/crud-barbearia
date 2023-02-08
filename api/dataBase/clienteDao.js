const db = require("./db");

class ClienteDAO {
  
  selectAllCliente() {
    return new Promise((resolve, reject) => {
      db.query("select * from cliente order by nomeCliente", (erro, resultado) => {
        if (erro) {
          reject(erro);
          return;
        } else {
          return resolve(resultado);
        }
      });
    });
  }

  selectAllNomeCliente(nome) {
    return new Promise((resolve, reject) => {
      db.query(
        "select * from cliente where nomeCliente like '%" + nome + "%' ",
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

  selectAllIdCliente(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "select * from cliente where id = ?",
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

  inserirClientesDB(cliente) {
    return new Promise((resolve, reject) => {
      db.query(
        "insert into cliente (nomeCliente,idade,email,telefone,corte) values (?, ?, ?,?,?)",
        [
          cliente.nome,
          cliente.idade,
          cliente.email,
          cliente.telefone,
          cliente.corte,
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

  updateClientesDB(cliente, id) {
    return new Promise((resolve, reject) => {
      db.query(
        "update cliente set nomeCliente = ?, idade = ?, email = ?,telefone = ?, corte = ? where id = ?",
        [
          cliente.nome,
          cliente.idade,
          cliente.email,
          cliente.telefone,
          cliente.corte,
          id,
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

  excluirClienteDB(id) {
    return new Promise((resolve, reject) => {
      db.query("delete from cliente where id = ? ", [id], (erro, resultado) => {
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

module.exports = ClienteDAO;
