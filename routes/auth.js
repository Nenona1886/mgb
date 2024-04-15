const express = require('express')
const { getCode, login } = require('../controllers/auth')
const router = express.Router()

// Rutas sin validacion (d/token), autenticacion

// Mail y Codigos
router.post('/login/:email/code', getCode)
  
// Iniciar sesion
router.post('/login/:email', login )

module.exports = router