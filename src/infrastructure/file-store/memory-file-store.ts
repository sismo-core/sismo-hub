import FileStore from "../../file-store";

export class MemoryFileStore extends FileStore {
  protected data: { [key: string]: any } = {};

  async read(filename: string): Promise<any> {
    return Promise.resolve(this.data[filename]);
  }

  async write(filename: string, data: any): Promise<void> {
    this.data[filename] = data;
  }
}
