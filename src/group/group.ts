import { ValueType, GroupConstructor as GroupConstructor, Tags, GroupData } from "./group.types";

export class Group {
  public generationDate: Date;
  public valueType: ValueType;
  public tags: Tags[];
  public data: GroupData;
  public generatorId?: number;

  constructor({
    generationDate: generationTimestamp,
    data,
    valueType,
    tags,
    generatorId,
  }: GroupConstructor) {
    this.generationDate = generationTimestamp;
    this.data = { content: data };
    this.valueType = valueType;
    this.tags = tags;
    this.generatorId = generatorId;
  }
}
