import { AvailableGroupConstructor, AvailableGroupData } from "./types";

export interface IAvailableGroup {
  id: string;
  data: AvailableGroupData;
  properties: any;
}

export class AvailableGroup<T> implements IAvailableGroup {
  public id: string;
  public data: AvailableGroupData;
  public properties: T;

  constructor({ data, id, properties }: AvailableGroupConstructor<T>) {
    if (data) {
      this.data = data;
    }
    if (id) {
      this.id = id;
    }
    if (properties) {
      this.properties = properties;
    }
  }

  public toJson() {
    return {
      id: this.id,
      properties: this.properties,
    };
  }
}
