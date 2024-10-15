
document.addEventListener("DOMContentLoaded", () => {
  //Write your code here
  const taskList = new TaskList();
 
  const newTaskForm = document.getElementById("create-task-form");
  const newTaskDescription = document.getElementById("new-task-description");
  const newTaskPriority = document.getElementById("task-priority");

  const taskUl = document.getElementById("tasks");

  const renderApp = () => (taskUl.innerHTML = taskList.renderTasks());

  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = newTaskDescription.value;
    const priority = newTaskPriority.value;

    taskList.createNewTask(description, priority);
   
    e.target.reset();
    renderApp();
  });

  taskUl.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      taskList.deleteTask(e.target.dataset.description);
      renderApp();
    }
  });
});
class Task {
  constructor(description, priority) {
    this.description = description;
    this.priority = priority;
  }

  render() {
    return `
      <li style="color: ${setPriorityColor(this.priority)};">
        ${this.description}
        <button data-description="${this.description}">X</button>
      </li>
      `;
  }
}
class TaskList {
  constructor() {
    this.tasks = [];
  }

  createNewTask(description, priority) {
    const newTask = new Task(description, priority);
    this.tasks.push(newTask);
  }

  renderTasks() {
    return this.tasks.map((task) => task.render()).join("");
  }

  deleteTask(description) {
    this.tasks = this.tasks.filter((task) => task.description !== description);
  }
}
function setPriorityColor(priority) {
  switch (priority.toLowerCase()) {
    case 'low':
      return 'green';
      case 'medium':
        return 'orange';
        case 'high':
          return 'red';
          default:
            return 'black';
  }
}



