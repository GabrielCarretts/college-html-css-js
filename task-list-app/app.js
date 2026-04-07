const themeButton = document.querySelector('.theme-btn');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const pendingTasks = document.getElementById('pendingTasks');

// Theme switch //
themeButton.addEventListener('click', function () {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('light-theme')) {
        this.textContent = 'Dark';
    } else {
        this.textContent = 'Light';
    }
});

// Add task //
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }

    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-actions">
            <button class="small-btn toggle-btn" type="button">Done</button>
            <button class="small-btn delete-btn" type="button">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
    taskInput.value = '';

    updateStats();
});

// Task actions //
taskList.addEventListener('click', function (event) {
    const clickedElement = event.target;
    const taskItem = clickedElement.closest('.task-item');

    if (!taskItem) {
        return;
    }

    if (clickedElement.classList.contains('toggle-btn')) {
        taskItem.classList.toggle('done');

        if (taskItem.classList.contains('done')) {
            clickedElement.textContent = 'Undo';
        } else {
            clickedElement.textContent = 'Done';
        }
    }

    if (clickedElement.classList.contains('delete-btn')) {
        taskItem.remove();
    }

    updateStats();
});

/* Update progress counters */
function updateStats() {
    const allTasks = document.querySelectorAll('.task-item');
    const doneTasks = document.querySelectorAll('.task-item.done');
    const pending = allTasks.length - doneTasks.length;

    totalTasks.textContent = allTasks.length;
    completedTasks.textContent = doneTasks.length;
    pendingTasks.textContent = pending;
}

// Initial count //
updateStats();