import ethOwners from "./eth-owners";
import ensVoter from "./ens-voters";
import sismoDiggers from "./sismo-diggers";
import sismoDomain from "./sismo-domains";
import ethUsers from "./eth-users";
import lensProfiles from "./lens-profiles";
import poolyMinters from "./pooly-minters";
import sismoCitizens from "./sismo-citizens";
import sismoGuest from "./sismo-guests";
import poolyLawyerMinters from "./pooly-lawyer-minters";
import sismoMasqueradeLensFollowers from "./sismo-masquerade-lens-followers";

const generators = [
  ethOwners,
  ensVoter,
  ethUsers,
  lensProfiles,
  poolyMinters,
  poolyLawyerMinters,
  sismoCitizens,
  sismoDiggers,
  sismoDomain,
  sismoGuest,
  sismoMasqueradeLensFollowers,
];

export default generators;
