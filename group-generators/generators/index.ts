import { GenerationContext } from "../../src/topics/generation-context";

import ensVoter from "./ens-voters";
import ethereumDevelopers from "./ethereum-developers";
import ethereumMostTransactions from "./ethereum-most-transactions";
import ethereumPowerUsers from "./ethereum-power-users";
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

export const getGenerators = (context: GenerationContext) => ({
  "ens-voters": new ensVoter(context),
  "ethereum-developers": new ethereumDevelopers(context),
  "ethereum-most-transactions": new ethereumMostTransactions(context),
  "ethereum-power-users": new ethereumPowerUsers(context),
  "lens-profiles": new lensProfiles(context),
  "masquerade-lens-followers": new masqueradeLensFollowers(context),
  "pooly-lawyer-minters": new poolyLawyerMinters(context),
  "pooly-minters": new poolyMinters(context),
  "sismo-and-masquerade-lens-followers": new sismoAndMasqueradeLensFollowers(
    context
  ),
  "sismo-citizens": new sismoCitizens(context),
  "sismo-diggers": new sismoDiggers(context),
  "sismo-domains": new sismoDomain(context),
  "sismo-guests": new sismoGuest(context),
  "sismo-lens-followers": new sismoLensFollowers(context),
  "sismo-masquerade-lens-followers": new sismoMasqueradeLensFollowers(context),
});
