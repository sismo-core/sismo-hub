// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GroupStore } from "topics/group";

export const factoryAttestationsCollections = [
  // random between 2 million and 3 million
  {
    internalCollectionId: 2840227,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("sismo-dev-address"),
    ],
  },
  // {
  //   internalCollectionId: 3000000,
  //   groupFetcher: async (groupStore: GroupStore) => [
  //     await groupStore.latest("proof-of-attendance-main-events"),
  //   ],
  // },
];
