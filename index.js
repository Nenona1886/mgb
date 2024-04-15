require("dotenv").config()
const express = require('express')
const app = express()
const dbConnect = require("./db/connect")
const cookieParser = require("cookie-parser")
const tasksRoutes = require("./routes/task")
const authRoutes = require("./routes/auth")
const { jwtValidation } = require("./middlewares/jwtValidation")

//Ejecuto la conexion
dbConnect()

// Middlewares (preprocesamento de requests) // Son SIEMPRE => FUNCIONES
app.use(express.static('public', { extensions: ["html", "css", "js"] })) // Servir archivos estaticos
app.use(express.json()) // Middlewares para parsear el BODY de las requests
app.use(cookieParser())

// Configuar nuestros ROUTERS
app.use("/api/auth", authRoutes ) // Ruta de autenticacion

app.use(jwtValidation) // este Middlewares NO USAR en ruta de autenticacion

app.use("/api/tasks", tasksRoutes)

const port = process.env.PORT
//Poner a escuchar la APP en un puerto
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// otras pruebas vs.
//app.get('/api/users', (req, res) => {
//  res.send([{name:"Martin"},{name:"Sam"},{name:"Felipe"}])
//})

// A) Pasamos una funicon anonima.
//app.use((req,res,next)=>{
//  console.log("No especificamos como debe ser el inicio de la ruta")
//  console.log("Middlewares 1")
//  next()
//})

// B) Pasamos una funcion RETORNADA por OTRA FUNCION/METODO
//const logger = {
//  logThis: (whatToLog) => {
//    return (req, res, next) => {
//    console.log("Middleware 2: ", whatToLog)
//    next()
//  }
//},
//}
//app.use("/martin", logger.logThis("logueame estooo"))
// hasta aca ej. B

// Configuar rutas
//app.get('/', (req, res) => {  res.send('Hello World! - Sam Sam - Presta atencion - Jamas lo Dudes')})

// Buscar todas las tareas (ya creadas)- usando el modelo de mongoose 
// const Task = mongoose.model("Task", taskSchema, "Tasks" )
