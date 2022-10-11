import fs from "fs";
import { LoggerService } from "logger/logger";
/* istanbul ignore next  */
export class LocalFileLogger implements LoggerService {
  private _logFilePath: string;
  constructor(logFilePath: string) {
    this._logFilePath = `${__dirname}/../../../${logFilePath}`;
    fs.mkdirSync(this._logFilePath, { recursive: true });
  }

  debug(...msg: any): void {
    console.debug(...msg);
    this._write("debug", msg);
  }
  info(...msg: any): void {
    console.info(...msg);
    this._write("info", msg);
  }
  warning(...msg: any): void {
    console.warn(...msg);
    this._write("warning", msg);
  }
  error(...msg: any): void {
    console.error(...msg);
    this._write("error", msg);
  }

  private _write(logType: string, msg: string[]) {
    fs.appendFileSync(
      `${this._logFilePath}/${logType}.log`,
      `${msg.join("\r")}\n`
    );
  }
}
