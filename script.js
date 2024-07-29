document.addEventListener('DOMContentLoaded', loadtodos);
const todoform= document.getElementById('todo-form');
const todoInput= document.getElementById('todo-input');
const todoList= document.getElementById('todo-list');

todoform.addEventListener('submit', function(event) {
event.preventDefault();
addTodo(todoInput.value);
todoInput.value='';
});

function addTodo(todoText){
    const todoItem= document.createElement('li');
    todoItem.innerHTML=`
    ${todoText}
    <button class="delete"> Delete </button>
    `;
    todoList.appendChild(todoItem);
    saveTodos();
}
todoList.addEventListener('click', function(event){
if(event.target.classList.contains('delete')){
    event.target.parentElement.remove();
    saveTodos();
} else{
    event.target.classList.toggle('completed');
    saveTodos();
}
});

function saveTodos(){
    const todos=[];
    document.querySelectorAll('#todo-list li').forEach(todo => {
        todo.push({
         text: todo.childNodes[0].nodeValue.trim(),
         completed: todo.classList.contains('completed')
        });
    });
    localStoarage.setItem('todos', JSON.stringify(todos));
}
 function loadtodos(){
    const todos= JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo=> {
    const todoItem= document.createElement('li');
    todoItem.innerHTML= `
    ${todo.text}
    <button class= "delete"> delete </delete>
    `;
    if(todo.completed){
        todoItem.classList.add('completed');
    }
    todoList.appendChild(todoItem);
    });
 }
