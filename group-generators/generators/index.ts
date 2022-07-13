import ensVoter from "./ens-voters";
import ethOwners from "./eth-owners";
import ethUsers from "./eth-users";
import ethereumEventAttenders from "./ethereum-event-attenders";
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
  masqueradeLensFollowers,
  sismoLensFollowers,
  sismoAndMasqueradeLensFollowers,
  ethereumEventAttenders,
];

export default generators;
