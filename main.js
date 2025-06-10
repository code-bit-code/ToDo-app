const task_container = document.querySelector("#task-container");
const btn = document.querySelector("button");
const input_field = document.querySelector("input");

window.addEventListener('DOMContentLoaded', function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDom(task))

})
class Task {
  constructor(text) {
    this.id = Date.now();
    this.text = text;
    this.isCompleted = false;
  }
}
const arrayOfTasks = [];

btn.addEventListener('click', function () {
  
  if (input_field.value.trim() !== "" && arrayOfTasks.length < 10) {

    const task = new Task(input_field.value);
    addTaskToDom(task)
    addTaskToDatabase(task);
    input_field.value = "";
  }
  else if (arrayOfTasks.length == 10) {
    alert("You've reached the maximun limit");
  }
  else {
    alert("add a new task")
  }
})


function addTaskToDatabase(task) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function addTaskToDom(task) {
  const li = document.createElement("li");
  li.classList.add("pb-2", "mb-2");
  li.innerHTML = `<span class="${task.isCompleted ? "line-through font-mono" : "font-mono"}"> ${task.text}</span>
        <div class = "functions" >
        <i class="fa-solid text-green-400 text-2xl fa-circle-check"></i> <i class = "fa-solid text-2xl fa-trash text-red-400" > </i> </div>`;
  arrayOfTasks.push(task);
  task_container.appendChild(li);

  const check = li.querySelector(".fa-circle-check");
  const trash = li.querySelector(".fa-trash");

  check.addEventListener('click', function () {
    markAsDone(task.id);
  })

  trash.addEventListener('click', function () {
    removeItem(task.id);
  })
}

function markAsDone(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks"))|| [];
  tasks.forEach(function (task) {
    if (task.id == id) {
      task.isCompleted = true;

    }
   
  })
localStorage.setItem("tasks",JSON.stringify(tasks));
location.reload();
}

function removeItem(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updated_tasks = tasks.filter(task => task.id !== id);
  localStorage.clear()
  localStorage.setItem("tasks", JSON.stringify(updated_tasks));
  location.reload();
}