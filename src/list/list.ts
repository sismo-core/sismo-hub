import { ValueType, FetchedData, ListConstructor, Tags } from "./list.types";

export class List {
  public generationDate: Date;
  public valueType: ValueType;
  public tags: Tags[];
  public data: FetchedData;
  public generatorId?: number;

  constructor({
    generationDate: generationTimestamp,
    data,
    valueType,
    tags,
    generatorId,
  }: ListConstructor) {
    this.generationDate = generationTimestamp;
    this.data = data;
    this.valueType = valueType;
    this.tags = tags;
    this.generatorId = generatorId;
  }
}
