/**
 * Форматирует сообщение для вывода в консоль с указанием времени.
 * @param {string} message Сообщение для вывода
 */
function logWithTimestamp(message) {
    const now = new Date();
    const timestamp = now.toISOString();
    console.log(`[${timestamp}] ${message}`);
}

/**
 * Возвращает случайный элемент из массива.
 * @param {Array} array Массив, из которого нужно получить случайный элемент
 * @return {*} Случайный элемент массива
 */
function getRandomElement(array) {
    if (array.length === 0) return null;
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

/**
 * Обрабатывает ошибки бота, выводя информацию о них в консоль.
 * @param {Error} error Объект ошибки
 */
function handleError(error) {
    logWithTimestamp(`Ошибка: ${error.message}`);
}

/**
 * Простая функция для задержки выполнения.
 * @param {number} ms Количество миллисекунд задержки
 * @return {Promise<void>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { logWithTimestamp, getRandomElement, handleError, sleep };
