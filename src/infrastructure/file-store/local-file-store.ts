import fs from "fs";
import Path from "path";
import { FileStoreApi } from "file-store";

const DEFAULT_DISK_PATH = `${__dirname}/../../../disk-store`;

export class LocalFileStore extends FileStoreApi {
  basePath: string;

  constructor(prefix: string, diskPath: string = DEFAULT_DISK_PATH) {
    super(prefix);
    this.basePath = `${diskPath}/${prefix}/`;
  }

  getPath(filename: string) {
    return `${this.basePath}/${filename}`;
  }

  public async exists(filename: string): Promise<boolean> {
    return fs.existsSync(this.getPath(filename));
  }

  async read(filename: string): Promise<any> {
    const path = this.getPath(filename);
    if (!(await this.exists(filename))) {
      throw Error(`File ${path} does not exist!`);
    }
    return JSON.parse((await fs.promises.readFile(path, "utf8")).toString());
  }

  async write(filename: string, data: any): Promise<void> {
    const path = this.getPath(filename);
    await fs.promises.mkdir(Path.dirname(path), { recursive: true });
    await fs.promises.writeFile(path, JSON.stringify(data, null, 2), "utf-8");
  }

  async delete(filename: string): Promise<void> {
    await fs.promises.rm(this.getPath(filename), { force: true });
  }

  async list(directory: string): Promise<string[]> {
    try {
      return await fs.promises.readdir(this.getPath(directory));
    } catch (error) {
      return [];
    }
  }

  reset(): void {
    fs.rmSync(this.basePath, { recursive: true, force: true });
  }
}
