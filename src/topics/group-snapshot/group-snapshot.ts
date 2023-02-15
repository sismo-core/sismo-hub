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
  dataMD5: groupSnapshot.dataMD5,
  resolvedIdentifierDataMD5: groupSnapshot.resolvedIdentifierDataMD5,
});
