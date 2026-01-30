import { generateRandomString } from '../utils/helpers'

export const todoData = {
    THING_TO_DO: generateRandomString(10),
}
export const defaultTodos = ['Pay electric bill', 'Walk the dog']

export const MALFORMED_TODOS = [
    { id: 1, title: 'Injected Valid Todo', completed: false },
    { id: 2, title: '', completed: "not-a-boolean" },
]
