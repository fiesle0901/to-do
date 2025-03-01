function showModal() {
  taskModal.classList.add("show");
  taskModal.classList.remove("hidden");
}

function closeModal() {
  taskModal.classList.add("hidden");
  taskModal.classList.remove("show");
}

function getPriorityColor(priority) {
  switch (priority) {
    case "low": return "green";
    case "medium": return "orange";
    case "high": return "red";
    default: return "gray";
  }
}

const addTaskButton = document.querySelector(".add__button");
const cardsContainer = document.querySelector(".cards__container");
const taskModal = document.querySelector(".task__modal");
const closeModalButton = document.querySelector(".close__modal");
const modalTitle = document.querySelector(".modal__title");
const taskNameInput = document.querySelector("#taskName");
const priorityInput = document.querySelector("#priority");
const addTaskModalButton = document.querySelector(".addTaskModalButton");
let activeCard = null;

addTaskButton.addEventListener("click", () => {
  // Create card container
  const card = document.createElement("div");
  card.classList.add("card");

  // Create card title container
  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card__title");

  const title = document.createElement("h3");
  title.classList.add("title");
  title.textContent = Math.floor(Math.random() * 10);

  const img = document.createElement("img");
  img.src = "/assets/images/dots.png";

  cardTitle.append(title, img);

  // Create add card container
  const addCardContainer = document.createElement("div");
  addCardContainer.classList.add("add__card");

  const addCardButton = document.createElement("button");
  addCardButton.textContent = "+";
  const addText = document.createElement("p");
  addText.textContent = "Add a card";
  
  addCardContainer.append(addCardButton, addText);

  // Create task container
  const addedTaskContainer = document.createElement("div");
  addedTaskContainer.classList.add("addedTask__Container");

  card.append(cardTitle, addedTaskContainer, addCardContainer);
  cardsContainer.appendChild(card);
});

closeModalButton.addEventListener("click", closeModal);

cardsContainer.addEventListener("click", (event) => {
  const addCardButton = event.target.closest(".add__card");

  if (addCardButton) {
    activeCard = addCardButton.closest(".card");
    const titleText = activeCard.querySelector(".title").textContent;
    modalTitle.textContent = `Card ${titleText}`;
    showModal();
  }
});

addTaskModalButton.addEventListener("click", (event) => {
  event.preventDefault();

  const taskName = taskNameInput.value.trim();
  const priority = priorityInput.value;

  if (!taskName) return; 

  const addedTask = document.createElement("div");
  addedTask.classList.add("added__task");
  addedTask.style.background = getPriorityColor(priority);

  const addedTaskTitle = document.createElement("p");
  addedTaskTitle.textContent = taskName;
  addedTaskTitle.classList.add("addedTask__Title");
  
  addedTask.appendChild(addedTaskTitle);

  const addedTaskContainer = activeCard.querySelector(".addedTask__Container");
  addedTaskContainer.appendChild(addedTask);

  taskNameInput.value = "";
  priorityInput.value = "low";

  closeModal();
});












