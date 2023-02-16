import { FetchedData, Properties } from "topics/group/group.types";

export type GroupSnapshotMetadata = {
  groupId: string;
  name: string;
  timestamp: number;
  properties: Properties;
  dataIntegrity?: string;
  resolvedIdentifierDataIntegrity?: string;
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
  groupId?: string;
  groupSnapshotName?: string;
  timestamp: number | string;
};
