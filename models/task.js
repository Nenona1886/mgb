const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Esquemas
const taskSchema = new Schema({
    name: String,
    done: Boolean
  })

// Modelo
  const Task = mongoose.model("Task", taskSchema, "Tasks" )

  module.exports = { Task }