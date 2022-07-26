import { Router } from "express";
import { AttesterNetwork } from "../../attester";
import { serializeNetworkAttestersApiType } from "../../attester/api/attester.api.helpers";
import { getNetworkAttesters } from "../../attester/attester.helper";

const router = Router();

/**
 * Returns all the badges from a specific network.
 * @returns 404 when the Badges or the Network are not found, 200 otherwise with the BadgeAPIType[]
 */
router.get("/:network", async (req, res) => {
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
    return res.status(404).jsonp({
      error: `No badges found on this network`,
    });
  }

  res.json(badges);
});

/**
 * Returns a specific badge from a specific network.
 * @returns 404 when the Badge or the Network is not found, 200 otherwise with the BadgeAPIType
 */
router.get("/:network/:badgeId", async (req, res) => {
  const { network, badgeId } = req.params;

  const serializedNetworkAttesters = serializeNetworkAttestersApiType(
    await getNetworkAttesters(network as AttesterNetwork)
  );

  if (Object.keys(serializedNetworkAttesters).length === 0) {
    return res.status(404).jsonp({
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
    return res.status(404).jsonp({
      error: "Badge not found on this network",
    });
  }

  res.json(badge);
});

export default router;
