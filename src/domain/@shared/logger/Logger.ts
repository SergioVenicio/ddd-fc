import ILogger from "./ILogger";

import pino from "pino";


class Logger implements ILogger {
  private logger: pino.BaseLogger;

  constructor() {
    this.logger = pino()
  }
  info(message: string): void {
    this.logger.info(message);
  }
  warn(message: string): void {
    this.logger.warn(message);
  }
  error(message: string): void {
    this.logger.error(message);
  }
}

export default Logger;