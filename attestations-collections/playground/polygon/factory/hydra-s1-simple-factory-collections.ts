// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GroupStore } from "topics/group";

export const factoryAttestationsCollections = [
  // random between 2 million and 3 million
  {
    internalCollectionId: 2299239,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("therealafrorickgroup"),
    ],
  },
  {
    internalCollectionId: 2537705,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("rocketlab"),
    ],
  },
  {
    internalCollectionId: 2597607,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("wagame-lens-post-interaction"),
    ],
  },
  {
    internalCollectionId: 2990121,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("firstenquebadge"),
    ],
  },
  // {
  //   internalCollectionId: 3000000,
  //   groupFetcher: async (groupStore: GroupStore) => [
  //     await groupStore.latest("proof-of-attendance-main-events"),
  //   ],
  // },
];
