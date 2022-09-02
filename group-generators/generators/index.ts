import ensVoters from "./ens-voters";
import ethereumDevelopers from "./ethereum-developers";
import ethereumMostTransactions from "./ethereum-most-transactions";
import ethereumPowerUsers from "./ethereum-power-users";
import lensProfiles from "./lens-profiles";
import localGroup from "./local-group";
import masqueradeLensFollowers from "./masquerade-lens-followers";
import poolyLawyerMinters from "./pooly-lawyer-minters";
import poolyMinters from "./pooly-minters";
import proofOfHatBronze from "./proof-of-hat-bronze";
import proofOfHatGold from "./proof-of-hat-gold";
import proofOfHatSilver from "./proof-of-hat-silver";
import sismoAndMasqueradeLensFollowers from "./sismo-and-masquerade-lens-followers";
import sismoCitizens from "./sismo-citizens";
import sismoContributors from "./sismo-contributors";
import sismoDiggers from "./sismo-diggers";
import sismoDomain from "./sismo-domains";
import sismoGuest from "./sismo-guests";
import sismoLensFollowers from "./sismo-lens-followers";
import sismoMasqueradeLensFollowers from "./sismo-masquerade-lens-followers";
import snapshotGitcoinDaoVoters from "./snapshot-gitcoindao-voters";

import { GroupGeneratorsLibrary } from "topics/group-generator";

export const groupGenerators: GroupGeneratorsLibrary = {
  "ens-voters": ensVoters,
  "ethereum-developers": ethereumDevelopers,
  "ethereum-most-transactions": ethereumMostTransactions,
  "ethereum-power-users": ethereumPowerUsers,
  "lens-profiles": lensProfiles,
  "local-group": localGroup,
  "masquerade-lens-followers": masqueradeLensFollowers,
  "pooly-lawyer-minters": poolyLawyerMinters,
  "pooly-minters": poolyMinters,
  "proof-of-hat-bronze": proofOfHatBronze,
  "proof-of-hat-gold": proofOfHatGold,
  "proof-of-hat-silver": proofOfHatSilver,
  "sismo-and-masquerade-lens-followers": sismoAndMasqueradeLensFollowers,
  "sismo-citizens": sismoCitizens,
  "sismo-contributors": sismoContributors,
  "sismo-diggers": sismoDiggers,
  "sismo-domains": sismoDomain,
  "sismo-guests": sismoGuest,
  "sismo-lens-followers": sismoLensFollowers,
  "sismo-masquerade-lens-followers": sismoMasqueradeLensFollowers,
  "snapshot-gitcoindao-voters": snapshotGitcoinDaoVoters,
};
