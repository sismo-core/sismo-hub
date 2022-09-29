export interface LoggerService {
  debug(...msg: any): void;
  info(...msg: any): void;
  warning(...msg: any): void;
  error(...msg: any): void;
}
