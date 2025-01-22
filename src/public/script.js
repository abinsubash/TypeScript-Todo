const api = "http://localhost:3000/";

function submitFn() {
    const todoItem = document.getElementById('input').value;
    if (todoItem.trim() === "") {
        alert("Please enter a valid to-do item.");
        return;
    }
    axios.post(api + "AddTodo", { todoItem })
        .then(response => {
            console.log("Todo added:", response.data);
            const { todoItem: addedItem, id } = response.data;
            console.log("Prev",response.data)
            document.getElementById('input').value = ''; 
            addTodoToList(addedItem, id);
        })
        .catch(error => {
            console.error("Error adding todo:", error);
            alert("Failed to add todo.");
        });
}

function addTodoToList(todoItem, todoId) {
    console.log("one",todoItem)
    const todoListContainer = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.setAttribute('data-id', todoId);
    li.innerHTML = `
        <span class="todo-text">${todoItem}</span>
        <button class="edit-btn" onclick="editTodoItem(${todoId})">Edit</button>
        <button class="delete-btn" onclick="deleteTodoItem(${todoId})">Delete</button>
    `;
    todoListContainer.appendChild(li);
}

function editTodoItem(todoId) {
    const li = document.querySelector(`li[data-id='${todoId}']`);
    const todoText = li.querySelector('.todo-text').textContent;

    li.innerHTML = `
        <input class="edit-input" type="text" value="${todoText}" />
        <button class="save-btn" onclick="saveTodoItem(${todoId})">Save</button>
        <button class="cancel-btn" onclick="cancelEdit(${todoId}, '${todoText}')">Cancel</button>
    `;
}

function cancelEdit(todoId, todoText) {
    const li = document.querySelector(`li[data-id='${todoId}']`);
    li.innerHTML = `
        <span class="todo-text">${todoText}</span>
        <button class="edit-btn" onclick="editTodoItem(${todoId})">Edit</button>
        <button class="delete-btn" onclick="deleteTodoItem(${todoId})">Delete</button>
    `;
}

function saveTodoItem(todoId) {
    const li = document.querySelector(`li[data-id='${todoId}']`);
    const newValue = li.querySelector('.edit-input').value.trim();

    if (!newValue) {
        alert("Todo item cannot be empty.");
        return;
    }
    console.log("pooda",newValue)

    axios.put(api + `UpdateTodo/${todoId}`, { newValue })
        .then(() => {
            li.innerHTML = `
                <span class="todo-text">${newValue}</span>
                <button class="edit-btn" onclick="editTodoItem(${todoId})">Edit</button>
                <button class="delete-btn" onclick="deleteTodoItem(${todoId})">Delete</button>
            `;
        })
        .catch(error => {
            console.error("Error updating todo:", error);
            alert("Failed to update todo.");
        });
}

function deleteTodoItem(todoId) {
    axios.delete(api + `DeleteTodo/${todoId}`)
        .then(() => {
            const li = document.querySelector(`li[data-id='${todoId}']`);
            li.remove();
        })
        .catch(error => {
            console.error("Error deleting todo:", error);
            alert("Failed to delete todo.");
        });
}

function fetchTodos() {
    axios.get(api + 'todos')
        .then(response => {
            const todoItems = response.data.todoItems;
            const todoListContainer = document.getElementById('todo-list');
            todoListContainer.innerHTML = "";
            todoItems.forEach(todo => {
                addTodoToList(todo.value, todo.id);
            });
        })
        .catch(error => {
            console.error("Error fetching todos:", error);
            alert("Failed to load todos.");
        });
}

window.onload = fetchTodos;
