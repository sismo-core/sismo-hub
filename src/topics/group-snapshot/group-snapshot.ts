import {
  GroupSnapshot,
  GroupSnapshotMetadata,
  GroupSnapshotWithData,
} from "topics/group-snapshot/group-snapshot.types";

export const groupSnapshotMetadata = (
  groupSnapshot: GroupSnapshot | GroupSnapshotWithData
): GroupSnapshotMetadata => ({
  groupId: groupSnapshot.groupId,
  name: groupSnapshot.name,
  timestamp: groupSnapshot.timestamp,
  properties: groupSnapshot.properties,
  dataIntegrity: groupSnapshot.dataIntegrity,
  resolvedIdentifierDataIntegrity:
    groupSnapshot.resolvedIdentifierDataIntegrity,
});
