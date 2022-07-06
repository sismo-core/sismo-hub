export default abstract class DataStore {
  name: string

  protected constructor(name: string) {
    this.name = name;
  }
  abstract get(namespace: string, key:string): Promise<any>;
  abstract list(namespace: string): Promise<string[]>;
  abstract store(namespace: string, key:string, value: any): Promise<string>;
}