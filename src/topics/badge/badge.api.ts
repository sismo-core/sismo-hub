import { Router } from "express";
import {
  getConstructedNetworkAttester,
  getConstructedNetworkAttesters,
} from "../attester/attester.helper";

const router = Router();

router.get("/:network", async (req, res) => {
  const { network } = req.params;

  res.send(
    JSON.stringify(
      (await getConstructedNetworkAttesters(network)).map((attester) =>
        attester?.attestationsCollections.map((collection) => collection?.badge)
      )
    )
  );
});

router.get("/:network/:attester", async (req, res) => {
  const { network, attester } = req.params;

  res.send(
    JSON.stringify(
      (
        await getConstructedNetworkAttester(network, attester)
      )?.attestationsCollections.map((collection) => collection?.badge)
    )
  );
});

export default router;
