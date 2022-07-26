import { Router } from "express";
import {
  getNetworkAttester,
  getNetworkAttesters,
  getNetworksAttesters,
} from "../attester.helper";
import { AttesterNetwork } from "../attester.types";
import {
  serializeAttesterApiType,
  serializeNetworkAttestersApiType,
  serializeNetworksAttestersApiType,
} from "./attester.api.helpers";

const router = Router();

/**
 * Returns all the networks with their attesters.
 * @returns 404 when there's no networks, 200 otherwise with the NetworksAttestersAPIType
 */
router.get("/", async (req, res) => {
  const result = serializeNetworksAttestersApiType(
    await getNetworksAttesters()
  );

  const hasAttesters =
    Object.keys(result).filter(
      (network) => Object.keys(result[network]).length > 0
    ).length > 0;

  if (!hasAttesters) {
    return res.status(404).jsonp({
      error: "No attesters found",
    });
  }

  return res.json(result);
});

/**
 * Returns all the attesters from a specific network.
 * @returns 404 when the Attesters of the Network are not found, 200 otherwise with the NetworkAttestersAPIType
 */
router.get("/:network", async (req, res) => {
  const { network } = req.params;

  const result = serializeNetworkAttestersApiType(
    await getNetworkAttesters(network as AttesterNetwork)
  );

  if (Object.keys(result).length === 0) {
    return res.status(404).jsonp({
      error: `No attesters found on this network`,
    });
  }

  return res.json(result);
});

/**
 * Returns a specific attester from a specific network.
 * @returns 404 when the Attester of the Network is not found, 200 otherwise with the AttesterAPIType
 */
router.get("/:network/:attester", async (req, res) => {
  const { network, attester } = req.params;

  const result = serializeAttesterApiType(
    await getNetworkAttester(network as AttesterNetwork, attester)
  );

  if (result?.name === undefined) {
    return res.status(404).jsonp({
      error: "Attester not found",
    });
  }

  return res.json(result);
});

export default router;
