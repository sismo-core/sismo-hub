// eslint-disable-next-line import/order
import { GroupGeneratorsLibrary } from "topics/group-generator";
import aurora from "./aurora";
import aztecActiveDepositors from "./aztec-connect-depositors";
import blockimperiumgames from "./blockimperiumgames";
import circularmerchLensFollowers from "./circularmerch-lens-followers";
import coinCenterDonators from "./coin-center-donators";
import davidZkBadge from "./david-zk-badge";
import dhadrienFriends from "./dhadrien-friends";
import dmt from "./dmt";
import ensContractsStargazers from "./ens-contracts-stargazers";
import ensSupporters from "./ens-supporters";
import ensVoters from "./ens-voters";
import eth2Depositors from "./eth2-depositors";
import ethereumMostTransactions from "./ethereum-most-transactions";
import ethereumPowerUsers from "./ethereum-power-users";
import EthereumPowerUsersPolygonZkBadgeHolders from "./ethereum-power-users-polygon-zk-badge-holders";
import firstRugOnLens from "./first-rug-on-lens";
import firstenquebadge from "./firstenquebadge";
import flexLoan from "./flex-loan";
import gamejustuAchievements from "./gamejutsu-achievements";
import gitcoinGrantsAggregatedRoundsDonors from "./gitcoin-grants-aggregated-rounds-donors";
import gitcoinGrantsRoundsApiDonors from "./gitcoin-grants-rounds-api-donors";
import gitcoinGrantsRoundsDonors from "./gitcoin-grants-rounds-donors";
import karepmulah from "./karepmulah";
import lamaPama from "./lama-pama";
import lens50BestFollowed from "./lens-50-best-followed";
import lilnounsProplotContributors from "./lilnouns-proplot-contributors";
import lilnounsProplotVoters from "./lilnouns-proplot-voters";
import localGroup from "./local-group";
import madfiLensFollowersS01 from "./madfi-lens-followers-s01"
import madmaxBadge from "./madmax-badge";
import maltsismo from "./maltsismo";
import martianWave from "./martian-wave";
import martingbzSismoThread1LensMirrorers from "./martingbz-sismo-thread-1-lens-mirrorers";
import masqueradeLensFollowers from "./masquerade-lens-followers";
import masqueradePolygonZkBadgeHolders from "./masquerade-polygon-zk-badge-holders";
import monsters from "./monsters";
import mybadge from "./mybadge";
import neoneoBadge from "./neoneo-badge";
import nftCollector from "./nft-collector";
import ofacChadsZkBadge08082022 from "./ofac-chads-zk-badge-08-08-2022";
import offroadmannGroup from "./offroadmann-group";
import opAirdrop from "./op-airdrop";
import optimismGovernanceCommitteeMember from "./optimism-governance-committee-member";
import pohPolygonZkBadgeHolders from "./poh-polygon-zk-badge-holders";
import proofOfAttendanceMainEvents from "./proof-of-attendance-main-events";
import proofOfHumanity from "./proof-of-humanity";
import proofOfLepakMember from "./proof-of-lepak-member";
import rhinofiPowerUsers from "./rhinofi-power-users";  
import rocketlab from "./rocketlab";
import sismoAndMasqueradeLensFollowers from "./sismo-and-masquerade-lens-followers";
import sismoContributors from "./sismo-contributors"
import sismoContributorsTier1Users from "./sismo-contributors-tier1-users"
import sismoContributorsTier2ImpactfulContributors from "./sismo-contributors-tier2-impactful-contributors"
import sismoContributorsTier3Builders from "./sismo-contributors-tier3-builders"
import sismoDiggers from "./sismo-diggers";
import sismoDomain from "./sismo-domains";
import sismoEarlyUsers from "./sismo-early-users";
import sismoEvents from "./sismo-events";
import sismoGenA from "./sismo-gen-a";
import sismoGenX from "./sismo-gen-x";
import sismoGenZero from "./sismo-gen-zero";
import sismoGenesisTeam from "./sismo-genesis-team"
import sismoGitcoinDonors from "./sismo-gitcoin-donors";
import sismoHubContributorsGithub from "./sismo-hub-contributors-github";
import sismoLensFollowers from "./sismo-lens-followers";
import sismoMasqueradeLensFollowers from "./sismo-masquerade-lens-followers";
import sismoStargazers from "./sismo-stargazers"
import theDogePoundOwners from "./the-doge-pound-owners";
import therealafrorickgroup from "./therealafrorickgroup";
import timeswapLensFollowers from "./timeswap-lens-followers";
import top100Ens from "./top-100-ens";
import tornadoCashEthDepositors from "./tornado-cash-eth-depositors"
import tutoEnsContributors from "./tuto-ens-contributors"
import wagameLensPostInteraction from "./wagame-lens-post-interaction";

export const groupGenerators: GroupGeneratorsLibrary = {
  "aurora": aurora,
  "aztec-connect-depositors": aztecActiveDepositors,
  "blockimperiumgames": blockimperiumgames,
  "circularmerch-lens-followers": circularmerchLensFollowers,
  "coin-center-donators": coinCenterDonators,
  "dhadrien-friends": dhadrienFriends,
  "dmt": dmt,
  "ens-contracts-stargazers": ensContractsStargazers,
  "ens-voters": ensVoters,
  "ens-supporters": ensSupporters,
  "eth2-depositors": eth2Depositors,
  "ethereum-most-transactions": ethereumMostTransactions,
  "ethereum-power-users": ethereumPowerUsers,
  "ethereum-power-users-polygon-zk-badge-holders": EthereumPowerUsersPolygonZkBadgeHolders,
  "first-rug-on-lens": firstRugOnLens,
  "firstenquebadge": firstenquebadge,
  "flex-loan": flexLoan,
  "gamejutsu-achievements": gamejustuAchievements,
  "lama-pama": lamaPama,
  "gitcoin-grants-aggregated-rounds-donors": gitcoinGrantsAggregatedRoundsDonors,
  "gitcoin-grants-rounds-api-donors": gitcoinGrantsRoundsApiDonors,
  "gitcoin-grants-rounds-donors": gitcoinGrantsRoundsDonors,
  "karepmulah": karepmulah,
  "lens-50-best-followed": lens50BestFollowed,
  "lilnouns-proplot-contributors": lilnounsProplotContributors,
  "lilnouns-proplot-voters": lilnounsProplotVoters,
  "local-group": localGroup,
  "madfi-lens-followers-s01": madfiLensFollowersS01,
  "madmax-badge": madmaxBadge,
  "maltsismo": maltsismo,
  "martian-wave": martianWave,
  "martingbz-sismo-thread-1-lens-mirrorers": martingbzSismoThread1LensMirrorers,
  "masquerade-lens-followers": masqueradeLensFollowers,
  "masquerade-polygon-zk-badge-holders": masqueradePolygonZkBadgeHolders,
  "david-zk-badge": davidZkBadge,
  "monsters": monsters,
  "mybadge": mybadge,
  "neoneo-badge": neoneoBadge,
  "nft-collector": nftCollector,
  "ofac-chads-zk-badge-08-08-2022": ofacChadsZkBadge08082022,
  "offroadmann-group": offroadmannGroup,
  "op-airdrop": opAirdrop,
  "optimism-governance-committee-member": optimismGovernanceCommitteeMember,
  "poh-polygon-zk-badge-holders": pohPolygonZkBadgeHolders,
  "proof-of-attendance-main-events": proofOfAttendanceMainEvents,
  "proof-of-humanity": proofOfHumanity,
  "proof-of-lepak-member": proofOfLepakMember,
  "rocketlab": rocketlab,
  "sismo-and-masquerade-lens-followers": sismoAndMasqueradeLensFollowers,
  "sismo-contributors": sismoContributors,
  "sismo-contributors-tier1-users": sismoContributorsTier1Users,
  "sismo-contributors-tier2-impactful-contributors": sismoContributorsTier2ImpactfulContributors,
  "sismo-contributors-tier3-builders": sismoContributorsTier3Builders,
  "sismo-diggers": sismoDiggers,
  "sismo-domains": sismoDomain,
  "sismo-early-users": sismoEarlyUsers,
  "sismo-events": sismoEvents,
  "sismo-gen-a": sismoGenA,
  "sismo-gen-x": sismoGenX,
  "sismo-gen-zero": sismoGenZero,
  "sismo-genesis-team": sismoGenesisTeam,
  "sismo-gitcoin-donors": sismoGitcoinDonors,
  "sismo-hub-contributors-github": sismoHubContributorsGithub,
  "sismo-lens-followers": sismoLensFollowers,
  "sismo-masquerade-lens-followers": sismoMasqueradeLensFollowers,
  "sismo-stargazers": sismoStargazers,
  "the-doge-pound-owners": theDogePoundOwners,
  "therealafrorickgroup": therealafrorickgroup,
  "timeswap-lens-followers": timeswapLensFollowers,
  "top-100-ens": top100Ens,
  "tornado-cash-eth-depositors": tornadoCashEthDepositors,
  "tuto-ens-contributors": tutoEnsContributors,
  "wagame-lens-post-interaction": wagameLensPostInteraction,
  "rhinofi-power-users": rhinofiPowerUsers, 
};
