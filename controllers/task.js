//importar los modelos que nos faltaren
const { Task } = require("../models/task")

// Controladores
// Leer tareas (Controlador p/ruta del router).
const getAll =  (req, res) => {
    Task.find().then((tasks)=>{
      res.status(200).json({ ok: true, message: "Tareas existentes", data: tasks })
    }).catch((err) => {
      res.status(400).json({ok: false, message: "Error al obtener tareas"})
    })
}
// Crear Tarea (Controlador p/ruta del router).
const create = (req, res) => {
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
}
// Actualiar (Controlador p/ruta del router).
const update =  (req, res) => {
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
}
// Eliminar (Controlador p/ruta del router).
const remove = (req, res) => {
    const id = req.params.id
    //console.log({ params: req.params })
    //Task.deleteOne({_id: id}) // un metodo
    Task.findByIdAndDelete(id).then((deletedTask) => {
      res.status(200).json({ ok: true, message: "Tarea Eliminada", data: deletedTask })
    }).catch((err) => {
      res.status(400).json({ok: false, message: "Error al eliminar tarea"})
    })
}

module.exports = {
    getAll,
    create,
    update,
    remove
}
//NOTA: con las teclas Shift + Alt + Flecha Abajo (duplica el codigo).