import HydraS1SimpleAttester from "./hydra-s1-simple";

import { ClassLibrary } from "helpers";
import { Attester } from "topics/attester";

const attesters = {
  "hydra-s1-simple": HydraS1SimpleAttester,
};

export const attesterLibrary = new ClassLibrary<Attester>(attesters);
