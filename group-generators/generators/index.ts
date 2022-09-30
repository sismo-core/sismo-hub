import circularmerchLensFollowers from "./circularmerch-lens-followers";
import ensVoters from "./ens-voters";
import eth2Depositors from "./eth2-depositors";
import ethereumMostTransactions from "./ethereum-most-transactions";
import ethereumPowerUsers from "./ethereum-power-users";
import EthereumPowerUsersPolygonZkBadgeHolders from "./ethereum-power-users-polygon-zk-badge-holders";
import gamejustuAchievements from "./gamejutsu-achievements";
import gitcoinGrantsAggregatedRoundsDonors from "./gitcoin-grants-aggregated-rounds-donors"
import gitcoinGrantsRoundsApiDonors from "./gitcoin-grants-rounds-api-donors"
import gitcoinGrantsRoundsDonors from "./gitcoin-grants-rounds-donors"
import lens50BestFollowed from "./lens-50-best-followed";
import lilnounsProplotContributors from "./lilnouns-proplot-contributors";
import lilnounsProplotVoters from "./lilnouns-proplot-voters";
import localGroup from "./local-group";
import masqueradeLensFollowers from "./masquerade-lens-followers";
import MasqueradePolygonZkBadgeHolders from "./masquerade-polygon-zk-badge-holders";
import pohPolygonZkBadgeHolders from "./poh-polygon-zk-badge-holders";
import proofOfHumanity from "./proof-of-humanity";
import proofOfLepakMember from "./proof-of-lepak-member";
import sismoAndMasqueradeLensFollowers from "./sismo-and-masquerade-lens-followers";
import sismoContributors from "./sismo-contributors";
import sismoDiggers from "./sismo-diggers";
import sismoDomain from "./sismo-domains";
import sismoEarlyUsers from "./sismo-early-users";
import sismoEvents from "./sismo-events";
import sismoGenA from "./sismo-gen-a";
import sismoGenX from "./sismo-gen-x";
import sismoGenZero from "./sismo-gen-zero";
import sismoGitcoinDonors from "./sismo-gitcoin-donors";
import sismoLensFollowers from "./sismo-lens-followers";
import sismoMasqueradeLensFollowers from "./sismo-masquerade-lens-followers";
import top100Ens from "./top-100-ens";
import martingbzSismoThread1LensMirrorers from "@group-generators/generators/martingbz-sismo-thread-1-lens-mirrorers";

import { GroupGeneratorsLibrary } from "topics/group-generator";

export const groupGenerators: GroupGeneratorsLibrary = {
  "ens-voters": ensVoters,
  "eth2-depositors": eth2Depositors,
  "ethereum-most-transactions": ethereumMostTransactions,
  "ethereum-power-users": ethereumPowerUsers,
  "ethereum-power-users-polygon-zk-badge-holders":
    EthereumPowerUsersPolygonZkBadgeHolders,
  "gitcoin-grants-aggregated-rounds-donors": gitcoinGrantsAggregatedRoundsDonors,
  "gitcoin-grants-rounds-api-donors": gitcoinGrantsRoundsApiDonors,
  "gitcoin-grants-rounds-donors": gitcoinGrantsRoundsDonors,
  "lilnouns-proplot-contributors": lilnounsProplotContributors,
  "lilnouns-proplot-voters": lilnounsProplotVoters,
  "local-group": localGroup,
  "masquerade-lens-followers": masqueradeLensFollowers,
  "masquerade-polygon-zk-badge-holders": MasqueradePolygonZkBadgeHolders,
  "poh-polygon-zk-badge-holders": pohPolygonZkBadgeHolders,
  "proof-of-humanity": proofOfHumanity,
  "sismo-and-masquerade-lens-followers": sismoAndMasqueradeLensFollowers,
  "sismo-contributors": sismoContributors,
  "sismo-diggers": sismoDiggers,
  "sismo-domains": sismoDomain,
  "sismo-early-users": sismoEarlyUsers,
  "sismo-events": sismoEvents,
  "sismo-gen-a": sismoGenA,
  "sismo-gen-x": sismoGenX,
  "sismo-gen-zero": sismoGenZero,
  "sismo-gitcoin-donors": sismoGitcoinDonors,
  "sismo-lens-followers": sismoLensFollowers,
  "sismo-masquerade-lens-followers": sismoMasqueradeLensFollowers,
  "proof-of-lepak-member": proofOfLepakMember,
  "circularmerch-lens-followers": circularmerchLensFollowers,
  "lens-50-best-followed": lens50BestFollowed,
  "top-100-ens": top100Ens,
  "gamejutsu-achievements": gamejustuAchievements,
  "martingbz-sismo-thread-1-lens-mirrorers": martingbzSismoThread1LensMirrorers,
};
