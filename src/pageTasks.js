import variable from "./variable.js";

let doneTasks = [];
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

variable.taskFullInfo.style.display = "none";

let currentTaskId = null;

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  variable.shortTaskList.innerHTML =
    '<p class="shortHeaderListTask">My Tasks</p>';
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    if (tasks.length > 0) {
      tasks.forEach((task) => createTaskElement(task));
      variable.myTaskShortArticle.style.display = "flex";
    } else {
      hideTaskArticle();
    }
  } else {
    hideTaskArticle();
  }
}

function hideTaskArticle() {
  variable.myTaskShortArticle.style.display = "none";
  variable.taskFullInfo.innerHTML = "";
}

function createTaskElement(task) {
  const taskComponent =
    /*html*/
    `
      <div class="exampleTask" data-id="${task.id}">
        <div class="taskShortInfo">
          <h2 id="exampleTaskHeader">${task.title}</h2>
          <span class="shortText">${task.text}</span>
        </div>
        <img src="../public/images/DALL·E\ 2025-01-30\ 22.05.38\ -\ A\ simple\ digital\ illustration\ representing\ unfinished\ tasks.\ The\ image\ features\ a\ to-do\ list\ with\ unchecked\ boxes\ and\ a\ clock\ indicating\ urgency.\ The\ .webp" alt="Task illustration">
      </div>
    `;
  variable.shortTaskList.insertAdjacentHTML("beforeend", taskComponent);
}

function createFullTaskComponent(task) {
  const fullTaskComponent =
    /*html*/
    `
      <div class="fullComponent">
        <img src="../public/images/DALL·E\ 2025-01-30\ 22.05.38\ -\ A\ simple\ digital\ illustration\ representing\ unfinished\ tasks.\ The\ image\ features\ a\ to-do\ list\ with\ unchecked\ boxes\ and\ a\ clock\ indicating\ urgency.\ The\ .webp" alt="Task illustration"/>
        <h1 id="fullTaskHeader">${task.title}</h1>
      </div>
      <p id="taskDescriptionParagraph">
        <b>TASK DESCRIPTION:</b> <br />
        ${task.text}
      </p>
      <textarea id="changeTaskValue" placeholder="Edit your task"></textarea>
      <div class="taskButtons">
       <img src="../public/svg/Component 3.svg" alt="" id="buttonEditTask"/>
        <img src="../public/svg/Group 87.svg" alt="" id="buttonDoneTask"/>
        <img src="../public/svg/Group 86.svg" alt="" id="buttonDeleteTask"/>
      </div>
    `;
  variable.taskFullInfo.innerHTML = fullTaskComponent;
  currentTaskId = task.id;

  const buttonDeleteTask = document.getElementById("buttonDeleteTask");
  buttonDeleteTask.addEventListener("click", deleteTask);

  const buttonEditTask = document.getElementById("buttonEditTask");
  buttonEditTask.addEventListener("click", editTask);

  const buttonDoneTask = document.getElementById("buttonDoneTask");
  buttonDoneTask.addEventListener("click", addDoneTask);
}

function deleteTask() {
  if (currentTaskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter((task) => task.id !== currentTaskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
    currentTaskId = null;
  }
}

function editTask() {
  if (currentTaskId) {
    const taskDescriptionParagraph = document.getElementById(
      "taskDescriptionParagraph"
    );
    const changeTaskValue = document.getElementById("changeTaskValue");

    if (!taskDescriptionParagraph || !changeTaskValue) {
      console.error("Required elements not found");
      return;
    }

    taskDescriptionParagraph.style.display = "none";
    changeTaskValue.style.display = "flex";

    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let task = tasks.find((t) => t.id === currentTaskId);

    if (task) {
      changeTaskValue.value = task.text;

      changeTaskValue.addEventListener(
        "blur",
        () => {
          task.text = changeTaskValue.value;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          taskDescriptionParagraph.textContent = task.text;
          taskDescriptionParagraph.style.display = "block";
          changeTaskValue.style.display = "none";
          loadTasks();
        },
        { once: true }
      );
    }
  }
}

function addDoneTask() {
  if (currentTaskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let doneTasks = JSON.parse(localStorage.getItem("doneTasks") || "[]");

    const taskIndex = tasks.findIndex((task) => task.id === currentTaskId);

    if (taskIndex !== -1) {
      const completedTask = tasks[taskIndex];
      doneTasks.push(completedTask);
      tasks.splice(taskIndex, 1);

      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("doneTasks", JSON.stringify(doneTasks));

      loadTasks();
      variable.taskFullInfo.style.display = "none";
    }
  }
}

variable.shortTaskList.addEventListener("click", (event) => {
  variable.taskFullInfo.style.display = "flex";
  const taskElement = event.target.closest(".exampleTask");
  const windowWidth = window.innerWidth;
  if (windowWidth <= 1430) {
    variable.myTaskShortArticle.style.flexDirection = "column";
  }

  if (taskElement) {
    const taskId = taskElement.dataset.id;
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const selectedTask = tasks.find((task) => task.id === taskId);

    if (selectedTask) {
      addDoneTask();
      createFullTaskComponent(selectedTask);
    }
  }
});

loadTasks();

export default loadTasks;
