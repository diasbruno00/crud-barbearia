const mysql = require("mysql")

const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"barbearia"
})

conexao.connect((erro)=>{
    if(erro){
        console.log("houve um erro na conexao com o banco de dados")
    }else{
    console.log(`conectado ao banco de dados`)
    }
})

module.exports = conexao