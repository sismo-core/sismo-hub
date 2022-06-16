import ethOwners from "./1_eth-owners";
import ensVoters from "./2_ens-voters";
import sismoPoaps from "./3_sismo-POAPs";
import sismoDomains from "./4_sismo-domains";
import ethUsers from "./5_eth-users";
import lensProfiles from "./6_lens-profiles";
import poolyOwners from "./7_pooly-owners";

const generators = [
  ethOwners,
  ensVoters,
  sismoPoaps,
  sismoDomains,
  ethUsers,
  lensProfiles,
  poolyOwners,
];

export default generators;
