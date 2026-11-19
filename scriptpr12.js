// Get HTML elements

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Load saved tasks from browser

let tasks = JSON.parse(
    localStorage.getItem("studentTasks")
) || [];

// Save tasks

function saveTasks() {
    localStorage.setItem(
        "studentTasks",
        JSON.stringify(tasks)
    );
}

// Display tasks

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.name;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        // Complete button

        const completeBtn = document.createElement("button");

        completeBtn.className = "complete-btn";
        completeBtn.textContent =
            task.completed ? "Undo" : "Done";

        completeBtn.addEventListener("click", () => {

            tasks[index].completed =
                !tasks[index].completed;

            saveTasks();
            displayTasks();

        });

        // Delete button

        const deleteBtn = document.createElement("button");

        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();

        });

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(actions);

        taskList.appendChild(li);

    });

    taskCount.textContent =
        "Total Tasks: " + tasks.length;
}

// Add new task

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

    saveTasks();

    displayTasks();

    taskInput.value = "";

});

// Show saved tasks when page opens

displayTasks();