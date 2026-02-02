/**
 * Generates a random string of given length.
 * @param length Length of the string
 * @param charset Optional characters to use
 * @returns Random string
 */
export const generateRandomString = (length: number, charset?: string): string => {
    const defaultCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const chars = charset || defaultCharset
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

/**
 * Generates a random integer between min and max (inclusive)
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random integer
 */
export function generateRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


/**
 * Creates string for items left label based on count
 * @param count Number of items left
 * @returns Formatted string
 * 
 * @example
 * formatItemsLeftLabel(1) => "1 item left"
 * formatItemsLeftLabel(5) => "5 items left"
 */
export function formatItemsLeftLabel(count: number): string {
    return `${count} item${count !== 1 ? 's' : ''} left`
}