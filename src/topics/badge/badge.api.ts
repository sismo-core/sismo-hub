import { BigNumber, ethers } from "ethers";
import { Badge } from "./badge";
import { badgeRoutesSchemas as schemas } from "./badge.api.schema";
import { Api, notFoundResponse } from "api";
import { Network } from "topics/attester";
import { Group } from "topics/group";

type BadgeWithEligibility = Badge & {
  groupGeneratorName: string;
  eligibility: {
    shortDescription: string;
    specification: string;
  };
};

const setImageUrlAndEligibility = (
  api: Api,
  badge: Badge,
  allGroups: { [name: string]: Group }
): BadgeWithEligibility => {
  const group = allGroups[badge.groupSnapshot.groupName];
  return {
    ...badge,
    image: api.staticUrl(`badges/${badge.image}`),
    groupGeneratorName: group?.generatedBy ?? "",
    eligibility: {
      shortDescription: group?.description,
      specification: group?.specs,
    },
  };
};

const routes = async (api: Api) => {
  const getBadgesFromAttesters = async (
    network: Network
  ): Promise<BadgeWithEligibility[]> => {
    const allGroups = await api.groupStore.all();
    return api.badges
      .getBadges(network)
      .map((badge) => setImageUrlAndEligibility(api, badge, allGroups));
  };

  api.get("/badges/", { schema: schemas.list }, async () => {
    const allGroups = await api.groupStore.all();
    return api.badges.getAllBadges().then((badges) => ({
      items: badges.map((badge) =>
        setImageUrlAndEligibility(api, badge, allGroups)
      ),
    }));
  });

  api.get("/badges/:network/", { schema: schemas.networkList }, async (req) => {
    return { items: await getBadgesFromAttesters(req.params.network) };
  });

  api.get(
    "/badges/:network/:collectionId.json",
    { schema: schemas.metadata },
    async (req, res) => {
      const { network, collectionId } = req.params;
      const badges = await getBadgesFromAttesters(network);
      const badge = badges.find(
        (badge) => encodeCollectionId(badge.collectionId) === collectionId
      );
      if (!badge) return notFoundResponse(res, "Badge not found");
      return badge;
    }
  );

  api.get(
    "/badges/:network/details/:collectionId",
    { schema: schemas.get },
    async (req, res) => {
      const { network, collectionId } = req.params;
      const badges = await getBadgesFromAttesters(network);
      const badge = badges.find(
        (badge) => badge.collectionId.toString() === collectionId
      );
      if (!badge) return notFoundResponse(res, "Badge not found");
      return { items: [badge] };
    }
  );
};

const encodeCollectionId = (collectionId: number): string =>
  ethers.utils
    .hexZeroPad(BigNumber.from(collectionId).toHexString(), 32)
    .slice(2);

export default routes;
