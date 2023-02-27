const db = require("./db")

class BarbeiroDao {
  inserirBarbeiroDB(barbeiro) {
      return new Promise((resolve, reject) => {
        db.query(
          "insert into barbeiro (nome,email,telefone,especialidade) values (?,?,?,?)"
        ,
          [
            barbeiro.nome,
            barbeiro.email,
            barbeiro.telefone,
            barbeiro.especialidade,
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

    selectAllIdBarbeiro(id) {
      return new Promise((resolve, reject) => {
        db.query(
          "select * from barbeiro where id = ?",
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

    
    selectAllIdEditarBarbeiro(id) {
      return new Promise((resolve, reject) => {
        db.query(
          "select * from barbeiro where id = ?",
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

    updateBarbeiroDB(barbeiro, id) {
      return new Promise((resolve, reject) => {
        db.query(
          "update barbeiro set nome = ?, email = ?,telefone = ?, especialidade = ? where id = ?",
          [
            barbeiro.nome,
            barbeiro.email,
            barbeiro.telefone,
            barbeiro.especialidade,
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
    selectAllBarbeiroNome(nome) {
        return new Promise((resolve, reject) => {
          db.query(
            "select * from barbeiro where nome like '%" + nome + "%' ",
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
    
    excluirBarbeiroDB(id) {
        return new Promise((resolve, reject) => {
          db.query("delete from barbeiro where id = ? ", [id], (erro, resultado) => {
            if (erro) {
              reject(erro);
              return;
            } else {
              return resolve(resultado);
            }
          });
        });
      }

    selectAllBarbeiro() {
        return new Promise((resolve, reject) => {
          db.query("select * from barbeiro order by nome", (erro, resultado) => {
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

module.exports = BarbeiroDao;
