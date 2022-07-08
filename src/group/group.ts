import {
  ValueType,
  GroupConstructor as GroupConstructor,
  Tags,
  FetchedData,
} from "./group.types";

export class Group {
  public name: string;
  public generationDate: Date;
  public valueType: ValueType;
  public tags: Tags[];
  public data: FetchedData;
  public generatorName: string;

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
    this.data = data;
    this.valueType = valueType;
    this.tags = tags;
    this.generatorName = generatorName;
  }
}
