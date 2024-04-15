//Obtener elementos del HTML y guardarlos en constantes
const form = document.querySelector("form")
const inputEmail = document.querySelector("#email")
const inputCode = document.querySelector("#code")
const codeBtn = document.querySelector("#codeBtn")

const baseBackendUrl = `${window.origin}/api`

//Nutrir de funcionalidad a los botones
codeBtn.addEventListener("click", async function (e) {
    console.log("Pidiendo codigo.......")
    const res = await fetch(`${baseBackendUrl}/auth/login/${inputEmail.value}`, {
        method: "POST",
        headers: {"content-Type":"application/json"},
        body: JSON.stringify({ code: inputCode.value })
    })
    const resJSON = await res.json()
    console.log({ resJSON })
})

form.addEventListener("submit", async function (e) {
    e.preventDefault() //para que no se refresque la pagina
    console.log("Intentando iniciar sesion....")
    
    const res = await fetch(`${baseBackendUrl}/auth/login/${inputEmail.value}`,
    {
        method: "POST",
        headers: {"content-Type":"application/json"},
        body: JSON.stringify({ code: inputCode.value }),
    })
    const resJSON = await res.json()
    window.location.href = "/"
    console.log({ resJSON })
})