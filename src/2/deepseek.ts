class DeepSeekLogger {
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
const deepSeekLogger = new DeepSeekLogger();

deepSeekLogger.info("Приложение запущено");
deepSeekLogger.warn("Недостаточно памяти");
deepSeekLogger.error("Произошла критическая ошибка");

// Чтение логов
console.log("Все логи:", deepSeekLogger.readLogs());
console.log("Последние 2 лога:", deepSeekLogger.readLastLogs(2));

// Очистка логов
deepSeekLogger.clearLogs();
console.log("Логи после очистки:", deepSeekLogger.readLogs());