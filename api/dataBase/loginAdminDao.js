const db = require("./db")

class LoginAdminDao {
    selectAllLogin(login) {
        return new Promise((resolve, reject) => {
          db.query(
            "select * from loginAdmin where email = ? and senha = ? ",
            [login.email, login.senha],
            (erro, resultado) => {
              if (erro) {
                reject(erro);
                return;
              } else {
                const login = JSON.parse(JSON.stringify(resultado));
                return resolve(login[0]);
              }
            }
          );
        });
      }
}

module.exports = LoginAdminDao