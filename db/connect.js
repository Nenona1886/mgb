const mongoose = require('mongoose')
// Conexion
const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
      console.log("Conexion exitosa con la BBDD!!!!!! - Bien Pipe")
    })
    .catch((err) =>
      console.log("hubo un error al conectarnos con la BBDD")
    )
}
module.exports = dbConnect
