import EnsVoters from "./ens-voters";
import EthereumDevelopers from "./ethereum-developers";
import EthereumMostTransactions from "./ethereum-most-transactions";
import EthereumPowerUsers from "./ethereum-power-users";
import LensProfiles from "./lens-profiles";
import MasqueradeLensFollowers from "./masquerade-lens-followers";
import PoolyLawyerMinters from "./pooly-lawyer-minters";
import PoolyMinters from "./pooly-minters";
import SismoAndMasqueradeLensFollowers from "./sismo-and-masquerade-lens-followers";
import SismoCitizens from "./sismo-citizens";
import SismoDiggers from "./sismo-diggers";
import SismoDomain from "./sismo-domains";
import SismoGuest from "./sismo-guests";
import SismoLensFollowers from "./sismo-lens-followers";
import SismoMasqueradeLensFollowers from "./sismo-masquerade-lens-followers";

import { GroupStore } from "topics/group";
import { GroupGenerator } from "topics/group-generator";

export const generators = {
  "ens-voters": EnsVoters,
  "ethereum-developers": EthereumDevelopers,
  "ethereum-most-transactions": EthereumMostTransactions,
  "ethereum-power-users": EthereumPowerUsers,
  "lens-profiles": LensProfiles,
  "masquerade-lens-followers": MasqueradeLensFollowers,
  "pooly-lawyer-minters": PoolyLawyerMinters,
  "pooly-minters": PoolyMinters,
  "sismo-and-masquerade-lens-followers": SismoAndMasqueradeLensFollowers,
  "sismo-citizens": SismoCitizens,
  "sismo-diggers": SismoDiggers,
  "sismo-domains": SismoDomain,
  "sismo-guests": SismoGuest,
  "sismo-lens-followers": SismoLensFollowers,
  "sismo-masquerade-lens-followers": SismoMasqueradeLensFollowers,
};

export const getGenerator = (
  generatorName: string,
  groupStore: GroupStore
): GroupGenerator => {
  if (!(generatorName in generators)) {
    throw Error(`${generatorName} does not exist`);
  }
  return new generators[generatorName as keyof typeof generators](groupStore);
};
