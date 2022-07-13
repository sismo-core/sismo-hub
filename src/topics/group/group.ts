import {
  ValueType,
  GroupConstructor as GroupConstructor,
  Tags,
  FetchedData,
} from "./group.types";

import Infrastructure from "../../infrastructure";
import GroupStore from "./group.store";

export class Group {
  public name: string;
  public generationDate: Date;
  public valueType: ValueType;
  public tags: Tags[];

  protected _data?: FetchedData;

  constructor({
    name,
    generationDate: generationTimestamp,
    data,
    valueType,
    tags,
  }: GroupConstructor) {
    this.name = name;
    this.generationDate = generationTimestamp;
    this._data = data;
    this.valueType = valueType;
    this.tags = tags;
  }

  static get store(): GroupStore {
    return Infrastructure.services.groupStore;
  }

  filename(): string {
    return `${this.name}/${this.generationDate.getTime().toString()}`;
  }

  async data(): Promise<FetchedData> {
    if (!this._data) {
      return await Infrastructure.services.groupDataStore.read(this.filename());
    }
    return this._data;
  }

  async save(): Promise<void> {
    await Infrastructure.services.groupDataStore.write(
      this.filename(),
      this._data
    );
    await Group.store.save(this);
  }

  toJson(): GroupConstructor {
    return {
      name: this.name,
      generationDate: this.generationDate,
      valueType: this.valueType,
      tags: this.tags,
    };
  }
}
