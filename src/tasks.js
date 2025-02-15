import variable from "./variable.js";

// открытие бургер-меню
document.addEventListener("DOMContentLoaded", () => {
  const burgerInput = document.querySelector(".burger input");
  const droppedList = document.querySelector(".droppedList");

  burgerInput.addEventListener("change", () => {
    if (burgerInput.checked) {
      droppedList.style.transform = "translateX(0)";
    } else {
      droppedList.style.transform = "translateX(-100%)";
    }
  });
});

let tasks = [];
let doneTasks = [];
//! Работа с localStorage

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);

    tasks.forEach((task) => createTaskElement(task));
  }

  loadCompletedTasks();
}

function loadCompletedTasks() {
  const storedDoneTasks = localStorage.getItem("doneTasks");
  if (storedDoneTasks) {
    doneTasks = JSON.parse(storedDoneTasks);
    variable.finishedTasks.innerHTML = "";
    doneTasks.forEach((task) => createCompletedTaskElement(task));
  }
}

function createCompletedTaskElement(task) {
  const taskComponent = `
    <div class="exampleTask" data-id="${task.id}">
      <div class="taskShortInfo">
        <h2>${task.title}</h2>
        <span class="shortText">${task.text}</span>
  
      </div>
      <div class="verticalPart">
      
        <img src="./public/images/DALL·E 2025-01-30 22.05.38 - A simple digital illustration representing unfinished tasks. The image features a to-do list with unchecked boxes and a clock indicating urgency. The .webp" alt="">
        <button id="deleteDoneTask">Delete</button>
      </div>
      </div>
  `;

  variable.finishedTasks.insertAdjacentHTML("afterbegin", taskComponent);

  const deleteDoneTask = document.getElementById("deleteDoneTask");
  deleteDoneTask.addEventListener("click", deleteDoneTask);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//! Открытие меню для создания Taskов
variable.toDoAddTask.addEventListener("click", () => {
  variable.popUp.style.display = "flex";
});

variable.goBackButton.addEventListener("click", () => {
  variable.popUp.style.display = "none";
});

//! Функция создания Task
function createTaskElement(task) {
  const taskComponent = `
    <div class="exampleTask" data-id="${task.id}">
      <div class="taskShortInfo">
        <h2>${task.title}</h2>
        <span class="shortText">${task.text}</span>
      </div>
      <img src="./public/images/DALL·E 2025-01-30 22.05.38 - A simple digital illustration representing unfinished tasks. The image features a to-do list with unchecked boxes and a clock indicating urgency. The .webp" alt="">
    </div>
  `;
  variable.sectionToDo.insertAdjacentHTML("beforeend", taskComponent);
}

function deleteDoneTask(event) {
  const taskElement = event.target.closest(".exampleTask");
  if (taskElement) {
    const taskId = taskElement.dataset.id;
    doneTasks = doneTasks.filter((task) => task.id !== taskId);
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
    taskElement.remove();
    loadCompletedTasks();
  }
}

//! Обработка создания task
variable.doneButton.addEventListener("click", () => {
  const taskTitle = variable.titleInput.value.trim();
  const taskText = variable.descriptionArea.value.trim();

  if (!taskText || !taskTitle) {
    return alert("Ой, похоже что вы забыли создать задачу ( ´•︵• )");
  }

  const id = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  const newTask = {
    id,
    title: taskTitle,
    text: taskText,
  };

  tasks.push(newTask);
  createTaskElement(newTask);
  saveTasks();

  variable.titleInput.value = "";
  variable.descriptionArea.value = "";
  variable.popUp.style.display = "none";
});

document.addEventListener("DOMContentLoaded", loadTasks);

export default tasks;
