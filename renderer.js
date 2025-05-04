const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task-input');

const defaultTasks = [
  { text: "Wake up early 🐥", done: false },
  { text: "Drink a coffee + skincare ☕", done: false },
  { text: "Read Journal 📖", done: false },
  { text: "Take cool bath 🛁🦢", done: false }
];

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks || tasks.length === 0) {
    localStorage.setItem('tasks', JSON.stringify(defaultTasks));
    tasks = defaultTasks;
  }

  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('fade-in');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleTask(index));

    const span = document.createElement('span');
    span.textContent = task.text;

    if (task.done) li.classList.add('completed');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    const leftSide = document.createElement('div');
    leftSide.style.display = 'flex';
    leftSide.style.alignItems = 'center';
    leftSide.appendChild(checkbox);
    leftSide.appendChild(span);

    li.appendChild(leftSide);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks[index].done = !tasks[index].done;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

newTaskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && newTaskInput.value.trim()) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push({ text: newTaskInput.value.trim(), done: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    newTaskInput.value = '';
    loadTasks();
  }
});

window.addEventListener('DOMContentLoaded', loadTasks);
