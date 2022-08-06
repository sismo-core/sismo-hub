export class ClassLibrary<T> {
  classes: { [name: string]: { new (...args: any[]): T } };

  constructor(classes: { [name: string]: { new (...args: any[]): T } }) {
    this.classes = classes;
  }

  all(...args: any[]): { [name: string]: T } {
    const instances: { [name: string]: T } = {};
    for (const name in this.classes) {
      instances[name] = new this.classes[name](args);
    }
    return instances;
  }

  create(className: string, ...args: any[]): T {
    return new this.classes[className](args);
  }
}
