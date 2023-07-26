import { EntityManager } from "@typedorm/core";
import { MemoryFileStore } from "infrastructure/file-store";
import { DynamoDBGroupSnapshotStore } from "infrastructure/group-snapshot/dynamodb-group-snapshot-store";
import { GroupSnapshotModelLatest } from "infrastructure/group-snapshot/group-snapshot.entity";
import { DynamoDBGroupStore } from "infrastructure/group-store";
import { groupSnapshotMetadata } from "topics/group-snapshot";

export const saveGroupSnapshotLatest = async ({
  entityManagerV2,
  entityManagerSnapshot,
}: {
  entityManagerV2: EntityManager;
  entityManagerSnapshot: EntityManager;
}) => {
  const groupStore = new DynamoDBGroupStore(new MemoryFileStore("test"), entityManagerV2);
  const groupSnapshotStore = new DynamoDBGroupSnapshotStore(
    new MemoryFileStore("test"),
    entityManagerSnapshot
  );

  // retrieve past groups
  const allGroups = Object.values(await groupStore.all());

  for (const group of allGroups) {
    console.log("group", group.id);
    const snapshot = await groupSnapshotStore.latestById(group.id);
    console.log("snapshot", snapshot);
    const groupSnapshotLatest = GroupSnapshotModelLatest.fromGroupSnapshotMetadata(
      groupSnapshotMetadata(snapshot)
    );
    await entityManagerSnapshot.create(groupSnapshotLatest, {
      overwriteIfExists: true,
    });
  }
};
