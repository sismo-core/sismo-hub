/* istanbul ignore file */
import { Attester, Network } from ".";
import { AccountSource, ValueType } from "topics/group";
import { testGroupPropertiesEncoder } from "topics/group-properties-encoder";

export const testAttester: Attester = {
  name: "test-attester",
  network: Network.Test,
  groupPropertiesEncoder: testGroupPropertiesEncoder,
  attestationsCollections: [
    {
      internalCollectionId: 0,
      groupFetcher: async () => [
        {
          name: "test-group",
          timestamp: 1,
          data: async () => ({ "0x1": 1, "0x2": 1 }),
          resolvedIdentifierData: async (data = { "0x1": 1, "0x2": 1 }) => {
            return data;
          },
          accountSources: [AccountSource.ETHEREUM],
          tags: [],
          valueType: ValueType.Info,
        },
        {
          name: "test-group",
          timestamp: 2,
          data: async () => ({ "0x3": 1, "0x4": 1 }),
          resolvedIdentifierData: async (data = { "0x3": 1, "0x4": 1 }) => {
            return data;
          },
          accountSources: [AccountSource.ETHEREUM],
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
          resolvedIdentifierData: async (data = { "0x5": 1, "0x6": 1 }) => {
            return data;
          },
          accountSources: [AccountSource.ETHEREUM],
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  removeOnChain: async (identifier, computeContext) => {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  getGroupsAvailableDiff: async () => "",
};

export const testAttesters = {
  [Network.Test]: {
    "test-attester": testAttester,
  },
};
