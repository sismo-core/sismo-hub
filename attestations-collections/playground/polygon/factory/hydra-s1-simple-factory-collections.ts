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
    internalCollectionId: 2153882,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("monsters"),
    ],
  },
  {
    internalCollectionId: 2174030,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("lama-pama"),
    ],
  },
  {
    internalCollectionId: 2184978,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("madmax-badge"),
    ],
  },
  {
    internalCollectionId: 2213141,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("martian-wave"),
    ],
  },
  {
    internalCollectionId: 2216993,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("relay-badge"),
    ],
  },
  {
    internalCollectionId: 2248171,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("neoneo-badge"),
    ],
  },
  {
    internalCollectionId: 2268502,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("mybadge"),
    ],
  },
  {
    internalCollectionId: 2274842,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("aurora"),
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
    internalCollectionId: 2364118,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("ens-contracts-stargazers"),
    ],
  },
  {
    internalCollectionId: 2422521,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("kung-fu"),
    ],
  },
  {
    internalCollectionId: 2504053,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("my-09"),
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
    internalCollectionId: 2642072,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("mintanklee"),
    ],
  },
  {
    internalCollectionId: 2676733,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("op-airdrop"),
    ],
  },
  {
    internalCollectionId: 2676872,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("donik"),
    ],
  },
  {
    internalCollectionId: 2701706,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("dmt"),
    ],
  },
  {
    internalCollectionId: 2741788,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("offroadmann-group"),
    ],
  },
  {
    internalCollectionId: 2746764,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("optimism-governance-committee-member"),
    ],
  },
  {
    internalCollectionId: 2773575,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("dhadrien-friends"),
    ],
  },
  {
    internalCollectionId: 2774366,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("karepmulah"),
    ],
  },
  {
    internalCollectionId: 2814454,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("skyweaver-conquest-player-season-12"),
    ],
  },
  {
    internalCollectionId: 2823307,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("jiraya-og-badge"),
    ],
  },
  {
    internalCollectionId: 2839426,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("tpair"),
    ],
  },
  {
    internalCollectionId: 2893168,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("david-zk-badge"),
    ],
  },
  {
    internalCollectionId: 2893437,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("sawuk"),
    ],
  },
  {
    internalCollectionId: 2909098,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("eren-s-badge"),
    ],
  },
  {
    internalCollectionId: 2909110,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("the-doge-pound-owners"),
    ],
  },
  {
    internalCollectionId: 2968736,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("ambire-frens"),
    ],
  },
  {
    internalCollectionId: 2990121,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("firstenquebadge"),
    ],
  },
  {
    internalCollectionId: 2997493,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("maltsismo"),
    ],
  },
  // {
  //   internalCollectionId: 3000000,
  //   groupFetcher: async (groupStore: GroupStore) => [
  //     await groupStore.latest("proof-of-attendance-main-events"),
  //   ],
  // },
];
