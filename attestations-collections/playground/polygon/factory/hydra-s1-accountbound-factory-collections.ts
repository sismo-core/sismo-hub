// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GroupStore } from "topics/group";

export const factoryAttestationsCollections = [
  // random between 2 million and 3 million
  {
    internalCollectionId: 2092300,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("tokenomics-dao-consultant"),
    ],
  },
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
    internalCollectionId: 2163624,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("commitdao"),
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
    internalCollectionId: 2267301,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("zk-hack"),
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
    internalCollectionId: 2280940,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("dorg-members"),
    ],
  },
  {
    internalCollectionId: 2299239,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("therealafrorickgroup"),
    ],
  },
  {
    internalCollectionId: 2329542,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("dual-pepes"),
    ],
  },
  {
    internalCollectionId: 2336517,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("ofac-chads-zk-badge-08-08-2022"),
    ],
  },
  {
    internalCollectionId: 2348016,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("thub-contributor"),
    ],
  },
  {
    internalCollectionId: 2364118,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("ens-contracts-stargazers"),
    ],
  },
  {
    internalCollectionId: 2398819,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("padultra"),
    ],
  },
  {
    internalCollectionId: 2422521,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("kung-fu"),
    ],
  },
  {
    internalCollectionId: 2489013,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("zk-hack-iii-sismo-workshop"),
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
    internalCollectionId: 2545308,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("fiona"),
    ],
  },
  {
    internalCollectionId: 2558435,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("wallet-group"),
    ],
  },
  {
    internalCollectionId: 2569984,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("blockimperiumgames"),
    ],
  },
  {
    internalCollectionId: 2573021,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("tokenomics-dao-contributor"),
    ],
  },
  {
    internalCollectionId: 2577616,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("akamo"),
    ],
  },
  {
    internalCollectionId: 2579312,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("igorsgemsdao"),
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
    internalCollectionId: 2665855,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("sismo-workshop-ethbrno"),
    ],
  },
  {
    internalCollectionId: 2675416,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("oxbage"),
    ],
  },
  {
    internalCollectionId: 2676733,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("op-airdrop"),
    ],
  },
  {
    internalCollectionId: 2701706,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("dmt"),
    ],
  },
  {
    internalCollectionId: 2715978,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("anav-s-demo"),
    ],
  },
  {
    internalCollectionId: 2729126,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("etherium-eth-bit"),
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
    internalCollectionId: 2842907,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("anav-s-trial"),
    ],
  },
  {
    internalCollectionId: 2855723,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("grail-member"),
    ],
  },
  {
    internalCollectionId: 2874455,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("polyx-exchange"),
    ],
  },
  {
    internalCollectionId: 2882494,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("hazae41-github-followers"),
    ],
  },
  {
    internalCollectionId: 2883815,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("anywhere-golden-customer"),
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
    internalCollectionId: 2927627,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("friend-of-0xba3-299d"),
    ],
  },
  {
    internalCollectionId: 2967948,
    groupFetcher: async (groupStore: GroupStore) => [
      await groupStore.latest("liver"),
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
