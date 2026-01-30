import { Page } from '@playwright/test'

export default class TodosPage {
    constructor(private readonly page: Page) {}

    get input() {
        return this.page.locator('//input[@data-test="new-todo"]')
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

    deleteButton(todoText: string) {
        return this.page.locator(
            `//label[text()="${todoText}"]/following-sibling::button[@class="destroy todo-button"]`,
        )
    }

    toggleButton(todoText: string) {
        return this.page.locator(`//label[text()="${todoText}"]/preceding-sibling::input[@class="toggle"]`)
    }

    async getTodoCountLabelText(): Promise<string> {
        return await this.todoCountLabel.innerText()
    }

    async cancelEditTodo(todoText: string, newTodoText: string) {
        await this.hoverOverTodoItem(todoText)
        const todoLabel = this.page.locator(`//label[text()="${todoText}"]`)
        await todoLabel.dblclick()
        const editInput = this.page.locator(`//li[contains(@class, "editing")]//input[@class="edit"]`)
        await editInput.fill(newTodoText)
        return await editInput.press('Escape')
    }

    async clickToggleAllButton() {
        await this.toggleAll.click()
    }

    async deleteTodo(todoText: string) {
        await this.hoverOverTodoItem(todoText)
        return await this.deleteButton(todoText).click()
    }

    async editTodo(todoText: string, newTodoText: string) {
        await this.hoverOverTodoItem(todoText)
        const todoLabel = this.page.locator(`//label[text()="${todoText}"]`)
        await todoLabel.dblclick()
        const editInput = this.page.locator(`//li[contains(@class, "editing")]//input[@class="edit"]`)
        await editInput.fill(newTodoText)
        return await editInput.press('Enter')
    }

    async getTodoTextByIndex(index: number): Promise<string> {
        return (await this.todoItems.nth(index).innerText()).trim()
    }

    async addTodo(todoText: string) {
        await this.input.fill(todoText)
        await this.input.press('Enter')
    }

    async toggleTodo(todoText: string) {
        await this.toggleButton(todoText).click()
    }

    async getTodoCount() {
        // Reinitializing locator to get updated count.
        return await this.page.locator(`//ul[@class="todo-list"]/li`).count()
    }

    async hoverOverTodoItem(todoText: string) {
        await this.page.locator(`//label[text()="${todoText}"]`).hover()
    }

    async clearCompletedTodos() {
        await this.clearCompleted.click()
    }

    async openCompletedTodos() {
        await this.filterCompletedButton.click()
    }

    async openActiveTodos() {
        return await this.filterActiveButton.click()
    }
}
