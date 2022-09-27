import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { Network } from "topics/attester";
import { AttestationsCollection } from "topics/attester/attester.types";
import { BadgesCollection } from "topics/badge";

function makeGameJutsuAttestationCollection(
  firstInternalCollectionId: number
): AttestationsCollection[] {
  const result: AttestationsCollection[] = [];
  let internalCollectionId = firstInternalCollectionId;
  for (const achievement of ["winner", "loser", "draw", "cheater"]) {
    for (const grade of ["bronze", "silver", "gold"]) {
      result.push({
        internalCollectionId,
        groupFetcher: async (groupStore) => [
          await groupStore.latest(`gamejutsu-${grade}-${achievement}`),
        ],
      });
      internalCollectionId++;
    }
  }
  return result;
}

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    [Network.Polygon]: {
      attesterAddress: "0x0AB188c7260666146B300aD3ad5b2AB99eb91D45",
      rootsRegistryAddress: "0xb8797eBa1048f6A6AfCbE4F08a582b4Dde69C05d",
    },
  },

  {
    name: "hydra-s1-simple",
    networks: [Network.Polygon],
    attestationsCollections: [
      // Sismo friends
      {
        internalCollectionId: 0,
        groupFetcher: async () => [], // await groupStore.latest("sismo-diggers"),
      },
      {
        internalCollectionId: 1,
        groupFetcher: async () => [], // await groupStore.latest("sismo-citizens"),
      },
      {
        internalCollectionId: 2,
        groupFetcher: async () => [], // [await this.groupStore.latest("sismo-guests")]
      },
      // Masquerade
      {
        internalCollectionId: 3,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-masquerade-lens-followers"),
        ],
      },
      // Ethereum-power-users
      {
        internalCollectionId: 4,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("ethereum-power-users"),
        ],
      },
      {
        internalCollectionId: 5,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-hat-bronze"),
        ],
      },
      {
        internalCollectionId: 6,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-hat-silver"),
        ],
      },
      {
        internalCollectionId: 7,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-hat-gold"),
        ],
      },
      // proof-of-humanity
      {
        internalCollectionId: 8,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-humanity"),
        ],
      },
      {
        internalCollectionId: 9,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-lepak-member"),
        ],
      },
      // Circularmerch lens followers
      {
        internalCollectionId: 10,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("circularmerch-lens-followers"),
        ],
      },
      // You are 50 most followed
      {
        internalCollectionId: 11,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("lens-50-best-followed"),
        ],
      },
      // top 100 ens users
      {
        internalCollectionId: 12,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("top-100-ens"),
        ],
      },
      // GameJutsu 12 badges
      ...makeGameJutsuAttestationCollection(13),
      // Gitcoin Grant 15 donors
      {
        internalCollectionId: 25,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("gitcoin-grant-15-donors"),
        ],
      },
      // sismo Contributors
      {
        internalCollectionId: 5151110,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-contributors"),
        ],
      },
      // martingbz.lens Sismo thread #1 lens mirrorers
      {
        internalCollectionId: 26,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("martingbz-sismo-thread-1-lens-mirrorers"),
        ],
      },
    ],
  }
);

export const hydraS1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 10000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "[playground] ZK Badge: Sismo Digger",
      description:
        "[playground] ZK Badge received by early contributors of Sismo",
      image: "sismo_digger.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 1,
      name: "[playground] ZK Badge: Sismo Citizen",
      description:
        "[playground] ZK Badge received by early supporters of Sismo",
      image: "sismo_citizen.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 2,
      name: "[playground] ZK Badge: Sismo Guest",
      description:
        "[playground] ZK Badge received by community members of frens of Sismo",
      image: "sismo_guest.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 3,
      name: "[playground] Sismo Masquerade Bloomer ZK Badge",
      description:
        "[playground] ZK Badge owned by @masquerade.lens and @sismo.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 4,
      name: "[playground] Ethereum Power Users ZK Badge",
      description:
        "[playground] ZK Badge owned by the most active users of Ethereum",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 5,
      name: "[playground] Bronze proof of hat",
      description: "[playground] Bronze bounty completed",
      image: "proof-of-hat-bronze.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 6,
      name: "[playground] Silver proof of hat",
      description: "[playground] Silver bounty completed",
      image: "proof-of-hat-silver.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 7,
      name: "[playground] Gold proof of hat",
      description: "[playground] Gold bounty completed",
      image: "proof-of-hat-gold.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 8,
      name: "[playground] Proof of Humanity ZK Badge",
      description: "[playground] ZK Badge owned by verified humans on POH",
      image: "proof_of_humanity.svg",
      attributes: {},
      requirements: ["Prove you are a human with POH"],
    },
    {
      internalCollectionId: 9,
      name: "[playground] Proof of Lepak Member",
      description: "[playground] Lepak Member who is eligible for voting",
      image: "lepak-badge.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 10,
      name: "[playground] CircularMerch lens followers ZK Badge",
      description:
        "[playground] ZK Badge owned by @circlemerch.lens Lens followers",
      image: "circularmerch_lens_followers.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 11,
      name: "[playground] lens 50 best followed ZK Badge",
      description: "[playground] ZK Badge for the 50 most followed",
      image: "lens_50_best_followed.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 12,
      name: "Top 100 ENS ZK Badge",
      description: "ZK Badge owned by the most followed ens names on Twitter",
      image: "badge-ens-leaderboard.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 13,
      name: "Gamejutsu White Belt Winner ZK Badge",
      description: "The player won one game at gamejutsu.app",
      image: "gamejutsu_winner_white.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 14,
      name: "Gamejutsu Green Belt Winner ZK Badge",
      description: "The player won five games in row at gamejutsu.app",
      image: "gamejutsu_winner_green.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 15,
      name: "Gamejutsu Black Belt Winner ZK Badge",
      description: "The player won ten games in row at gamejutsu.app",
      image: "gamejutsu_winner_black.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 16,
      name: "Gamejutsu White Belt Loser ZK Badge",
      description: "The player lost one game at gamejutsu.app",
      image: "gamejutsu_loser_white.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 17,
      name: "Gamejutsu Green Belt Loser ZK Badge",
      description: "The player lost five games in row at gamejutsu.app",
      image: "gamejutsu_loser_green.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 18,
      name: "Gamejutsu Black Belt Loser ZK Badge",
      description: "The player lost ten games in row at gamejutsu.app",
      image: "gamejutsu_loser_black.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 19,
      name: "Gamejutsu White Belt Peacemonger ZK Badge",
      description: "The player draw one game at gamejutsu.app",
      image: "gamejutsu_draw_white.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 20,
      name: "Gamejutsu Brown Belt Peacemonger ZK Badge",
      description: "The player draw five games in row at gamejutsu.app",
      image: "gamejutsu_draw_green.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 21,
      name: "Gamejutsu Black Belt Peacemonger ZK Badge",
      description: "The player draw ten games in row at gamejutsu.app",
      image: "gamejutsu_draw_black.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 22,
      name: "Gamejutsu White Belt Cheater ZK Badge",
      description: "The player cheated one game at gamejutsu.app",
      image: "gamejutsu_cheater_white.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 23,
      name: "Gamejutsu Green Belt Cheater ZK Badge",
      description: "The player cheated five games in row at gamejutsu.app",
      image: "gamejutsu_cheater_green.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 24,
      name: "Gamejutsu Black Belt Cheater ZK Badge",
      description: "The player cheated ten games in row at gamejutsu.app",
      image: "gamejutsu_cheater_black.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 25,
      name: "[playground] GR15 Gitcoin Contributor ZK Badge",
      description: "[playground] ZK Badge owned by contributors of the 15th round of Gitcoin Grants",
      image: "gitcoin_grant_15_donors.svg",
      attributes: {},
      requirements: ["You must have donated in the 15th round of Gitcoin Grants"],
    },
    {
      internalCollectionId: 5151110,
      name: "[playground] Sismo Contributor ZK Badge",
      description:
        "[playground] ZK Badge owned by Sismo contributors. This Badge is used in Sismo Governance for contributors to voice their opinions.",
      image: "sismo_contributors.svg",
      attributes: {},
      requirements: [
        "Prove that you are involved in Sismo by holding .sismo.eth ENS, a contribution POAP, or early ZK Badges.",
      ],
    },
    {
      internalCollectionId: 26,
      name: "Sismo thread #1 lens mirrorers",
      description: "ZK Badge owned by the mirrorers of Sismo thread #1 from martingbz.lens",
      image: "martingbz-sismo-thread-1-lens-mirrorers.svg",
      attributes: {},
      requirements: [],
    },
  ],
};

export const frontBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 0,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "[playground] Sismo Early User ZK Badge",
      description: "[playground] ZK Badge owned by Sismo Early users",
      image: "sismo_early_users.svg",
      attributes: {},
      requirements: [],
    },
  ],
};
