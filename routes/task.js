const express = require('express')
const { getAll, create, update, remove } = require('../controllers/task')
const router = express.Router()

  // Rutas con validacion (d/token)
  router.get('/', getAll) // Leer tareas (Ruta y Controlador)
  router.post('/', create ) // Crear (Ruta y Controlador)
  router.put('/:id', update) // Actualiar (Ruta y Controlador)
  router.delete('/:id', remove) // Eliminar (Ruta y Controlador)

module.exports = router
//NOTA: con las teclas Shift + Alt + Flecha Abajo (duplica el codigo).