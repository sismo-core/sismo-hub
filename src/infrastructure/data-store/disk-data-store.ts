import fs from "fs";

import DataStore from "./data-store"

export default class DiskDataStore extends DataStore {
  basePath: string

  constructor(name: string) {
    super(name);
    this.basePath = `${__dirname}/../../../disk-store/${name}`;
  }

  async get(namespace: string, key:string): Promise<any> {
    const path = `${this.basePath}/${namespace}/${key}`;
    const content = (await fs.promises.readFile(path, "utf8")).toString();
    return JSON.parse(content);
  }

  async list(namespace: string): Promise<string[]> {
    const directory = `${this.basePath}/${namespace}`;
    return (await fs.promises.readdir(directory))
  }

  async store(namespace: string, key:string, value: any): Promise<string> {
    const directory = `${this.basePath}/${namespace}`;
    const path = `${directory}/${key}`;
    await fs.promises.mkdir(directory, { recursive: true });
    await fs.promises.writeFile(
      path,
      JSON.stringify(value, null, 2),
      "utf-8"
    );
    return await fs.promises.realpath(path);
  }
}