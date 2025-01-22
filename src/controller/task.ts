export class TodoStorage {
    private key: number;
    private item: { key: number; value: string };
    private static todoList: { [key: number]: string } = {};

    constructor(value: string) {
        this.key = this.generateKey();
        this.item = { key: this.key, value };
    }

    generateKey(): number {
        return Date.now(); 
    }
    storeTodo(todoItem: string): void {
        TodoStorage.todoList[this.key] = todoItem;
    }

    static getTodoList(): { [key: number]: string } {
        return TodoStorage.todoList;
    }
    static updateTodoList(id: number, newValue: string):void{
        if (TodoStorage.todoList[id]) {
            TodoStorage.todoList[id] = newValue;  
        }
    }
    getKey(): number {
        return this.key;
    }
    static deleteTodo(todoId: string): void {
        const key = Number(todoId); 
        if (TodoStorage.todoList.hasOwnProperty(key)) {
            delete TodoStorage.todoList[key];
        } else {
            throw new Error("Todo not found");
        }
    }
    
    
}
