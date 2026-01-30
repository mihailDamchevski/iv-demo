import { expect, test } from '@playwright/test'
import { todoData, defaultTodos, MALFORMED_TODOS } from '../test-data/todo-test-data'
import TodosPage from '../pages/TodosPage'

let todosPage: TodosPage

test.describe('Todos Application Tests', () => {
    test.beforeEach(async ({ page }) => {
        todosPage = new TodosPage(page)
        await page.goto('/todo')
    })

    test('should add a new todo', async ({}) => {
        await todosPage.addTodo(todoData.THING_TO_DO)

        expect(await todosPage.getTodoTextByIndex(defaultTodos.length)).toBe(todoData.THING_TO_DO)
        expect(await todosPage.getTodoCount()).toBe(3)
        expect(await todosPage.todoCountLabel.innerText()).toBe('3 items left')
    })

    test('should delete a todo', async ({}) => {
        await todosPage.addTodo(todoData.THING_TO_DO)
        await todosPage.hoverOverTodoItem(todoData.THING_TO_DO)
        await todosPage.deleteTodo(todoData.THING_TO_DO)
        expect(await todosPage.getTodoCount()).toBe(2)
    })

    test('should delete default todos', async ({}) => {
        await todosPage.hoverOverTodoItem(defaultTodos[0])
        await todosPage.deleteTodo(defaultTodos[0])
        await todosPage.hoverOverTodoItem(defaultTodos[1])
        await todosPage.deleteTodo(defaultTodos[1])
        expect(await todosPage.getTodoCount()).toBe(0)
    })

    test('should edit an existing todo', async ({}) => {
        await todosPage.editTodo(defaultTodos[0], todoData.THING_TO_DO)
        expect(await todosPage.getTodoTextByIndex(0)).toBe(todoData.THING_TO_DO)
    })

    test('should cancel todo edit', async ({}) => {
        await todosPage.cancelEditTodo(defaultTodos[0], 'This edit will be canceled')
        expect(await todosPage.getTodoTextByIndex(0)).toBe(defaultTodos[0])
    })

    test('should move todo to completed', async ({}) => {
        await todosPage.toggleTodo(defaultTodos[0])
        await todosPage.openCompletedTodos()
        expect(await todosPage.getTodoCount()).toBe(1)
    })

    test('should return todo from completed to active', async ({}) => {
        await todosPage.toggleTodo(defaultTodos[0])
        await todosPage.openCompletedTodos()
        await todosPage.toggleTodo(defaultTodos[0])
        await todosPage.openActiveTodos()
        expect(await todosPage.getTodoCount()).toBe(2)
    })

    test('should navigate to active todos', async ({}) => {
        await todosPage.filterActiveButton.click()
        await todosPage.openActiveTodos()
        await expect(todosPage.filterActiveButton).toHaveAttribute('class', 'selected')
    })

    test('should navigate to completed todos', async ({}) => {
        await todosPage.toggleTodo(defaultTodos[0])
        await todosPage.openCompletedTodos()
        await expect(todosPage.filterCompletedButton).toHaveAttribute('class', 'selected')
    })

    test('should clear completed todos', async ({}) => {
        await todosPage.toggleTodo(defaultTodos[0])
        await todosPage.clearCompletedTodos()

        expect(await todosPage.getTodoCount()).toBe(1)
    })

    test('should select all todos', async ({}) => {
        await todosPage.clickToggleAllButton()
        await todosPage.openCompletedTodos()
        expect(await todosPage.getTodoCount()).toBe(2)
    })

    test('should persist todos after page reload', async ({ page }) => {
        await todosPage.addTodo(todoData.THING_TO_DO)
        await page.reload()
        expect(await todosPage.getTodoCount()).toBe(3)
    })

    test('should show correct items left count', async ({}) => {
        expect(await todosPage.todoCountLabel.innerText()).toBe('2 items left')
        await todosPage.addTodo(todoData.THING_TO_DO)
        expect(await todosPage.todoCountLabel.innerText()).toBe('3 items left')

        await todosPage.toggleTodo(defaultTodos[0])
        expect(await todosPage.todoCountLabel.innerText()).toBe('2 items left')
    })

    test('should not add empty todo', async ({}) => {
        await todosPage.addTodo('')
        expect(await todosPage.getTodoCount()).toBe(2)
    })

    test('should handle injected todos safely', async ({ page }) => {
        await page.goto('/todo')
        await page.evaluate((MALFORMED_TODOS) => {
            localStorage.setItem('todos-vanillajs', JSON.stringify(MALFORMED_TODOS))
            location.reload()
        }, MALFORMED_TODOS)

        expect(await todosPage.getTodoTextByIndex(0)).toBe('Injected Valid Todo')
        expect(await todosPage.getTodoCount()).toBe(2)
    })
})
