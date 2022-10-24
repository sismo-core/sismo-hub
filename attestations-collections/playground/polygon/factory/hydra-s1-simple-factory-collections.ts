// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GroupStore } from "topics/group";

export const factoryAttestationsCollections = [
  // random between 2 million and 3 million
  {
    internalCollectionId: 2106633,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("coin-center-donators"),
    ],
  },
  {
    internalCollectionId: 2140799,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("first-rug-on-lens"),
    ],
  },
  {
    internalCollectionId: 2213141,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("martian-wave"),
    ],
  },
  {
    internalCollectionId: 2299239,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("therealafrorickgroup"),
    ],
  },
  {
    internalCollectionId: 2336517,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("ofac-chads-zk-badge-08-08-2022"),
    ],
  },
  {
    internalCollectionId: 2537705,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("rocketlab"),
    ],
  },
  {
    internalCollectionId: 2569984,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("blockimperiumgames"),
    ],
  },
  {
    internalCollectionId: 2597607,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("wagame-lens-post-interaction"),
    ],
  },
  {
    internalCollectionId: 2676733,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("op-airdrop"),
    ],
  },
  {
    internalCollectionId: 2966743,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("my-badge"),
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
