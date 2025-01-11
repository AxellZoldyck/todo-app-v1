document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateStats();
    }

    // Initialize the theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTask = tasks.length;
    const progress = (completedTasks / totalTask) * 100;
    const progressBar = document.getElementById("progress");

    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTask}`;
};

const updateTasksList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                    <p>${task.text}</p>
                </div>
                <div class="icon">
                    <img src="./img/edit.png" onClick="editTask(${index})" />
                    <img src="./img/bin.png" onClick="deleteTask(${index})" />
                </div>
            </div>
        `;
        listItem.addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

// Theme toggle functionality
const toggleTheme = () => {
    const currentTheme = document.body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
    const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);

    // Save the selected theme in localStorage
    localStorage.setItem('theme', newTheme);

    updateThemeIcon(newTheme);
};

const updateThemeIcon = (theme) => {
    const themeIcon = document.getElementById('themeIcon');
    if (theme === 'light-theme') {
        themeIcon.src = './img/dark.png'; // Update to light mode icon
    } else {
        themeIcon.src = './img/light.png'; // Update to dark mode icon
    }
};

// Add event listener to theme toggle button
document.getElementById('themeIcon').addEventListener('click', toggleTheme);

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();

    addTask();
});
