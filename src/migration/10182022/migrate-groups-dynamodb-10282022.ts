// import { EntityManager } from "@typedorm/core";
// import { FileStore } from "file-store";
// import { GroupModel, GroupModelLatest } from "infrastructure/group-store";
// import { LoggerService } from "logger/logger";
// import { FetchedData, GroupMetadata, Properties } from "topics/group";

// export const migrateGroupsProperties = async ({
//   dataFileStore,
//   entityManager,
//   loggerService,
// }: {
//   dataFileStore: FileStore;
//   entityManager: EntityManager;
//   loggerService: LoggerService;
// }) => {
//   const latestsGroupsItems = await entityManager.find(
//     GroupModelLatest,
//     {},
//     {
//       queryIndex: "GSI1",
//     }
//   );
//   for (const group of latestsGroupsItems.items) {
//     loggerService?.info(`Migrating group ${group.name}`);
//     const groupMetadata = group.toGroupMetadata();
//     const filename = (group: GroupMetadata) =>
//       `${group.name}/${group.timestamp}.json`;

//     const data = await dataFileStore.read(filename(groupMetadata));
//     group.properties = computeProperties(group.name, data);

//     await entityManager.create(group, {
//       overwriteIfExists: true,
//     });

//     const allGroups = await entityManager.find(GroupModel, {
//       name: group.name,
//     });
//     for (const groupGenerated of allGroups.items) {
//       const groupMetadata = groupGenerated.toGroupMetadata();
//       const filename = (group: GroupMetadata) =>
//         `${group.name}/${group.timestamp}.json`;

//       const data = await dataFileStore.read(filename(groupMetadata));

//       groupGenerated.properties = computeProperties(group.name, data);
//       await entityManager.create(groupGenerated, {
//         overwriteIfExists: true,
//       });
//     }
//   }

//   return entityManager;
// };

// const computeProperties = (name: string, data: FetchedData): Properties => {
//   const valueDistribution: { [tier: number]: number } = {};
//   let accountsNumber = 0;
//   Object.values(data).map((tier: any) => {
//     const tierString = tier.toString();
//     valueDistribution[tierString]
//       ? (valueDistribution[tierString] += 1)
//       : (valueDistribution[tierString] = 1);
//     accountsNumber++;
//   });

//   if (process.env.ONLY_SISMO_CONTRIBUTORS === "true") {
//     if (name !== "sismo-contributors") {
//       return {
//         accountsNumber,
//         valueDistribution: {
//           "1": accountsNumber,
//         },
//       };
//     }
//   }
//   return {
//     accountsNumber,
//     valueDistribution,
//   };
// };
