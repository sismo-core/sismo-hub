import {
  GroupSnapshot,
  GroupSnapshotMetadata,
  GroupSnapshotWithData,
} from "topics/group-snapshot/group-snapshot.types";

export const groupSnapshotMetadata = (
  groupSnapshot: GroupSnapshot | GroupSnapshotWithData
): GroupSnapshotMetadata => ({
  id: groupSnapshot.id,
  name: groupSnapshot.name,
  timestamp: groupSnapshot.timestamp,
  generatedBy: groupSnapshot.generatedBy,
  accountSources: groupSnapshot.accountSources,
  properties: groupSnapshot.properties,
  valueType: groupSnapshot.valueType,
  tags: groupSnapshot.tags,
  dataMD5: groupSnapshot.dataMD5,
  resolvedIdentifierDataMD5: groupSnapshot.resolvedIdentifierDataMD5,
});
