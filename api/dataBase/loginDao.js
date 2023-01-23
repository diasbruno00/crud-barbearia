const db = require("./db")

class LoginDao {

    selectAllLogin(login){
      return new Promise((resolve,reject)=>{
            db.query("select * from login where email = ? and senha = ? ",[login.email, login.senha],(erro,resultado)=>{
                if(erro){
                    reject(erro)
                    return
                }else{
                  return  resolve(resultado)
                }
            })
        })
    }

}

module.exports = LoginDao