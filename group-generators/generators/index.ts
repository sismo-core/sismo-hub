import { GroupGenerator } from "../../src/topics/group-generator";

import ensVoter from "./ens-voters";
import ethOwners from "./eth-owners";
import ethUsers from "./eth-users";
import lensProfiles from "./lens-profiles";
import masqueradeLensFollowers from "./masquerade-lens-followers";
import poolyLawyerMinters from "./pooly-lawyer-minters";
import poolyMinters from "./pooly-minters";
import sismoAndMasqueradeLensFollowers from "./sismo-and-masquerade-lens-followers";
import sismoCitizens from "./sismo-citizens";
import sismoDiggers from "./sismo-diggers";
import sismoDomain from "./sismo-domains";
import sismoGuest from "./sismo-guests";
import sismoLensFollowers from "./sismo-lens-followers";
import sismoMasqueradeLensFollowers from "./sismo-masquerade-lens-followers";

export const generators: { [name: string]: GroupGenerator } = {
  "ens-voters": ensVoter,
  "eth-owners": ethOwners,
  "eth-users": ethUsers,
  "lens-profiles": lensProfiles,
  "masquerade-lens-followers": masqueradeLensFollowers,
  "pooly-lawyer-minters": poolyLawyerMinters,
  "pooly-minters": poolyMinters,
  "sismo-and-masquerade-lens-followers": sismoAndMasqueradeLensFollowers,
  "sismo-citizens": sismoCitizens,
  "sismo-diggers": sismoDiggers,
  "sismo-domains": sismoDomain,
  "sismo-guests": sismoGuest,
  "sismo-lens-followers": sismoLensFollowers,
  "sismo-masquerade-lens-followers": sismoMasqueradeLensFollowers,
};
