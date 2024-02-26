const mineflayer = require('mineflayer');
const config = require('./config'); // Ensure this file contains the necessary configurations
const { handleChat, handleSpawn, handleDeath, handleLogin, handleEnd, chatclan } = require('./eventHandlers');

const generateRandomName = (baseName) => {
    // Генерация случайного числа в диапазоне от 1 до 9999 для добавления к имени
    const randomNum = Math.floor(Math.random() * 10000);
    // Возвращаем измененное имя
    return `${baseName}${randomNum}`;
};

const spawnBot = (username, password, index) => {
    setTimeout(() => {
        const bot = mineflayer.createBot({
            host: config.host,
            username: username,
            password: password,
            version: config.version, // или укажите версию вашего сервера
        });

        // Register event handlers
        bot.on('message', async (jsonMsg) => {
            console.log(jsonMsg.toString());
        });
        bot.on('spawn', () => handleSpawn(bot));
        bot.on('death', () => handleDeath(bot));
        bot.on('login', () => handleLogin(bot));
        bot.on('end', () => handleEnd(bot));
    }, config.interval * index); // Adjust spawn interval as needed
};

const spawnBots = () => {
    const baseName = 'merkabottest';
    const numBots = 1; // Количество ботов для генерации

    for (let index = 0; index < numBots; index++) {
        const username = generateRandomName(baseName);
        spawnBot(username, '', index); // Пустая строка вместо пароля, если не требуется
    }
};

module.exports = spawnBots;
