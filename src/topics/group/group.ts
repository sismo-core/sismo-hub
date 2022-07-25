import { DependencyContainer, inject, injectable } from "tsyringe";
import { GroupStore, ValueType, GroupType, Tags, FetchedData } from "./";

@injectable()
export class Group {
  public name: string;
  public timestamp: number;
  public valueType: ValueType;
  public tags: Tags[];

  protected _data?: FetchedData;

  constructor(
    @inject("GroupStore") protected groupStore: GroupStore,
    { name, timestamp, data, valueType, tags }: GroupType
  ) {
    this.name = name;
    this.timestamp = timestamp;
    this._data = data;
    this.valueType = valueType;
    this.tags = tags;
  }

  static create(container: DependencyContainer, groupInfo: GroupType): Group {
    return new Group(container.resolve("GroupStore"), groupInfo);
  }

  get filename(): string {
    return `${this.name}/${this.timestamp}`;
  }

  async data(): Promise<FetchedData> {
    if (!this._data) {
      return this.groupStore.getData(this);
    }
    return this._data;
  }

  get dataUrl(): string {
    return this.groupStore.dataUrl(this);
  }

  async save(): Promise<void> {
    await this.groupStore.save(this);
  }

  get json(): GroupType {
    return {
      name: this.name,
      timestamp: this.timestamp,
      valueType: this.valueType,
      tags: this.tags,
    };
  }
}
