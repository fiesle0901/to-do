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
    case "low": return "#89AC46";
    case "medium": return "#FFA725";
    case "high": return "#E50046";
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
const taskDateInput = document.querySelector("#taskDate");
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
  const taskDate = taskDateInput.value;

  if (!taskName) return; 

  const addedTask = document.createElement("div");
  addedTask.classList.add("added__task");
  addedTask.style.background = getPriorityColor(priority);

  const addedTaskTitle = document.createElement("p");
  addedTaskTitle.textContent = taskName;
  addedTaskTitle.classList.add("addedTask__Title");

  const addedTaskDate = document.createElement("span");
  addedTaskDate.textContent = taskDate;
  addedTaskDate.classList.add("addedTask__Date");

  //rename added task title
  addedTaskTitle.setAttribute("contenteditable","true");
  addedTaskTitle.addEventListener("keydown", (event) =>{
    if(event.key==="Enter"){
      event.preventDefault();
      addedTaskTitle.blur();
    }
  });
  
  addedTask.append(addedTaskTitle, addedTaskDate);

  const addedTaskContainer = activeCard.querySelector(".addedTask__Container");
  addedTaskContainer.appendChild(addedTask);

  taskNameInput.value = "";
  priorityInput.value = "low";
  taskDateInput.value = "";

  closeModal();
});

  //Delete card function
function showDeleteCard(event, card){
  event.stopPropagation();
  const deleteCard = document.createElement("div");
  deleteCard.classList.add("delete__card");

  deleteCard.textContent = "Delete card";
  deleteCard.style.top = `${event.clientY}px`;
  deleteCard.style.left = `${event.clientX}px`;

  document.querySelectorAll(".delete__card").forEach(menu => menu.remove());
  document.body.appendChild(deleteCard); 

  deleteCard.addEventListener("click", (event) => {
    card.remove();
    deleteCard.remove();
  });
  document.addEventListener("click", () => deleteCard.remove(), { once: true });
};

cardsContainer.addEventListener("click", (event) => {
    const dots = event.target.closest(".card__title img");

    if(dots){
      const card = event.target.closest(".card");
      showDeleteCard(event, card);
    }
});





