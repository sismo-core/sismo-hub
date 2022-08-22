import { badgeRoutesSchemas } from "./badge.api.schema";
import { Badge } from ".";
import { Api, notFoundResponse } from "api";
import { Network } from "topics/attester";

const setImageUrl = (api: Api, badge: Badge): Badge => ({
  ...badge,
  image: api.staticUrl(`badges/${badge.image}`),
});

const routes = async (api: Api) => {
  const getBadgesFromAttesters = (network: Network): Badge[] => {
    const badges: Badge[] = [];
    for (const attester of Object.values(api.attesters.all({}))) {
      badges.push(
        ...attester.getBadges(network).map((badge) => setImageUrl(api, badge))
      );
    }
    return badges;
  };

  api.get(
    "/badges/:network/",
    { schema: badgeRoutesSchemas.networkList },
    (req) => ({ items: getBadgesFromAttesters(req.params.network) })
  );

  api.get(
    "/badges/:network/:collectionId.json",
    { schema: badgeRoutesSchemas.get },
    async (req, res) =>
      getBadgesFromAttesters(req.params.network).find(
        (badge) => badge.collectionId == req.params.collectionId
      ) || notFoundResponse(res, "Badge not found")
  );
};

export default routes;
