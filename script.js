let addTaskButton = document.querySelector(".add__button");
let cardsContainer = document.querySelector(".cards__container");
let taskModal = document.querySelector(".task__modal");
let closeModalButton = document.querySelector(".close__modal");
let addCard = document.querySelector(".add__card");
let modalTitle = document.querySelector(".modal__title");
let activeCard = null;

addTaskButton.addEventListener("click", () => {
  //card container
  let card = document.createElement("div");
  card.classList.add("card");

  //card title container
  let cardTitle = document.createElement("div");
  cardTitle.classList.add("card__title");
  
  let title = document.createElement("h3");
  title.classList.add("title");
  title.textContent = Math.floor(Math.random() * 10);

  let img = document.createElement("img");
  img.src = "/assets/images/dots.png";

  cardTitle.appendChild(title);
  cardTitle.appendChild(img);
  
  //add card container
  let addCardContainer =  document.createElement("div");
  addCardContainer.classList.add("add__card");

  let addTaskButton = document.createElement("button");
  addTaskButton.textContent = "+";

  let addText = document.createElement("p");
  addText.textContent = "Add a card";
  
  let addedTask= document.createElement("div");
  addedTask.classList.add("added__task");
  
  let addedTaskContainer = document.createElement("div");
  addedTaskContainer.classList.add("addedTask__Container");

  addCardContainer.appendChild(addTaskButton);
  addCardContainer.appendChild(addText);

  card.appendChild(cardTitle);
  card.appendChild(addedTaskContainer);
  card.appendChild(addCardContainer);
  cardsContainer.appendChild(card);

});

closeModalButton.addEventListener("click", closeModal);
cardsContainer.addEventListener("click", (event) => {
  let addCardButton = event.target.closest(".add__card");

  if(addCardButton){
    activeCard = addCardButton.closest(".card");
    let titleText = activeCard.querySelector(".title").textContent;

    modalTitle.textContent = `Card ${titleText}`;

    showModal();
  }
});

function showModal(){
  taskModal.classList.add("show");
  taskModal.classList.remove("hidden");
}

function closeModal(){
    taskModal.classList.add("hidden");
    taskModal.classList.remove("show");
}



let taskNameInput = document.querySelector("#taskName");
let priorityInput = document.querySelector("#priority");
let addTaskModalButton = document.querySelector(".addTaskModalButton");

addTaskModalButton.addEventListener("click", (event) => {
  event.preventDefault();

  let taskName = taskNameInput.value.trim();
  let priority = priorityInput.value;

  let addedTask = document.createElement("div");
  addedTask.classList.add("added__task");
  addedTask.style.background = `${getPriorityColor(priority)}`

  let addedTaskTitle = document.createElement("p");
  addedTaskTitle.textContent = taskName;
  addedTaskTitle.classList.add("addedTask__Title");
  
  addedTask.appendChild(addedTaskTitle);

  let addedTaskContainer = activeCard.querySelector(".addedTask__Container");
  addedTaskContainer.appendChild(addedTask);

  taskNameInput.value = "";
  priorityInput.value = "low";

  closeModal();
});

function getPriorityColor(priority) {
  switch (priority) {
    case "low": return "green";
    case "medium": return "orange";
    case "high": return "red";
    default: return "gray";
  }
}












