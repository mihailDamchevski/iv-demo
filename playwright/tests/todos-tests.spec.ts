import { expect, test } from '@playwright/test'
import { defaultTodos, MALFORMED_TODOS, editOptions, cancelEditOptions, testTodo } from '../test-data/todo-test-data'
import { formatItemsLeftLabel } from '../utils/helpers'
import TodosPage from '../pages/TodosPage'

let todosPage: TodosPage

test.describe('Todos Application Tests', () => {
    test.beforeEach(async ({ page }) => {
        todosPage = new TodosPage(page)
        await page.goto('/todo')
    })

    test('should add a new todo', async ({ }) => {
        await todosPage.addTodo(testTodo.title)

        expect(await todosPage.getTodoTextByIndex(defaultTodos.length)).toBe(testTodo.title)
        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(3))
    })

    test('should delete a todo', async ({ }) => {
        await todosPage.injectTodosInLocalStorage([testTodo]);

        await todosPage.deleteTodo(testTodo.id)

        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(0))
    })

    test('should delete default todos', async ({ }) => {
        await todosPage.deleteTodo(await todosPage.getTodoIdByTitle(defaultTodos[0].title))
        await todosPage.deleteTodo(await todosPage.getTodoIdByTitle(defaultTodos[1].title))

        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(0))
    })

    test('should edit an existing todo', async ({ }) => {
        await todosPage.editTodo(editOptions);

        expect(await todosPage.getTodoTextByIndex(0)).toBe(editOptions.newTodoText)
    })

    test('should cancel todo edit', async ({ }) => {
        await todosPage.editTodo(cancelEditOptions);

        expect(await todosPage.getTodoTextByIndex(0)).toBe(defaultTodos[0].title)
    })

    test('should move todo to completed', async ({ }) => {
        await todosPage.toggleTodo(await todosPage.getTodoIdByTitle(defaultTodos[0].title))

        await todosPage.openCompletedTodos()

        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(1))
    })

    test('should return todo from completed to active', async ({ }) => {
        await todosPage.toggleTodo(await todosPage.getTodoIdByTitle(defaultTodos[0].title))
        await todosPage.openCompletedTodos()
        await todosPage.toggleTodo(await todosPage.getTodoIdByTitle(defaultTodos[0].title))
        await todosPage.openActiveTodos()

        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(2))
    })

    test('should navigate to active todos', async ({ }) => {
        await todosPage.openActiveTodos()

        await expect(todosPage.filterActiveButton).toHaveAttribute('class', 'selected')
    })

    test('should navigate to completed todos', async ({ }) => {
        await todosPage.openCompletedTodos()

        await expect(todosPage.filterCompletedButton).toHaveAttribute('class', 'selected')
    })

    test('should clear 1 completed todo', async ({ }) => {
        await todosPage.toggleTodo(await todosPage.getTodoIdByTitle(defaultTodos[0].title))

        await todosPage.clearCompletedTodos()

        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(1))
    })

    test('should select all todos', async ({ }) => {
        await todosPage.clickToggleAllButton()
        await todosPage.openCompletedTodos()

        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(0))
    })

    test('should persist todos after page reload', async ({ page }) => {
        await todosPage.addTodo(testTodo.title)
        await page.reload()

        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(3))
    })

    test(`should show correct 'items left count'`, async ({ }) => {
        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(2))

        await todosPage.addTodo(testTodo.title)

        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(3))

        await todosPage.toggleTodo(await todosPage.getTodoIdByTitle(defaultTodos[0].title))

        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(2))
    })

    test('should not add empty todo', async ({ }) => {
        await todosPage.addTodo('')

        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(2))
    })

    test('should handle injected todos safely', async ({}) => {
        await todosPage.injectTodosInLocalStorage(MALFORMED_TODOS);

        expect(await todosPage.getTodoTextByIndex(0)).toBe(MALFORMED_TODOS[0].title)
        expect(await todosPage.getTodoCountLabelText()).toBe(formatItemsLeftLabel(1))
    })
})
