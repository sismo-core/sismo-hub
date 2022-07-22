import { Router } from "express";
import { AttesterNetwork } from "../attester";
import {
  serializeAttesterApiType,
  serializeNetworkAttestersApiType,
} from "../attester/attester.api.helpers";
import {
  getNetworkAttester,
  getNetworkAttesters,
} from "../attester/attester.helper";

const router = Router();

router.get("/:network", async (req, res) => {
  const { network } = req.params;

  const serializedNetworkAttesters = serializeNetworkAttestersApiType(
    await getNetworkAttesters(network as AttesterNetwork)
  );

  const badges = Object.keys(serializedNetworkAttesters).map((attesterName) =>
    serializedNetworkAttesters[attesterName]?.attestationsCollections.map(
      (collection) => collection?.badge
    )
  );

  if (badges.length === 0) {
    res.status(404);
  }

  res.json(badges);
});

router.get("/:network/:attester", async (req, res) => {
  const { network, attester } = req.params;

  const serializedAttester = serializeAttesterApiType(
    await getNetworkAttester(network as AttesterNetwork, attester)
  );

  const badges = serializedAttester?.attestationsCollections?.map(
    (collection) => collection?.badge
  );

  if (serializedAttester?.name === undefined || badges?.length === 0) {
    res.status(404);
  }

  res.json(badges);
});

export default router;
