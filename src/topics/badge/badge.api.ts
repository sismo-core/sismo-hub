import { FastifyInstance, FastifyRequest } from "fastify";
import { AttesterNetwork } from "../attester";
import { serializeBadgeApiType } from "./badge.api.helpers";

type BadgeQueryType = FastifyRequest<{
  Params: {
    network: string;
  };
}>;

type NetworkBadgeQueryType = FastifyRequest<{
  Params: {
    network: string;
    badgeId: string;
  };
}>;

const routes = async (fastify: FastifyInstance) => {
  /**
   * Returns all the badges from a specific network.
   * @returns 404 when the Badges or the Network are not found, 200 otherwise with the BadgeAPIType[]
   */
  fastify.get(
    "/badges/:network/badges.json",
    async (req: BadgeQueryType, res) => {
      const { network } = req.params;

      const badges = Object.keys(fastify.attesters)
        .filter((attesterName) =>
          fastify.attesters[attesterName].hasNetworkConfiguration(
            network as AttesterNetwork
          )
        )
        .flatMap((attesterName) =>
          fastify.attesters[attesterName].attestationsCollections.map(
            (collection, index) =>
              serializeBadgeApiType(
                collection?.badge,
                index,
                fastify.attesters[attesterName]
              )
          )
        );

      if (badges.length === 0) {
        return res.status(404).send({
          error: `No badges found on this network`,
        });
      }

      res.send(badges);
    }
  );

  /**
   * Returns a specific badge from a specific network.
   * @returns 404 when the Badge or the Network is not found, 200 otherwise with the BadgeAPIType
   */
  fastify.get(
    "/badges/:network/:badgeId.json",
    async (req: NetworkBadgeQueryType, res) => {
      const { network, badgeId } = req.params;

      const badge = Object.keys(fastify.attesters)
        .filter((attesterName) =>
          fastify.attesters[attesterName].hasNetworkConfiguration(
            network as AttesterNetwork
          )
        )
        .flatMap((attesterName) =>
          fastify.attesters[attesterName].attestationsCollections.map(
            (collection, index) =>
              serializeBadgeApiType(
                collection?.badge,
                index,
                fastify.attesters[attesterName]
              )
          )
        )
        .find((serializedBadge) => serializedBadge?.collectionId === badgeId);

      if (badge === undefined) {
        return res.status(404).send({
          error: "Badge not found on this network",
        });
      }

      res.send(badge.metadata);
    }
  );
};

export default routes;
