console.log("Este JS va a ser interpretado por el NAVEGADOR")

//Obtener elementos del HTML y guardarlos en constantes
const createEditBtn = document.querySelector("#create-tasks")
const tasksDIV = document.querySelector("#tasks")
const input = document.querySelector("#task-name")

const baseBackendUrl = `${window.origin}/api`
//console.log({ window, baseBackendUrl})
//const baseBackendUrl = "http://localhost:4000/api"

let TASK_TO_EDIT = null

//Nutrir de funcionalidad a los botones

createEditBtn.addEventListener("click", async function () {
    //console.log("Crear Tareas")
    const creating = !TASK_TO_EDIT //va a ser verdadero solo creando
    //console.log({ input }) 
    const path = creating ? "tasks" : `tasks/${TASK_TO_EDIT._id}`
    const method = creating ? "POST" : "PUT"
    const res = await fetch(`${baseBackendUrl}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.value }),
    })
        getTasks()
        input.value = ""
        createEditBtn.innerText = "Crear tarea"   
    //const resJSON = await res.json()
    //console.log({resJSON})
})

//Definicion de funciones

async function getTasks() {
    tasksDIV.innerHTML = null
    const res = await fetch (`${baseBackendUrl}/tasks`)
    const resJSON = await res.json()
        //console.log({ resJSON })
        const tasks = resJSON.data //aca tendriamos todas las tareas
        for (const task of tasks) {
            const taskParagraph = document.createElement('p') //creo un elemento HTML
            const deleteTaskBtn = document.createElement('button') //creo un elemento HTML
            const taskContainDIV = document.createElement('div')
            deleteTaskBtn.innerText = "Borrar" //
            taskParagraph.innerText = task.name //le ponemos el texto de cada tarea
            deleteTaskBtn.setAttribute('id', task._id)
            deleteTaskBtn.addEventListener('click',(e)=>{
                //console.log({e}) ver explicacion m bueno
                const taskId = e.target.id
                deleteTaskBtn.innerText = "..."
                fetch(`${baseBackendUrl}/tasks/${taskId}`, {
                    method: "DELETE",
                }).then(() => {
                    const taskDiv = deleteTaskBtn.parentElement
                    taskDiv.remove()
                    //getTasks()
                })
            })
            taskParagraph.addEventListener("click",(e)=>{
                input.value = task.name //selecciona tarea para editar
                createEditBtn.innerText = "Editar tarea" //cambia el texto del btn (crear / editar)
                TASK_TO_EDIT = task //guardo la tarea para su edicion
            })
            //console.log({tarea: task}) // mustro cada tarea
            //console.log({taskParagraph}) // muestro el elemento HTML genial (para ver inerText y ver la tarea)
            tasksDIV.appendChild(taskParagraph) // para agregarle un hijo
            tasksDIV.appendChild(deleteTaskBtn)
            tasksDIV.appendChild(taskContainDIV)
        }
}

//LLamamos a la funcion definida
getTasks()
