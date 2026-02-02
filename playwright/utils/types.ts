export interface TodoEditOptions {
    saveTodo?: boolean ;
    todo: Todo, 
    newTodoText: string,
};


export interface Todo {
    id: string;
    title: string;
    completed: boolean | unknown;
}