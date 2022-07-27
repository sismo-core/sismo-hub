import { FastifyInstance, FastifyRequest } from "fastify";
import { AttesterNetwork } from "../../attester";
import { serializeNetworkAttestersApiType } from "../../attester/api/attester.api.helpers";
import { getNetworkAttesters } from "../../attester/attester.helper";

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
  fastify.get("/badges/:network", async (req: BadgeQueryType, res) => {
    const { network } = req.params;

    const serializedNetworkAttesters = serializeNetworkAttestersApiType(
      await getNetworkAttesters(network as AttesterNetwork)
    );

    const badges = Object.keys(serializedNetworkAttesters).flatMap(
      (attesterName) =>
        serializedNetworkAttesters[attesterName]?.attestationsCollections.map(
          (collection) => collection?.badge
        )
    );

    if (badges.length === 0) {
      return res.status(404).send({
        error: `No badges found on this network`,
      });
    }

    res.send(badges);
  });

  /**
   * Returns a specific badge from a specific network.
   * @returns 404 when the Badge or the Network is not found, 200 otherwise with the BadgeAPIType
   */
  fastify.get(
    "/badges/:network/:badgeId",
    async (req: NetworkBadgeQueryType, res) => {
      const { network, badgeId } = req.params;

      const serializedNetworkAttesters = serializeNetworkAttestersApiType(
        await getNetworkAttesters(network as AttesterNetwork)
      );

      if (Object.keys(serializedNetworkAttesters).length === 0) {
        return res.status(404).send({
          error: "Network not found",
        });
      }

      const badge = Object.keys(serializedNetworkAttesters)
        .flatMap((attesterName) =>
          serializedNetworkAttesters[attesterName]?.attestationsCollections.map(
            (collection) => collection?.badge
          )
        )
        .find((badge) => badge?.collectionId === badgeId);

      if (badge === undefined) {
        return res.status(404).send({
          error: "Badge not found on this network",
        });
      }

      res.send(badge);
    }
  );
};
export default routes;
