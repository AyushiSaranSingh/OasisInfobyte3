
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    const task = createTask(text);
    pendingList.appendChild(task);
    taskInput.value = "";
  }
});

function createTask(text, isCompleted = false, createdAt = new Date()) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  if (isCompleted) li.classList.add("complete");

  const taskDetails = document.createElement("div");
  taskDetails.className = "task-details";

  const taskText = document.createElement("span");
  taskText.textContent = text;

  const timeStamp = document.createElement("div");
  timeStamp.className = "task-time";
  timeStamp.textContent = `Added: ${createdAt.toLocaleString()}`;

  taskDetails.appendChild(taskText);
  taskDetails.appendChild(timeStamp);

  const actions = document.createElement("div");
  actions.className = "actions";

  // Edit Button
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.classList.add("edit-btn");
  editBtn.onclick = () => {
    const newText = prompt("Edit your task:", taskText.textContent);
    if (newText !== null && newText.trim() !== "") {
      taskText.textContent = newText.trim();
    }
  };

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => li.remove();

  // Complete Button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = isCompleted ? "↩️" : "✅";
  completeBtn.classList.add("complete-btn");
  completeBtn.onclick = () => {
    li.remove();
    const movedTask = createTask(taskText.textContent, !isCompleted, createdAt);
    if (!isCompleted) {
      completedList.appendChild(movedTask);
    } else {
      pendingList.appendChild(movedTask);
    }
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  actions.appendChild(completeBtn);

  li.appendChild(taskDetails);
  li.appendChild(actions);

  return li;
}
