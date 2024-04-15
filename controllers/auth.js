const { transporter } = require("../helpers/mailer")
const { User } = require("../models/user")
const jwt = require("jsonwebtoken")

const getCode =  async function (req, res) {
    const { email } = req.params
  
    const user = await User.findOne({ email })
  
    if (!user) {
      //await User.create({ email, firstname: "Jose", lastname: "jdb"})
      return res
      .status(400)
      .json({ok: false, message: "No existe un usuario con ese correo"})
    }
    
    let code = ""
  
    for (let index = 0; index <=5; index++){
      let character = Math.floor( Math.random() * 9)
      code += character
    }
    console.log({ code })
  
    user.login_code = code
    await user.save()
  
    const result = await transporter.sendMail({
    from: `JDB Sistemas ${process.env.EMAIL}`,
    to: email,
    subject:"Codigo de inicio de sesion: " + code,
    body:"Este es tu codigo para iniciar sesion: ",
  })
  console.log({ result })
  res.status(200).json({ok: true, message: "Codigo enviado con exito!"})
}

const login = async function (req, res) {
    const { email } = req.params
    const { code } = req.body
  
    const user = await User.findOne({ email, login_code: code })
  
    if (!user) {
      //await User.create({ email, firstname: "Jose", lastname: "jdb"})
      return res
      .status(400)
      .json({ok: false, message: "Credenciales invalidas"})
    }
  
  // token (libreria jwt)
  const tokenPayload = {
    _id: user._id,
    firstname: user.firstname,
    email: user.email  
  }
  
  // sign (metodo) p/ firmar una pieza de informacion PAYLOAD O DATA 2.44)
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY)
  console.log( {token })
  
  //cooki-parser
  res.cookie("jwt", token)
  
  res.status(200).json({ok: true, data: tokenPayload , message: "Inicio de sesion exitoso!!!"})
}

module.exports ={ getCode, login }