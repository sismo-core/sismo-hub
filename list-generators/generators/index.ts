import ethOwners from "./1_eth-owners";
import ensVoter from "./2_ens-voters";
import sismoPoap from "./3_sismo-POAPs";
import sismoDomain from "./4_sismo-domains";
import ethUsers from "./5_eth-users";
import lensProfiles from "./6_lens-profiles";
import poolyMinters from "./7_pooly-minters";

const generators = [
  ethOwners,
  ensVoter,
  sismoPoap,
  sismoDomain,
  ethUsers,
  lensProfiles,
  poolyMinters,
];

export default generators;
