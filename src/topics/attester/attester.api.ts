import { Router } from "express";
import {
  serializeAttesterApiType,
  serializeNetworkAttestersApiType,
  serializeNetworksAttestersApiType,
} from "./attester.api.helpers";
import {
  getNetworkAttester,
  getNetworkAttesters,
  getNetworksAttesters,
} from "./attester.helper";
import { AttesterNetwork } from "./attester.types";

const router = Router();

router.get("/", async (req, res) => {
  const result = serializeNetworksAttestersApiType(
    await getNetworksAttesters()
  );

  const hasAttesters =
    Object.keys(result).filter(
      (network) => Object.keys(result[network]).length > 0
    ).length > 0;

  if (!hasAttesters) {
    res.status(404);
  }

  res.json(result);
});

router.get("/:network", async (req, res) => {
  const { network } = req.params;

  const result = serializeNetworkAttestersApiType(
    await getNetworkAttesters(network as AttesterNetwork)
  );

  if (Object.keys(result).length === 0) {
    res.status(404);
  }

  res.json(result);
});

router.get("/:network/:attester", async (req, res) => {
  const { network, attester } = req.params;

  const result = serializeAttesterApiType(
    await getNetworkAttester(network as AttesterNetwork, attester)
  );

  if (result?.name === undefined) {
    res.status(404);
  }

  res.json(result);
});

export default router;
