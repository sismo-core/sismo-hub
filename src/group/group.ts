import {
  ValueType,
  GroupConstructor as GroupConstructor,
  Tags,
  FetchedData,
} from "./group.types";

import {infrastructureServices} from "../infrastructure"
import GroupStore from "./group.store";

export class Group {
  public name: string;
  public generationDate: Date;
  public valueType: ValueType;
  public tags: Tags[];
  public generatorName: string;

  protected _data?: FetchedData;

  constructor({
    name,
    generationDate: generationTimestamp,
    data,
    valueType,
    tags,
    generatorName,
  }: GroupConstructor) {
    this.name = name;
    this.generationDate = generationTimestamp;
    this._data = data;
    this.valueType = valueType;
    this.tags = tags;
    this.generatorName = generatorName;
  }

  static get store(): GroupStore {
    return infrastructureServices.groupStore
  }

  filename(): string {
    return `${this.name}/${this.generationDate.getTime().toString()}`;
  }

  async data(): Promise<FetchedData> {
    if (!this._data) {
      return await infrastructureServices.fileStore.read(this.filename());
    }
    return this._data;
  }

  async save() : Promise<void> {
    await infrastructureServices.fileStore.write(this.filename(), this._data);
    await Group.store.save(this);
  }
}
