const taskInput = document.getElementById('taskInput');
const addTaskDiv = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => createTaskElement(task.text, task.completed));
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const completed = li.classList.contains('checked');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li');
  if (completed) li.classList.add('checked');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', () => {
    li.classList.toggle('checked');
    saveTasks();
  });

  const span = document.createElement('span');
  span.textContent = taskText;

  li.appendChild(checkbox);
  li.appendChild(span);
  taskList.appendChild(li);
  saveTasks();
}

addTaskDiv.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    createTaskElement(taskText);
    taskInput.value = '';
  }
});
