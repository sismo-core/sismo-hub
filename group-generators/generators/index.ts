import circularmerchLensFollowers from "./circularmerch-lens-followers" ;
import ensVoters from "./ens-voters";
import eth2Depositors from "./eth2-depositors";
import ethereumDevelopers from "./ethereum-developers";
import ethereumMostTransactions from "./ethereum-most-transactions";
import ethereumPowerUsers from "./ethereum-power-users";
import lens50BestFollowed from "./lens-50-best-followed";
import lensProfiles from "./lens-profiles";
import localGroup from "./local-group";
import masqueradeLensFollowers from "./masquerade-lens-followers";
import poolyLawyerMinters from "./pooly-lawyer-minters";
import poolyMinters from "./pooly-minters";
import proofOfHatBronze from "./proof-of-hat-bronze";
import proofOfHatGold from "./proof-of-hat-gold";
import proofOfHatSilver from "./proof-of-hat-silver";
import proofOfHumanity from "./proof-of-humanity";
import proofOfLepakMember from "./proof-of-lepak-member";
import sismoAndMasqueradeLensFollowers from "./sismo-and-masquerade-lens-followers";
import sismoCitizens from "./sismo-citizens";
import sismoContributors from "./sismo-contributors";
import sismoDiggers from "./sismo-diggers";
import sismoDomain from "./sismo-domains";
import sismoGuest from "./sismo-guests";
import sismoLensFollowers from "./sismo-lens-followers";
import sismoMasqueradeLensFollowers from "./sismo-masquerade-lens-followers";
import {
  gamejustuBronzeWinner, gamejustuSilverWinner, gamejustuGoldWinner,
  gamejustuBronzeLoser, gamejustuSilverLoser, gamejustuGoldLoser,
  gamejustuBronzeDraw, gamejustuSilverDraw, gamejustuGoldDraw,
  gamejustuBronzeCheater, gamejustuSilverCheater, gamejustuGoldCheater,
} from "./gamejutsu-achievements";

import { GroupGeneratorsLibrary } from "topics/group-generator";

export const groupGenerators: GroupGeneratorsLibrary = {
  "ens-voters": ensVoters,
  "eth2-depositors": eth2Depositors,
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
  "proof-of-humanity": proofOfHumanity,
  "sismo-and-masquerade-lens-followers": sismoAndMasqueradeLensFollowers,
  "sismo-citizens": sismoCitizens,
  "sismo-contributors": sismoContributors,
  "sismo-diggers": sismoDiggers,
  "sismo-domains": sismoDomain,
  "sismo-guests": sismoGuest,
  "sismo-lens-followers": sismoLensFollowers,
  "sismo-masquerade-lens-followers": sismoMasqueradeLensFollowers,
  "proof-of-lepak-member": proofOfLepakMember,
  "circularmerch-lens-followers": circularmerchLensFollowers,
  "lens-50-best-followed": lens50BestFollowed,
  "gamejutsu-bronze-winner": gamejustuBronzeWinner,
  "gamejutsu-silver-winner": gamejustuSilverWinner,
  "gamejutsu-gold-winner": gamejustuGoldWinner,
  "gamejutsu-bronze-loser": gamejustuBronzeLoser,
  "gamejutsu-silver-loser": gamejustuSilverLoser,
  "gamejutsu-gold-loser": gamejustuGoldLoser,
  "gamejutsu-bronze-draw": gamejustuBronzeDraw,
  "gamejutsu-silver-draw": gamejustuSilverDraw,
  "gamejutsu-gold-draw": gamejustuGoldDraw,
  "gamejutsu-bronze-cheater": gamejustuBronzeCheater,
  "gamejutsu-silver-cheater": gamejustuSilverCheater,
  "gamejutsu-gold-cheater": gamejustuGoldCheater,
};
