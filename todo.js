
const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUL = document.querySelector('#todo-list');

let allTodos = getTodos();/*stores the task*/
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();/*stop the page from refreshing*/
    addTodo();
});

function addTodo() {/*add a new task*/
    const todoText = todoInput.value.trim();/*remove extra space*/
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        };
        allTodos.push(todoObject);/*a new task is added as an object with 2 properties*/
        updateTodoList();
        saveTodos();
        todoInput.value = ""/*clear input field*/
    }
}
/*displaying the todolist*/
function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {/*loop for each task and creat a list*/
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}
/* creating a todo item mean creat html for each task,eith checkbox and delete button*/
function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";
    const todoText = todo.text;
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="green">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M9 16.2l-3.5-3.5 1.41-1.41L9 13.38l7.09-7.09 1.41 1.41z" />
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="red">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M3 6h18v2H3V6zm2 3h14v12H5V9zm3 2v8h2v-8H8zm4 0v8h2v-8h-2zm4 0v8h2v-8h-2z" />
            </svg>
        </button>
    `;

    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    });

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });

    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodoItem(todoIndex) {/*delete a task and creat a new array*/
    allTodos = allTodos.filter((_, i) => i !== todoIndex); 
    saveTodos();
    updateTodoList();
}

function saveTodos() {/* save task to local storage */
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todoJson); 
}

function getTodos() {/* for retrive the task */
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
