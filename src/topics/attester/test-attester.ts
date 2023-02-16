/* istanbul ignore file */
import { Network } from ".";

export const testAttester = {
  networksConfiguration: {
    [Network.Test]: {
      attesterAddress: "0xa73a8094E303A823a8b64089fFD79913E76092cF",
      rootsRegistryAddress: "0x4CA636f37b577BfEEcE58eEc19053AC4490365BB",
    },
  },
  name: "test-attester",
};

export const testAttesters = {
  "test-attester": testAttester,
};
