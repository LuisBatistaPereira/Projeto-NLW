const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

//Abrir modal
buttonSearch.addEventListener("click", () => {
  modal.classList.remove("hide")
})

//Fechar modal
close.addEventListener("click", () => {
  modal.classList.add("hide")
})