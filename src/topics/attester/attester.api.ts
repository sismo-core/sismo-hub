import { Router } from "express";
import {
  getConstructedAttesters,
  getConstructedNetworkAttesters,
  getConstructNetworkAttester,
} from "./attester.helper";
import { AttesterNetwork } from "./types";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await getConstructedAttesters());
});

router.get("/:network", async (req, res) => {
  const { network } = req.params;
  res.json(await getConstructedNetworkAttesters(network as AttesterNetwork));
});

router.get("/:network/:attester", async (req, res) => {
  const { network, attester } = req.params;
  res.json(
    await getConstructNetworkAttester(network as AttesterNetwork, attester)
  );
});

export default router;
