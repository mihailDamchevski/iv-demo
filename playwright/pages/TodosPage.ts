import { Page } from '@playwright/test'
import { Todo, TodoEditOptions } from '../utils/types'

/**
 * Page Object Model for the Todos application.
 *
 * Encapsulates all selectors and user interactions related to managing todos,
 * including creation, editing, deletion, filtering, and test state setup.
 *
 * This abstraction allows Playwright tests to remain readable, expressive,
 * and resilient to DOM or selector changes.
 *
 * @class TodosPage
 *
 * @example
 * const todosPage = new TodosPage(page);
 * await todosPage.addTodo('Buy milk');
 * await todosPage.editTodo({
 *   todo: { title: 'Buy milk' },
 *   newTodoText: 'Buy oat milk'
 * });
 */
export default class TodosPage {

    constructor(private readonly page: Page) { }

    get input() {
        return this.page.locator('//input[@data-test="new-todo"]')
    }

    getTodoItemByText(todoText: string) {
        return this.page.locator(`//label[text()="${todoText}"]/ancestor::li`)
    }

    get todoItems() {
        return this.page.locator(`//ul[@class="todo-list"]/li`)
    }

    get toggleAll() {
        return this.page.locator(`//label[@for]`)
    }

    get clearCompleted() {
        return this.page.locator('button.clear-completed')
    }

    get filterAllButton() {
        return this.page.locator(`//a[text()='All']`)
    }

    get filterActiveButton() {
        return this.page.locator(`//a[text()='Active']`)
    }

    get filterCompletedButton() {
        return this.page.locator(`//a[text()='Completed']`)
    }

    get todoCountLabel() {
        return this.page.locator(`//span[@class="todo-count"]`)
    }

    deleteButton(todoId: string) {
        return this.page.locator(`//li[@data-id="${todoId}"]//button`)
    }

    toggleButton(todoId: string) {
        return this.page.locator(`//li[@data-id="${todoId}"]//input`)
    }

    async getTodoCountLabelText(): Promise<string> {
        return await this.todoCountLabel.innerText()
    }

    async clickToggleAllButton() {
        await this.toggleAll.click()
    }

    async deleteTodo(id: string) {
        await this.hoverOverTodoItem(id)
        return await this.deleteButton(id).click()
    }

    /**
     * Edits an existing todo item through the UI by simulating real user behavior.
     *
     * The edit flow mirrors how a user would interact with the application:
     * resolving the todo element, entering edit mode, updating the text,
     * and either saving or discarding the change.
     *
     * @async
     * @function editTodo
     *
     * @param {TodoEditOptions} options
     *   Configuration object for editing a todo.
     * @param {Object} options.todo
     *   The original todo to edit.
     * @param {string} options.todo.title
     *   Title used to locate the todo in the DOM.
     * @param {string} options.newTodoText
     *   Replacement text for the todo.
     * @param {boolean} [options.saveTodo=true]
     *   Determines whether the edit is committed (`Enter`) or cancelled (`Escape`).
     *
     * @returns {Promise<void>}
     *   Resolves once the edit interaction completes.
     *
     * @throws {Error}
     *   If the todo cannot be resolved or the edit input is not available.
     *
     * @example
     * await todosPage.editTodo({
     *   todo: { title: 'Write tests' },
     *   newTodoText: 'Write better tests',
     *   saveTodo: true
     * });
     *
     * @example
     * // Cancel an edit
     * await todosPage.editTodo({
     *   todo: { title: 'Write tests' },
     *   newTodoText: 'This will not be saved',
     *   saveTodo: false
     * });
     */
    async editTodo({ todo, newTodoText, saveTodo = true }: TodoEditOptions): Promise<void> {
        const updatedTodo = { ...todo, id: await this.getTodoIdByTitle(todo.title) }
        await this.hoverOverTodoItem(updatedTodo.id)
        const todoLabel = this.page.locator(`//li[@data-id="${updatedTodo.id}"]//label`)
        await todoLabel.dblclick()
        const editInput = this.page.locator(`//li[contains(@class, "editing")]//input[@class="edit"]`)
        await editInput.fill(newTodoText)
        saveTodo ? await editInput.press('Enter') : await editInput.press('Escape')
    }

    async getTodoTextByIndex(index: number): Promise<string> {
        return (await this.todoItems.nth(index).innerText()).trim()
    }

    async addTodo(todoText: string) {
        await this.input.fill(todoText)
        await this.input.press('Enter')
    }

    async toggleTodo(id: string) {
        await this.toggleButton(id).click()
    }

    async getTodoCount() {
        return await this.todoItems.count()
    }

    async hoverOverTodoItem(todoId: string) {
        await this.page.locator(`//li[@data-id="${todoId}"]//label`).hover()
    }

    async clearCompletedTodos() {
        await this.clearCompleted.click()
    }

    async openCompletedTodos() {
        await this.filterCompletedButton.click()
    }

    async openActiveTodos() {
        await this.filterActiveButton.click()
    }

    async getTodoIdByTitle(todoTitle: string): Promise<string> {
        return await this.getTodoItemByText(todoTitle).getAttribute('data-id') as string
    }

    /**
     * Injects todos directly into localStorage and reloads the page.
     *
     * This method bypasses UI interactions and is intended strictly for
     * deterministic test setup where application state is more important
     * than validating user flows.
     *
     * @async
     * @function injectTodosInLocalStorage
     *
     * @param {Todo[]} todos
     *   Todos to persist in localStorage before reloading the page.
     *
     * @returns {Promise<void>}
     *
     * @example
     * await todosPage.injectTodosInLocalStorage([
     *   { id: '1', title: 'Active todo', completed: false },
     *   { id: '2', title: 'Completed todo', completed: true }
     * ]);
     */
    async injectTodosInLocalStorage(todos: Array<Todo>): Promise<void> {
        await this.page.evaluate((injectedTodos) => {
            localStorage.setItem('todos-vanillajs', JSON.stringify(injectedTodos))
            location.reload()
        }, todos)
    }
}
