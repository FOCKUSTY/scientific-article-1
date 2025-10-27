class AliceConsoleLogger {
    // Константы для цветов вывода
    private static readonly COLORS = {
        INFO: '\x1b[36m',    // Голубой
        WARN: '\x1b[33m',    // Желтый
        ERROR: '\x1b[31m',   // Красный
        SUCCESS: '\x1b[32m', // Зеленый
        RESET: '\x1b[0m'     // Сброс цвета
    };

    // Метод для логирования информационных сообщений
    public info(message: string): void {
        this.log(message, 'INFO');
    }

    // Метод для логирования предупреждений
    public warn(message: string): void {
        this.log(message, 'WARN');
    }

    // Метод для логирования ошибок
    public error(message: string): void {
        this.log(message, 'ERROR');
    }

    // Метод для логирования успешных операций
    public success(message: string): void {
        this.log(message, 'SUCCESS');
    }

    // Основной метод логирования
    private log(message: string, level: keyof typeof AliceConsoleLogger.COLORS): void {
        const timestamp = new Date().toISOString();
        const color = AliceConsoleLogger.COLORS[level];
        const reset = AliceConsoleLogger.COLORS.RESET;
        
        console.log(`${color}[${timestamp}] [${level}] ${message}${reset}`);
    }

    // Метод для чтения ввода с консоли
    public async readInput(promptMessage: string): Promise<string> {
        return new Promise((resolve) => {
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });

            readline.question(promptMessage, (input) => {
                readline.close();
                resolve(input);
            });
        });
    }
}

// Пример использования:
const aliceLogger = new AliceConsoleLogger();

// Логирование сообщений
aliceLogger.info('Это информационное сообщение');
aliceLogger.warn('Это предупреждение');
aliceLogger.error('Произошла ошибка');
aliceLogger.success('Операция успешно завершена');

// Чтение ввода
(async () => {
    try {
        const userInput = await aliceLogger.readInput('Введите ваше имя: ');
        aliceLogger.info(`Вы ввели: ${userInput}`);
    } catch (error) {
        aliceLogger.error(`Ошибка при чтении ввода: ${error.message}`);
    }
})();
