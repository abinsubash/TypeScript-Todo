import { Router } from "express";
import { Request, Response } from "express";
import {TodoStorage} from '../controller/task'
import axios from "axios";
const router= Router()

router.get('/', (req, res) => { 
    res.render('index');
});

router.get('/todos', (req, res) => {
    const todoList = TodoStorage.getTodoList();
    const todoItems = Object.entries(todoList).map(([key, value]) => ({
        id: key,
        value: value
    }));

    res.json({ todoItems }); 
});

router.post('/AddTodo', (req: Request, res: Response) => {
    const { todoItem } = req.body;
    console.log("this is todo", todoItem);

    const todoStorage = new TodoStorage(todoItem);
    todoStorage.storeTodo(todoItem);
    res.status(200).json({ id: todoStorage.getKey(), todoItem });
});

router.put("/UpdateTodo/:id", (req: Request, res: Response) => {
    const { id } = req.params; 
    const { newValue } = req.body; 
    console.log("Updating Todo with id:", id, "New value:", newValue);

    const todoList = TodoStorage.getTodoList();
    const todoId = Number(id); 
    if (todoList[todoId]) {
        todoList[todoId] = newValue; 
        res.status(200).json({ message: "Todo updated successfully" });
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
});
router.delete('/DeleteTodo/:id', (req: Request, res: Response) => {
    const todoId = req.params.id;

    try {
        TodoStorage.deleteTodo(todoId); 
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
});




export default router