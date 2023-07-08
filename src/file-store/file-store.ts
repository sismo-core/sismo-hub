import { Api } from "api";

export type WriteOptions = {
  json?: boolean;
  pretty?: boolean;
};

export type ReadOptions = {
  json?: boolean;
};

export abstract class FileStore {
  protected prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  public abstract exists(filename: string): Promise<boolean>;
  public abstract read(filename: string, options?: ReadOptions): Promise<any>;
  public abstract url(filename: string): string;
  public abstract write(filename: string, data: any, options?: WriteOptions): Promise<void>;
  public abstract delete(filename: string): Promise<void>;
  public abstract registerRoutes(): (api: Api) => Promise<void>;
}
