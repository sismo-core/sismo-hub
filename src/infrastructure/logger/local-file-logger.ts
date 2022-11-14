import fs from "fs";
import { LoggerService } from "logger/logger";

const logTypeToDecoration: { [logType: string]: string } = {
  debug: "[DEBUG]: ",
  info: "[INFO]: ",
  warning: "[WARNING]: ",
  error: "[ERROR]: ",
};

/* istanbul ignore next  */
export class LocalFileLogger implements LoggerService {
  private _logFilePath: string;
  constructor(logFilePath: string) {
    this._logFilePath = `${__dirname}/../../../${logFilePath}`;
    fs.mkdirSync(this._logFilePath, { recursive: true });
  }

  debug(...msg: any): void {
    console.debug(...msg);
    this._write("debug", msg, "debug");
  }
  info(...msg: any): void {
    console.info(...msg);
    this._write("info", msg, "info");
    this._write("debug", msg, "info");
  }
  warning(...msg: any): void {
    console.warn(...msg);
    this._write("warning", msg, "warning");
    this._write("info", msg, "warning");
    this._write("debug", msg, "warning");
  }
  error(...msg: any): void {
    console.error(...msg);
    this._write("error", msg, "error");
    this._write("warning", msg, "error");
    this._write("info", msg, "error");
    this._write("debug", msg, "error");
  }

  private _write(filename: string, msg: string[], logType: string) {
    fs.appendFileSync(
      `${this._logFilePath}/${filename}.log`,
      logType === filename
        ? `${msg.join("\r")}\n`
        : `${logTypeToDecoration[logType]}${msg.join("\r")}\n`
    );
  }
}
