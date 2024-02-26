function parse(packet) {
    if (packet && typeof packet.message === 'string') {
        try {
            const messageData = JSON.parse(packet.message);

            function extractTextFromExtra(extra) {
                if (!extra) return '';
                let text = '';
                if (Array.isArray(extra)) {
                    extra.forEach(item => {
                        text += item.text || '';
                        if (item.extra) {
                            text += extractTextFromExtra(item.extra);
                        }
                    });
                }
                return text;
            }

            const chatText = extractTextFromExtra(messageData.extra);

            // Определение и разбор сообщения
            let messageType, playerName, messageContent;
            if (chatText.startsWith("КЛАН:")) {
                messageType = "клан";
                const parts = chatText.substring(5).trim().split(':'); // Убираем "КЛАН:" и разделяем остальную часть
                if (parts.length >= 2) {
                    playerName = parts[0].trim();
                    messageContent = parts.slice(1).join(':').trim(); // Соединяем обратно, если ":" был в тексте
                    return [messageType, playerName, messageContent];
                }
            } else {
                // Предполагаем, что все остальные сообщения — это чат
                messageType = "чат";
                // Регулярное выражение для извлечения имени пользователя и сообщения
                const match = chatText.match(/^\[.+\] (.+) \(.+\) (.+) ⇨ (.+)$/);
                if (match) {
                    playerName = match[2].trim();
                    messageContent = match[3].trim();
                    return [messageType, playerName, messageContent];
                }
            }
        } catch (error) {
            console.error('Ошибка при разборе JSON:', error);
        }
    }
    // Возвращаем null, если сообщение не соответствует ожидаемым форматам
    return null;
}



function extractTextFromExtra(extra) {
    if (!extra) return '';
    let text = '';
    if (Array.isArray(extra)) {
        extra.forEach(item => {
            text += item.text || '';
            if (item.extra) {
                text += extractTextFromExtra(item.extra);
            }
        });
    }
    return text;
}

function parse2(packet) {
    if (packet && typeof packet === 'object' && 'content' in packet && typeof packet.content === 'string') {
        try {
            const packetData = JSON.parse(packet.content);

            // Рекурсивная функция для извлечения текста из всех уровней 'extra'
            function extractTextFromExtra(extra) {
                if (!extra) return '';
                let text = '';
                if (Array.isArray(extra)) {
                    extra.forEach(item => {
                        text += item.text || '';
                        if (item.extra) {
                            text += extractTextFromExtra(item.extra);
                        }
                    });
                }
                return text;
            }

            // Используем функцию extractTextFromExtra для извлечения текста
            const messageText = extractTextFromExtra(packetData.extra);

            let messageType, playerName, messageContent;

            const clanMatch = messageText.match(/КЛАН: (\S+): (.*)/);
            const chatMatch = messageText.match(/\[.+\] .+ \(.+\) (\S+) ⇨ (.+)/);

            if (clanMatch) {
                messageType = "клан";
                playerName = clanMatch[1].trim();
                messageContent = clanMatch[2].trim();
            } else if (chatMatch) {
                messageType = "чат";
                playerName = chatMatch[1].trim();
                messageContent = chatMatch[2].trim();
            } else {
                return ["неизвестно", "", messageText]; // Возвращаем текст, если не удается распознать формат
            }

            return [messageType, playerName, messageContent];
        } catch (error) {
            console.error('Ошибка при разборе JSON:', error);
            return ["ошибка", "", ""];
        }
    }
    return null;
}



module.exports = { parse, parse2 };