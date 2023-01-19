
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const route = require("./routes")
const exphbs = require("express-handlebars")
const session = require("express-session")
const flash = require("connect-flash")
const app = express()
const porta = 5500

app.use(session({
    secret: "crud",
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

// MIDDLEWARE 
app.use((req,res,next)=>{
    res.locals.sucesso = req.flash("sucesso")
    res.locals.erro = req.flash("erro")
    next()
})

app.use(express.urlencoded({
    extended: true                            
}))

app.use(express.static(path.resolve(__dirname,'public')))  // carrega arquivo estatico Img e css 

app.set("views",path.resolve(__dirname,'api','views'))
app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine','handlebars')   // carrega pagina handlebars 

app.use(route)

app.listen(porta, ()=>{
    console.log(`http://localhost:${porta}/home`)
    console.log(`servidor rodando na porta ${porta}`)
})

