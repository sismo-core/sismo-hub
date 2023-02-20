import { FileStoreApi } from "file-store";

export class MemoryFileStore extends FileStoreApi {
  protected data: { [key: string]: any } = {};

  public async exists(filename: string): Promise<boolean> {
    return filename in this.data;
  }

  async read(filename: string): Promise<any> {
    if (!(await this.exists(filename))) {
      throw Error(`File ${filename} does not exist!`);
    }
    return this.data[filename];
  }

  async write(filename: string, data: any): Promise<void> {
    this.data[filename] = data;
  }

  async delete(filename: string): Promise<void> {
    delete this.data[filename];
  }

  reset(): void {
    this.data = {};
  }
}
