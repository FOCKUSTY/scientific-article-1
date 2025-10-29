Вот реализация класса для логирования в консоль на TypeScript:

```typescript
class ConsoleLogger {
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
    private log(message: string, level: keyof typeof ConsoleLogger.COLORS): void {
        const timestamp = new Date().toISOString();
        const color = ConsoleLogger.COLORS[level];
        const reset = ConsoleLogger.COLORS.RESET;
        
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
const logger = new ConsoleLogger();

// Логирование сообщений
logger.info('Это информационное сообщение');
logger.warn('Это предупреждение');
logger.error('Произошла ошибка');
logger.success('Операция успешно завершена');

// Чтение ввода
(async () => {
    try {
        const userInput = await logger.readInput('Введите ваше имя: ');
        logger.info(`Вы ввели: ${userInput}`);
    } catch (error) {
        logger.error(`Ошибка при чтении ввода: ${error.message}`);
    }
})();
```

### Описание класса:

1. **ConsoleLogger** - основной класс для работы с консольным логированием.

2. **COLORS** - статический объект с ANSI-кодами цветов для форматирования вывода.

3. **Методы логирования**:
   * `info()` - для информационных сообщений
   * `warn()` - для предупреждений
   * `error()` - для ошибок
   * `success()` - для успешных операций

4. **Метод readInput()** - асинхронный метод для чтения ввода с консоли.

5. **log()** - приватный метод, который форматирует и выводит сообщение в консоль.

### Особенности реализации:
* Использование временных меток для каждого сообщения
* Цветовое форматирование для лучшей читаемости
* Поддержка асинхронного ввода
* Модульная структура для легкого расширения

Для работы с вводом требуется установить модуль `readline`, который входит в Node.js по умолчанию.