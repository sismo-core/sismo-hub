import AWS from "aws-sdk";
const s3 = new AWS.S3();

export type DataStoreReference = {
  hash: string;
  type: "S3" | "Disk";
  base: string;
  key: string;
  uri?: string;
};
