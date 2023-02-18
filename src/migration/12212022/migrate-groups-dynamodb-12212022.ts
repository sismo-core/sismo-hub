import { EntityManager } from "@typedorm/core";
import { FileStore } from "file-store";
import { DynamoDBGroupStore } from "infrastructure/group-store";
import { LoggerService } from "logger/logger";
import { FetchedData, Properties } from "topics/group";

const formatGroupData = (data: FetchedData): FetchedData => {
  return Object.fromEntries(
    Object.entries(data).map(([k]) => {
      return [k, "1"];
    })
  );
};

export const migrateGroupsProperties = async ({
  dataFileStore,
  entityManager,
  loggerService,
}: {
  dataFileStore: FileStore;
  entityManager: EntityManager;
  loggerService: LoggerService;
}) => {
  const groupStore = new DynamoDBGroupStore(dataFileStore, entityManager);
  // const latestsGroups = await groupStore.latests(); -> was previously used to get the groups
  const latestsGroups = await groupStore.all();
  for (const groupName in latestsGroups) {
    loggerService?.info(`Migrating group ${groupName}`);
    if (alreadyMigrated.includes(groupName)) {
      loggerService?.info(`Group has multiple levels ${groupName}`);
      continue;
    }
    const group = latestsGroups[groupName];

    const data = await group.data();
    const resolvedData = await group.resolvedIdentifierData();

    if (
      Object.keys(computeProperties(data).valueDistribution).length === 1 &&
      Object.keys(computeProperties(data).valueDistribution)[0] === "1"
    ) {
      loggerService?.info(`No need to migrate ${groupName}`);
      continue;
    }

    const formattedGroupData = formatGroupData(data);

    const newGroup = {
      ...group,
      timestamp: group.timestamp + 1, //increase timestamp to override the latest
      data: formattedGroupData,
      properties: computeProperties(formattedGroupData),
      resolvedIdentifierData: formatGroupData(resolvedData),
    };
    loggerService?.info(`Going to save`, newGroup.name, newGroup.timestamp);
    await groupStore.save(newGroup);
  }

  return entityManager;
};

const computeProperties = (data: FetchedData): Properties => {
  const valueDistribution: { [tier: number]: number } = {};
  let accountsNumber = 0;
  Object.values(data).map((tier: any) => {
    const tierString = tier.toString();
    valueDistribution[tierString]
      ? (valueDistribution[tierString] += 1)
      : (valueDistribution[tierString] = 1);
    accountsNumber++;
  });

  return {
    accountsNumber,
    valueDistribution,
  };
};

const alreadyMigrated = [
  "sismo-contributors",
  "twitter-ethereum-influencers",
  "ens-influencers",
  "my-zk-testing-badge",
];
