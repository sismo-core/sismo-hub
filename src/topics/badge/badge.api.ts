import { BigNumber, ethers } from "ethers";
import { badgeRoutesSchemas } from "./badge.api.schema";
import { Badge } from ".";
import { Api, notFoundResponse } from "api";
import { Network } from "topics/attester";

const setImageUrl = (api: Api, badge: Badge): Badge => ({
  ...badge,
  image: api.staticUrl(`badges/${badge.image}`),
});

const routes = async (api: Api) => {
  const getBadgesFromAttesters = (network: Network): Badge[] =>
    api.badges.getBadges(network).map((badge) => setImageUrl(api, badge));

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
        (badge) =>
          encodeCollectionId(badge.collectionId) == req.params.collectionId
      ) || notFoundResponse(res, "Badge not found")
  );
};

const encodeCollectionId = (collectionId: number): string =>
  ethers.utils
    .hexZeroPad(BigNumber.from(collectionId).toHexString(), 32)
    .slice(2);

export default routes;
