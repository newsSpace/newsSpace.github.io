const modalParents = document.getElementById("modalParents")
const modal = document.getElementById("modal")
const modalArrow = modal.children[0].children[1]

modalArrow.addEventListener("click", () => {
    modal.classList.add("hidden")
    modalParents.classList.add("hidden")
})


modalParents.addEventListener("click", () => {
    modal.classList.add("hidden")
    modalParents.classList.add("hidden")
})