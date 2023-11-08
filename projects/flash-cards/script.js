const header = document.querySelector(".header");
const cardCreator = document.querySelector(".card-creator");
const cardWrapper = document.querySelector(".card-wrapper");

const questionInput = document.querySelector("#question-input");
const awnserInput = document.querySelector("#awnser-input");


function handleCardCreatorEvents(event) {
    eventTarget = event.target;
    if (eventTarget.id === "close-button") {
        cardCreator.style.display = "none";
    }

    else if (eventTarget.id === "save-button") {
        createCart()
    }
}


function handleHeaderEvents(event) {
    eventTarget = event.target;
    if (eventTarget.id === "make-card-button") {
        cardCreator.style.display = "block";
    }

    else if (eventTarget.id === "delete-cards-button") {
        deleteCards()
    }
}


function createCart() {
    let cardElement = document.createElement("div");
    let cardQuestion = document.createElement("p");
    let cardAwnser = document.createElement("p");

    cardElement.classList.add("card");
    cardQuestion.classList.add("card__question");
    cardAwnser.classList.add("card__awnser");

    cardQuestion.innerText = questionInput.value;
    cardAwnser.innerText = awnserInput.value;
    cardAwnser.classList.add("hidden");

    cardElement.appendChild(cardQuestion)
    cardElement.appendChild(cardAwnser)

    // toggle awnser visibility by clicking the card
    cardElement.addEventListener("click", () => {
        cardAwnser.classList.toggle("hidden");
    })

    cardWrapper.appendChild(cardElement);

}


function deleteCards() {
    while (cardWrapper.firstChild) {
        cardWrapper.removeChild(cardWrapper.firstChild)
    }
}


header.addEventListener("click", handleHeaderEvents);
cardCreator.addEventListener("click", handleCardCreatorEvents);


