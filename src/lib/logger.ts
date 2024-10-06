import { env } from "@/env";

enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

class Logger {
  private level: LogLevel;

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
    this.debug = this.debug.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
    this.log = this.log.bind(this);
  }

  private getTimestamp = (): string => {
    return new Date().toISOString();
  }

  private formatMessage = (level: LogLevel, args: unknown[]): string => {
    const message = args
      .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
      .join(" ");

    return `[${this.getTimestamp()}] [${level}] ${message}`;
  }

  private log = async (level: LogLevel, ...args: unknown[]): Promise<void> => {
    if (this.shouldLog(level)) {
      const logMessage = this.formatMessage(level, args);

      if (typeof window === "undefined") {
        // Server-side logging
        try {
          const { appendFile } = await import("fs/promises");
          const path = await import("path");
          const logFilePath = path.resolve("application.log");
          await appendFile(logFilePath, logMessage + "\n");
        } catch (err) {
          console.error("Failed to write to log file:", err);
        }
      }

      // Console logging for both client and server
      console.log(logMessage);

      if (typeof window !== "undefined") {
        // Client-side logging to server
        try {
          await fetch("/api/log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ level, message: logMessage }),
          });
        } catch (err) {
          console.error("Failed to send log to server:", err);
        }
      }
    }
  }

  private shouldLog = (level: LogLevel): boolean => {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }

  async debug(...args: unknown[]): Promise<void> {
    await this.log(LogLevel.DEBUG, ...args);
  }

  async info(...args: unknown[]): Promise<void> {
    await this.log(LogLevel.INFO, ...args);
  }

  async warn(...args: unknown[]): Promise<void> {
    await this.log(LogLevel.WARN, ...args);
  }

  async error(...args: unknown[]): Promise<void> {
    await this.log(LogLevel.ERROR, ...args);
  }
}

export const logger = new Logger(env.NODE_ENV === "development" ? LogLevel.DEBUG : LogLevel.INFO);