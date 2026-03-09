const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(){

taskList.innerHTML="";

tasks
.filter(task => {

if(filter==="completed") return task.completed;
if(filter==="pending") return !task.completed;
return true;

})
.filter(task => 
task.text.toLowerCase().includes(searchTask.value.toLowerCase())
)

.forEach((task,index)=>{

const li=document.createElement("li");

li.draggable=true;

li.innerHTML=`

<div>

<input type="checkbox"
${task.completed ? "checked":""}
onclick="toggleComplete(${index})">

<span class="${task.completed ? "completed":""}">
${task.text}
</span>

<br>

<small class="priority-${task.priority.toLowerCase()}">
Priority: ${task.priority}
</small>

<br>

<small>Due: ${task.date || "None"}</small>

</div>

<div>

<button onclick="editTask(${index})">Edit</button>
<button onclick="deleteTask(${index})">Delete</button>

</div>

`;

taskList.appendChild(li);

});

}

function addTask(){

const text=taskInput.value.trim();

if(text==="") return;

tasks.push({
text:text,
priority:priority.value,
date:dueDate.value,
completed:false
});

saveTasks();
displayTasks();

taskInput.value="";
dueDate.value="";
}

function deleteTask(index){

tasks.splice(index,1);

saveTasks();
displayTasks();

}

function editTask(index){

const newText=prompt("Edit task:",tasks[index].text);

if(newText){
tasks[index].text=newText;
saveTasks();
displayTasks();
}

}

function toggleComplete(index){

tasks[index].completed=!tasks[index].completed;

saveTasks();
displayTasks();

}

function filterTasks(type){

filter=type;

displayTasks();

}

searchTask.addEventListener("input", displayTasks);

displayTasks();
