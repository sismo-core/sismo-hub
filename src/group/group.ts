import {
  ValueType,
  GroupConstructor as GroupConstructor,
  Tags,
  GroupData,
  FetchedData,
} from "./group.types";
import AWS from "aws-sdk";
import axios from "axios";
const s3 = new AWS.S3();

export class Group {
  public generationDate: Date;
  public valueType: ValueType;
  public tags: Tags[];
  public data: FetchedData;
  public generatorName?: string;

  constructor({
    generationDate: generationTimestamp,
    data,
    valueType,
    tags,
    generatorName,
  }: GroupConstructor) {
    this.generationDate = generationTimestamp;
    this.data = data;
    this.valueType = valueType;
    this.tags = tags;
    this.generatorName = generatorName;
  }
}
