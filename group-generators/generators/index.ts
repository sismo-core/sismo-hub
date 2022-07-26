import { DependencyContainer } from "tsyringe";
import { GroupGenerator } from "../../src/topics/group-generator";

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

const generators: { [name: string]: typeof GroupGenerator } = {
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

export const getGenerators = (
  container: DependencyContainer
): { [name: string]: GroupGenerator } => {
  const generatorsInstances: { [name: string]: GroupGenerator } = {};
  for (const generatorName in generators) {
    generatorsInstances[generatorName] = container.resolve(
      generators[generatorName]
    );
  }
  return generatorsInstances;
};

export const getGenerator = (
  container: DependencyContainer,
  generatorName: string
): GroupGenerator => container.resolve(generators[generatorName]);
