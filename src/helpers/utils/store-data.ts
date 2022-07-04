export type DataStoreReference = {
  hash: string;
  type: "S3" | "Disk";
  base: string;
  key: string;
  uri?: string;
};
