import { FastifyRequest, FastifyInstance, FastifyReply } from "fastify";
import { Badge } from ".";
import { Network } from "topics/attester";

type BadgeNetworkListQueryType = FastifyRequest<{
  Params: {
    network: Network;
  };
}>;

type BadgeGetQueryType = FastifyRequest<{
  Params: {
    network: Network;
    id: string;
  };
}>;

type BadgeApiType = {
  name: string;
  description: string;
  image: string;
  attributes: string[];
};

const serializeBadge = (badge: Badge): BadgeApiType => ({
  name: badge.name,
  description: badge.description,
  image: badge.image,
  attributes: badge.attributes,
});

const updateImageUrl = (fastify: FastifyInstance, badge: Badge): Badge => ({
  ...badge,
  image: fastify.staticUrl(`badges/${badge.image}`),
});

const routes = async (fastify: FastifyInstance) => {
  const getBadgesFromAttesters = (network: Network): Badge[] => {
    const badges: Badge[] = [];
    for (const attester of Object.values(fastify.attesters.all())) {
      badges.push(
        ...attester
          .getBadges(network)
          .map((badge) => updateImageUrl(fastify, badge))
      );
    }
    return badges;
  };

  fastify.get("/badges/", async () => {
    return {
      items: Object.fromEntries(
        Object.values(Network).map((network) => [
          network,
          getBadgesFromAttesters(network),
        ])
      ),
    };
  });

  fastify.get("/badges/:network/", async (req: BadgeNetworkListQueryType) => {
    return { items: getBadgesFromAttesters(req.params.network) };
  });

  fastify.get(
    "/badges/:network/:id.json",
    async (req: BadgeGetQueryType, res: FastifyReply) => {
      const badge: Badge | undefined = getBadgesFromAttesters(
        req.params.network
      ).find((badge) => badge.collectionId == req.params.id);
      if (!badge) {
        return res.status(404).send({
          error: "Badge not found",
        });
      }
      return serializeBadge(badge);
    }
  );
};

export default routes;
