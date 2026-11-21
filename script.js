const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const errorMsg = document.getElementById("error-msg");
const taskCounter = document.getElementById("task-counter");
const clearBtn = document.getElementById("clear-btn");
const emptyMsg = document.getElementById("empty-msg");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const li = document.createElement("li");
    li.classList.add("task-item");
    if (task.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      toggleTask(i);
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      deleteTask(i);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  updateCounter();
  updateEmptyMessage();
}

function addTask(event) {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    errorMsg.textContent = "Please enter a task before adding.";
    return;
  }

  errorMsg.textContent = "";
  tasks.push({ text: text, completed: false });
  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function clearAllTasks() {
  if (tasks.length === 0) {
    return;
  }
  if (confirm("Delete all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

function updateCounter() {
  const total = tasks.length;
  const done = tasks.filter(function (task) {
    return task.completed;
  }).length;

  if (total === 1) {
    taskCounter.textContent = "1 task (" + done + " completed)";
  } else {
    taskCounter.textContent = total + " tasks (" + done + " completed)";
  }
}

function updateEmptyMessage() {
  if (tasks.length === 0) {
    emptyMsg.classList.remove("hidden");
  } else {
    emptyMsg.classList.add("hidden");
  }
}

taskForm.addEventListener("submit", addTask);
clearBtn.addEventListener("click", clearAllTasks);

taskInput.addEventListener("input", function () {
  errorMsg.textContent = "";
});

renderTasks();
