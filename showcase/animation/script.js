const animationButton = document.querySelector(".animation-toggle-button");
const iframe = document.querySelector(".container__iframe");


animationButton.addEventListener("click", e => {
    iframe.classList.toggle("pause-animation")
})