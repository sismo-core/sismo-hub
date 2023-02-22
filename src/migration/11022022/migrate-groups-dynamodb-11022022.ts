// import { EntityManager } from "@typedorm/core";
// import { GroupModel, GroupModelLatest } from "infrastructure/group-store";
// import { LoggerService } from "logger/logger";

// export const migrateGroupsGeneratedBy = async ({
//   entityManager,
//   loggerService,
// }: {
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
//     const migratedGroup = mapToGroupGenerator(group, loggerService);
//     await entityManager.create(migratedGroup, {
//       overwriteIfExists: true,
//     });

//     const allGroups = await entityManager.find(GroupModel, {
//       name: group.name,
//     });

//     for (const groupGenerated of allGroups.items) {
//       const migratedGroupGenerated = mapToGroupGenerator(
//         groupGenerated,
//         loggerService
//       );
//       await entityManager.create(migratedGroupGenerated, {
//         overwriteIfExists: true,
//       });
//     }
//   }

//   return entityManager;
// };

// const mapToGroupGenerator = (
//   group: GroupModel | GroupModelLatest,
//   loggerService: LoggerService
// ): GroupModel | GroupModelLatest => {
//   if (group instanceof GroupModel) {
//     loggerService?.info(`Migrating Group ${group.name} as a GroupModel`);
//   } else {
//     loggerService?.info(`Migrating Group ${group.name} as a GroupModelLatest`);
//   }
//   for (const mapping of Object.entries(groupGeneratorMapping)) {
//     const regexp = new RegExp(mapping[0]);
//     if (regexp.test(group.name)) {
//       loggerService?.info(
//         `Group ${group.name} has been generated with ${mapping[1]}`
//       );
//       group.generatedBy = mapping[1];
//       return group;
//     }
//   }
//   // add a fake group generator for every groups that have been saved to the DB but don't match any regex
//   loggerService?.info(`Group ${group.name} does not match any regex`);
//   return group;
// };

// const groupGeneratorMapping: { [name: string]: string } = {
//   "^aurora$": "aurora",
//   "^aztec": "aztec-connect-depositors",
//   "^blockimperiumgames$": "blockimperiumgames",
//   "^circularmerch": "circularmerch-lens-followers",
//   "^coin-center": "coin-center-donators",
//   "dhadrien-friends": "dhadrien-friends",
//   "^dmt$": "dmt",
//   "^ens-contracts-stargazers$": "ens-contracts-stargazers",
//   "^ens-supporters$": "ens-supporters",
//   "^ens-voters$": "ens-voters",
//   "^eth2": "eth2-depositors",
//   "^ethereum-most-transactions": "ethereum-most-transactions",
//   "^ethereum-power-users": "ethereum-power-users",
//   "^ethereum-power-users-polygon-zk-badge-holders$":
//     "ethereum-power-users-polygon-zk-badge-holders",
//   "first-rug-on-lens": "first-rug-on-lens",
//   "^firstenquebadge$": "firstenquebadge",
//   "flex-loan": "flex-loan",
//   "^gamejutsu-": "gamejutsu-achievements",
//   "gitcoin-grants-aggregated-rounds-donors":
//     "gitcoin-grants-aggregated-rounds-donors",
//   "^gitcoin-grants-round-[0-9]+-api-donors": "gitcoin-grants-rounds-api-donors",
//   "^gitcoin-grants-round-[0-9]+-donors": "gitcoin-grants-rounds-donors",
//   "^karepmulah$": "karepmulah",
//   "lama-pama": "lama-pama",
//   "lens-50-best-followed": "lens-50-best-followed",
//   "lilnouns-proplot-contributors": "lilnouns-proplot-contributors",
//   "lilnouns-proplot-voters": "lilnouns-proplot-voters",
//   "local-group": "local-group",
//   "madfi-lens-followers-s01": "madfi-lens-followers-s01",
//   "madmax-badge": "madmax-badge",
//   "martian-wave": "martian-wave",
//   "^martingbz": "martingbz-sismo-thread-1-lens-mirrorers",
//   "^masquerade-lens-followers": "masquerade-lens-followers",
//   "masquerade-polygon-zk-badge-holders": "masquerade-polygon-zk-badge-holders",
//   "david-zk-badge": "david-zk-badge",
//   "^monsters$": "monsters",
//   "^mybadge$": "mybadge",
//   "neoneo-badge": "neoneo-badge",
//   "nft-collector": "nft-collector",
//   "ofac-chads-zk-badge-08-08-2022": "ofac-chads-zk-badge-08-08-2022",
//   "offroadmann-group": "offroadmann-group",
//   "op-airdrop": "op-airdrop",
//   "poh-polygon-zk-badge-holders": "poh-polygon-zk-badge-holders",
//   "proof-of-attendance-main-events": "proof-of-attendance-main-events",
//   "proof-of-humanity": "proof-of-humanity",
//   "proof-of-lepak-member": "proof-of-lepak-member",
//   "proof-of-hat-bronze": "proof-of-hat-bronze",
//   "proof-of-hat-silver": "proof-of-hat-silver",
//   "proof-of-hat-gold": "proof-of-hat-gold",
//   "^rocketlab$": "rocketlab",
//   "^sismo-and-masquerade-lens-followers": "sismo-and-masquerade-lens-followers",
//   "sismo-contributors": "sismo-contributors",
//   "sismo-contributors-tier1-users": "sismo-contributors-tier1-users",
//   "sismo-contributors-tier2-impactful-contributors":
//     "sismo-contributors-tier2-impactful-contributors",
//   "sismo-contributors-tier3-builders": "sismo-contributors-tier3-builders",
//   "sismo-diggers": "sismo-diggers",
//   "sismo-domains": "sismo-domains",
//   "sismo-early-users": "sismo-early-users",
//   "sismo-events": "sismo-events",
//   "sismo-gen-a": "sismo-gen-a",
//   "sismo-gen-x": "sismo-gen-x",
//   "sismo-gen-zero": "sismo-gen-zero",
//   "sismo-genesis-team": "sismo-genesis-team",
//   "sismo-gitcoin-donors": "sismo-gitcoin-donors",
//   "sismo-hub-contributors-github": "sismo-hub-contributors-github",
//   "sismo-lens-followers": "sismo-lens-followers",
//   "^sismo-masquerade-lens-followers": "sismo-masquerade-lens-followers",
//   "sismo-stargazers": "sismo-stargazers",
//   "the-doge-pound-owners": "the-doge-pound-owners",
//   "^therealafrorickgroup$": "therealafrorickgroup",
//   "timeswap-lens-followers": "timeswap-lens-followers",
//   "top-100-ens": "top-100-ens",
//   "tornado-cash-eth-depositors": "tornado-cash-eth-depositors",
//   "tuto-ens-contributors": "tuto-ens-contributors",
//   "wagame-lens-post-interaction": "wagame-lens-post-interaction",
//   "rhinofi-power-users": "rhinofi-power-users",
//   "test-group1": "test-group-generator-1",
//   "test-group2": "test-group-generator-2",
// };
