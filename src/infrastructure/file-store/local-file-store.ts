import fs from "fs";
import Path from "path";

import FileStore from "../../file-store";

const DISK_PATH = `${__dirname}/../../../disk-store`;

export class LocalFileStore extends FileStore {
  basePath: string;

  constructor(prefix: string) {
    super();
    this.basePath = `${DISK_PATH}/${prefix}/`;
  }

  getPath(filename: string) {
    return `${this.basePath}/${filename}`;
  }

  async read(filename: string): Promise<any> {
    return JSON.parse(
      (await fs.promises.readFile(this.getPath(filename), "utf8")).toString()
    );
  }

  async write(filename: string, data: any): Promise<void> {
    const path = this.getPath(filename);
    await fs.promises.mkdir(Path.dirname(path), { recursive: true });
    await fs.promises.writeFile(path, JSON.stringify(data, null, 2), "utf-8");
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

  url(filename: string): string {
    return `file://${Path.resolve(this.getPath(filename))}`;
  }
}
