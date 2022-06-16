import { ValueType, ListConstructor, Tags, ListData } from "./list.types";

export class List {
  public generationDate: Date;
  public valueType: ValueType;
  public tags: Tags[];
  public data: ListData;
  public generatorId?: number;

  constructor({
    generationDate: generationTimestamp,
    data,
    valueType,
    tags,
    generatorId,
  }: ListConstructor) {
    this.generationDate = generationTimestamp;
    this.data = { content: data };
    this.valueType = valueType;
    this.tags = tags;
    this.generatorId = generatorId;
  }
}
