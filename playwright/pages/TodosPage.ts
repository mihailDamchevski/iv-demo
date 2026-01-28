import {Page} from '@playwright/test'

const TodosPage = {
    input: 'input.new-todo',
    todoItems: 'ul.todo-list li',
    toggleAll: 'input.toggle-all',
    clearCompleted: 'button.clear-completed',

    addTodo: async (page: Page, todoText: string) => {
        await page.fill(TodosPage.input, todoText);
        await page.press(TodosPage.input, 'Enter');
    },

    getTodoCount: async (page: Page) => {
        return await page.locator(TodosPage.todoItems).count();
    },

    toggleTodo: async (page: Page, index:number) => {
        const todoItem = page.locator(TodosPage.todoItems).nth(index);
        await todoItem.locator('input.toggle').click();
    },

    clearCompletedTodos: async (page: Page) => {
        await page.click(TodosPage.clearCompleted);
    },

    seeCompletedTodos: async (page: Page) => {
        return await page.locator(`${TodosPage.todoItems}.completed`).count();
    },

    openActiveTodos: async (page: Page) => {
        return await page.locator(`${TodosPage.todoItems}.completed`).count();
    }
}