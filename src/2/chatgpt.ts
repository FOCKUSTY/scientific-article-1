type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogMessage {
  timestamp: Date;
  level: LogLevel;
  message: string;
  meta?: any[];
}

class ChatGptConsoleLogger {
  private buffer: LogMessage[] = [];
  private readonly levelsOrder: LogLevel[] = ['debug', 'info', 'warn', 'error'];

  constructor(private minLevel: LogLevel = 'info') {}

  /** Добавляет сообщение в буфер */
  private logInternal(level: LogLevel, message: string, ...meta: any[]) {
    if (this.levelsOrder.indexOf(level) < this.levelsOrder.indexOf(this.minLevel)) {
      // уровень ниже минимального — не логируем
      return;
    }
    const entry: LogMessage = {
      timestamp: new Date(),
      level,
      message,
      meta: meta.length > 0 ? meta : undefined,
    };
    this.buffer.push(entry);
  }

  /** Выводит и очищает буфер */
  public flush() {
    for (const entry of this.buffer) {
      const timeStr = entry.timestamp.toISOString();
      const prefix = `[${timeStr}] [${entry.level.toUpperCase()}]`;
      if (entry.meta) {
        console.log(prefix, entry.message, ...entry.meta);
      } else {
        console.log(prefix, entry.message);
      }
    }
    this.buffer = [];
  }

  /** Читает все сообщения (без очистки) */
  public readAll(): LogMessage[] {
    return [...this.buffer];
  }

  /** Методы конкретных уровней */
  public info(message: string, ...meta: any[]) {
    this.logInternal('info', message, ...meta);
  }

  public warn(message: string, ...meta: any[]) {
    this.logInternal('warn', message, ...meta);
  }

  public error(message: string, ...meta: any[]) {
    this.logInternal('error', message, ...meta);
  }

  public debug(message: string, ...meta: any[]) {
    this.logInternal('debug', message, ...meta);
  }
}
