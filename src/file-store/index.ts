export default abstract class FileStore {
  public abstract read(filename: string): Promise<any>;
  public abstract write(filename: string, data: any): Promise<void>;
}
