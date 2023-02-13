import {
  AccountSource,
  FetchedData,
  Properties,
  Tags,
  ValueType,
} from "topics/group/group.types";

export type GroupSnapshotMetadata = {
  id: string;
  name: string;
  timestamp: number;
  generatedBy?: string;
  valueType: ValueType;
  accountSources?: AccountSource[];
  tags: Tags[];
  properties?: Properties;
};

export type GroupSnapshotWithData = GroupSnapshotMetadata & {
  data: FetchedData;
};

export type ResolvedGroupSnapshotWithData = GroupSnapshotMetadata & {
  data: FetchedData;
  resolvedIdentifierData: FetchedData;
};

export type GroupSnapshot = GroupSnapshotMetadata & {
  data: () => Promise<FetchedData>;
  resolvedIdentifierData: () => Promise<FetchedData>;
};

export type GroupSnapshotSearch = {
  groupSnapshotId?: string;
  groupSnapshotName?: string;
  timestamp: number | string;
};
