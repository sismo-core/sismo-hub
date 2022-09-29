import { LoggerService } from "logger/logger";
/* istanbul ignore next  */
export class StdoutLogger implements LoggerService {
  debug(...msg: any): void {
    console.debug(...msg);
  }
  info(...msg: any): void {
    console.info(...msg);
  }
  warning(...msg: any): void {
    console.warn(...msg);
  }
  error(...msg: any): void {
    console.error(...msg);
  }
}
