require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT
const mongoose = require('mongoose')
const Schema =mongoose.Schema
const transporter = require("./helpers/mailer")
const Mail = require("nodemailer/lib/mailer")

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
  console.log("Conexion exitosa con la BBDD!!!!!! - Bien Pipe")
})
.catch((err) =>
  console.log("hubo un error al conectarnos con la BBDD")
)

const taskSchema = new Schema({
  name: String,
  done: Boolean
})

const Task = mongoose.model("Task", taskSchema, "Tasks" )

// Servir archivos estaticos
app.use(express.static('public'))

// Middlewares para parsear el BODY de las requests
app.use(express.json())

// Middlewares (preprocesamento de requests)
// Son SIEMPRE => FUNCIONES

// A) Pasamos una funicon anonima.
app.use((req,res,next)=>{
  console.log("No especificamos como debe ser el inicio de la ruta")
  console.log("Middlewares 1")
  next()
})

// B) Pasamos una funcion RETORNADA por OTRA FUNCION/METODO
const logger = {
  logThis: (whatToLog) => {
    return (req, res, next) => {
    console.log("Middleware 2: ", whatToLog)
    next()
  }
},
}
app.use("/martin", logger.logThis("logueame estooo"))
// hasta aca ej. B

// Configuar rutas
app.get('/', (req, res) => {  res.send('Hello World! - Sam Sam - Presta atencion - Jamas lo Dudes')})

// Buscar todas las tareas (ya creadas)- usando el modelo de mongoose 
// const Task = mongoose.model("Task", taskSchema, "Tasks" )
app.get('/api/tasks', (req, res) => {
  Task.find().then((tasks)=>{
    res.status(200).json({ ok: true, message: "Tareas existentes", data: tasks })
  }).catch((err) => {
    res.status(400).json({ok: false, message: "Error al obtener tareas"})
  })
})

// Crear
app.post('/api/tasks', (req, res) => {
  const body = req.body
  console.log({ body })
  Task.create({
    name: body.text,
    done: false
  }).then((createdTask)=>{
    res.status(201).json({ ok: true, message: "Tarea creada con exito", data: createdTask })
  }).catch((err) => {
    res.status(400).json({ok: false, message: "Error al crear la tarea"})
  })
})

// Actualiar
app.put('/api/tasks/:id', (req, res) => {
  const body = req.body
  const id = req.params.id
  //console.log({ body })
  Task.findByIdAndUpdate(id, {
    name: body.text,
  }).then((updatedTask)=>{
    res.status(200).json({ ok: true, message: "Tarea actualizada / editada con exito", data: updatedTask })
  }).catch((err) => {
    res.status(400).json({ok: false, message: "Error al actualizar / editar la tarea"})
  })
})

// Eliminar
//con las teclas Shift + Alt + Flecha Abajo (duplica el codigo).
app.delete('/api/tasks/:id', (req, res) => {
  const id = req.params.id
  //console.log({ params: req.params })
  //Task.deleteOne({_id: id}) // un metodo
  Task.findByIdAndDelete(id).then((deletedTask) => {
    res.status(200).json({ ok: true, message: "Tarea Eliminada", data: deletedTask })
  }).catch((err) => {
    res.status(400).json({ok: false, message: "Error al eliminar tarea"})
  })
})

// Mail
app.post('/api/auth/login/:email/code', async function (req, res) {
  const { email } = req.params
  const result = await transporter.sendMail({
  from: `JDB Sistemas ${process.env.EMAIL}`,
  to: email,
  subject:"Codigo de inicio de sesion: ",
  body:"Este es tu codigo para iniciar sesion: ",
})
console.log({ result })
res.status(200).json({ok: true, message: "Codigo enviado con exito!"})
})

// otras pruebas vs.
app.get('/api/users', (req, res) => {
  res.send([{name:"Martin"},{name:"Sam"},{name:"Felipe"}])
})

//Poner a escuchar la APP en un puerto
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})