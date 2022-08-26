/* istanbul ignore file */
import { Attester, Network } from ".";
import { ValueType } from "topics/group";

export const testAttester: Attester = {
  name: "test-attester",
  networks: [Network.Test],
  attestationsCollections: [
    {
      internalCollectionId: 0,
      groupFetcher: async () => [
        {
          name: "test-group",
          timestamp: 1,
          data: async () => ({ "0x1": 1, "0x2": 1 }),
          tags: [],
          valueType: ValueType.Info,
        },
        {
          name: "test-group",
          timestamp: 2,
          data: async () => ({ "0x3": 1, "0x4": 1 }),
          tags: [],
          valueType: ValueType.Info,
        },
      ],
    },
    {
      internalCollectionId: 1,
      groupFetcher: async () => [
        {
          name: "test-group2",
          timestamp: 3,
          data: async () => ({ "0x5": 1, "0x6": 1 }),
          tags: [],
          valueType: ValueType.Info,
        },
      ],
    },
  ],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  makeGroupsAvailable: async (groups, computeContext) => "0x1",

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendOnChain: async (identifier, computeContext) => "fakeHash",
};

export const testAttesters = {
  "test-attester": testAttester,
};
