import { hydraS1LocalAttester } from "./hydra-s1-local";
import { hydraS1SimpleAttester } from "./hydra-s1-simple";
import { AttestersLibrary } from "topics/attester";

export const attesters: AttestersLibrary = {
  "hydra-s1-local": hydraS1LocalAttester,
  "hydra-s1-simple": hydraS1SimpleAttester,
};
