import { BigNumber, ethers } from "ethers";
import { Badge } from "./badge";
import { badgeRoutesSchemas as schemas } from "./badge.api.schema";
import { Api, notFoundResponse } from "api";
import { Network } from "topics/attester";

const setImageUrl = (api: Api, badge: Badge): Badge => ({
  ...badge,
  image: api.staticUrl(`badges/${badge.image}`),
});

const routes = async (api: Api) => {
  const getBadgesFromAttesters = (network: Network): Badge[] => {
    return api.badges
      .getBadges(network)
      .map((badge) => setImageUrl(api, badge));
  };

  api.get("/badges/:network/", { schema: schemas.networkList }, (req) => {
    return { items: getBadgesFromAttesters(req.params.network) };
  });

  api.get(
    "/badges/:network/:collectionId.json",
    { schema: schemas.metadata },
    (req, res) => {
      const { network, collectionId } = req.params;
      const badges = getBadgesFromAttesters(network);
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
    (req, res) => {
      const { network, collectionId } = req.params;
      const badges = getBadgesFromAttesters(network);
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
