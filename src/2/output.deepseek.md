Вот реализация класса `Logger` на TypeScript, который предоставляет надстройку над консолью с функциями логирования, чтения и вывода сообщений:

```typescript
class Logger {
  private logs: string[] = [];
  private isEnabled: boolean = true;

  // Метод для логирования сообщений
  public log(message: string): void {
    if (!this.isEnabled) return;
    
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${message}`;
    
    this.logs.push(formattedMessage);
    console.log(formattedMessage);
  }

  // Метод для чтения всех сообщений
  public readLogs(): string[] {
    return [...this.logs];
  }

  // Метод для чтения последних N сообщений
  public readLastLogs(count: number): string[] {
    return this.logs.slice(-count);
  }

  // Метод для очистки истории логов
  public clearLogs(): void {
    this.logs = [];
  }

  // Метод для включения/выключения логирования
  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  // Дополнительные методы для разных уровней логирования
  public warn(message: string): void {
    this.log(`[WARN] ${message}`);
  }

  public error(message: string): void {
    this.log(`[ERROR] ${message}`);
  }

  public info(message: string): void {
    this.log(`[INFO] ${message}`);
  }
}

// Пример использования
const logger = new Logger();

logger.info("Приложение запущено");
logger.warn("Недостаточно памяти");
logger.error("Произошла критическая ошибка");

// Чтение логов
console.log("Все логи:", logger.readLogs());
console.log("Последние 2 лога:", logger.readLastLogs(2));

// Очистка логов
logger.clearLogs();
console.log("Логи после очистки:", logger.readLogs());
```

Основные возможности класса:

1. **Логирование с временными метками**:
   - Все сообщения автоматически получают метку времени в формате ISO
   - Поддержка разных уровней логирования (info, warn, error)

2. **Чтение логов**:
   - `readLogs()` - возвращает все сохраненные сообщения
   - `readLastLogs(count)` - возвращает последние N сообщений

3. **Управление логами**:
   - `clearLogs()` - очистка истории сообщений
   - `setEnabled(enabled)` - включение/выключение логирования

4. **Дополнительные функции**:
   - Все сообщения дублируются в консоль
   - Поддержка форматирования сообщений
   - Возможность расширения дополнительными уровнями логирования

Особенности реализации:
- Использует приватное хранилище для сообщений
- Поддерживает возможность отключения логирования
- Возвращает копии массивов с логами для предотвращения внешних изменений
- Сообщения форматируются единообразно с добавлением временных меток