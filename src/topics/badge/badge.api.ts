import { Router } from "express";
import {
  getConstructedNetworkAttesters,
  getConstructNetworkAttester,
} from "../attester/attester.helper";
import { AttesterNetwork } from "../attester/types";

const router = Router();

router.get("/:network", async (req, res) => {
  const { network } = req.params;

  res.json(
    Object.entries(
      await getConstructedNetworkAttesters(network as AttesterNetwork)
    ).map((attester) =>
      attester[1].attestationsCollections.map((collection) => collection?.badge)
    )
  );
});

router.get("/:network/:attester", async (req, res) => {
  const { network, attester } = req.params;

  res.json(
    (
      await getConstructNetworkAttester(network as AttesterNetwork, attester)
    )?.attestationsCollections.map((collection) => collection?.badge)
  );
});

export default router;
