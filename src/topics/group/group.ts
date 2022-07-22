import {
  ValueType,
  GroupType as GroupConstructor,
  Tags,
  FetchedData,
} from "./group.types";

import Infrastructure from "../../infrastructure";
import GroupStore from "./group.store";

export class Group {
  public name: string;
  public timestamp: number;
  public valueType: ValueType;
  public tags: Tags[];

  protected _data?: FetchedData;

  constructor({ name, timestamp, data, valueType, tags }: GroupConstructor) {
    this.name = name;
    this.timestamp = timestamp;
    this._data = data;
    this.valueType = valueType;
    this.tags = tags;
  }

  static get store(): GroupStore {
    return Infrastructure.services.groupStore;
  }

  filename(): string {
    return `${this.name}/${this.timestamp}`;
  }

  async data(): Promise<FetchedData> {
    if (!this._data) {
      return Group.store.getData(this);
    }
    return this._data;
  }

  dataUrl(): string {
    return Infrastructure.services.groupDataStore.url(this.filename());
  }

  async save(): Promise<void> {
    await Group.store.save(this);
  }

  toJson(): GroupConstructor {
    return {
      name: this.name,
      timestamp: this.timestamp,
      valueType: this.valueType,
      tags: this.tags,
    };
  }
}
