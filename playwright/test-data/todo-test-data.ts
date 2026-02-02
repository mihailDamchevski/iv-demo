import { generateRandomInt, generateRandomString } from '../utils/helpers'
import { Todo, TodoEditOptions } from '../utils/types'

const getRandomID = () => generateRandomInt(1000000000000, 9999999999999).toString();

export const testTodo: Todo = {
    title: generateRandomString(10),
    id: getRandomID(),
    completed: false,
}

export const defaultTodos: Array<Todo> = [
    { title: 'Pay electric bill', id: "", completed: false },
    { title: 'Walk the dog', id: "", completed: false }
]

export const MALFORMED_TODOS: Array<Todo> = [
    { id: getRandomID(), title: 'Injected Valid Todo', completed: false },
    { id: getRandomID(), title: '', completed: "not-a-boolean" },
]

export const editOptions: TodoEditOptions = {
    todo: defaultTodos[0],
    newTodoText: generateRandomString(10),
}

export const cancelEditOptions: TodoEditOptions = {
    todo: defaultTodos[0],
    newTodoText: generateRandomString(10),
    saveTodo: false,
}