import HydraS1SimpleAttester from "./hydra-s1-simple";

import { Attester } from "topics/attester";

export const attesters: { [name: string]: typeof Attester } = {
  "hydra-s1-simple": HydraS1SimpleAttester,
};
