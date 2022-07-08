import fs from "fs"
import Path from "path"

import FileStore from "../file-store"

export default class LocalFileStore extends FileStore {
  basePath = `${__dirname}/../../disk-store/`

  getPath(filename: string) {
    return `${this.basePath}/${filename}`
  }

  async read(filename: string): Promise<any> {
    return JSON.parse(
      (await fs.promises.readFile(this.getPath(filename), "utf8")).toString()
    )
  }

  async write(filename: string, data: any): Promise<void> {
    const path = this.getPath(filename)
    await fs.promises.mkdir(Path.dirname(path), { recursive: true });
    await fs.promises.writeFile(
      path,
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  }

  async list(directory: string): Promise<string[]> {
    return (await fs.promises.readdir(this.getPath(directory)))
  }
}