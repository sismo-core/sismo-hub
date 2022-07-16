import { Router } from "express";
import {
  getConstructedNetworkAttester,
  getConstructedNetworkAttesters,
} from "./attester.helper";

const router = Router();

router.get("/:network", async (req, res) => {
  const { network } = req.params;

  res.send(JSON.stringify(getConstructedNetworkAttesters(network)));
});

router.get("/:network/:attester", async (req, res) => {
  const { network, attester } = req.params;

  res.send(JSON.stringify(getConstructedNetworkAttester(network, attester)));
});

export default router;
