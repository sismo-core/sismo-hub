/* istanbul ignore file */
import { Attester, AvailableGroupsMetadata, Network } from ".";
import { ClassLibrary } from "helpers";
import { ValueType } from "topics/group";

export class TestAttester extends Attester {
  name = "test-attester";
  networks = {
    [Network.Polygon]: { address: "", collectionIdFirst: 1001 },
  };
  attestationsCollections = [
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
      badge: {
        name: "Test Badge",
        description: "Test Badge",
        image: "./badges/test.svg",
        attributes: {},
        requirements: [],
      },
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
      badge: {
        name: "Test Badge 2",
        description: "Test Badge 2",
        image: "./badges/test2.svg",
        attributes: {},
        requirements: [],
      },
    },
  ];

  protected async makeGroupsAvailable(): Promise<AvailableGroupsMetadata> {
    return {
      url: "https://fake-available-data-url/",
    };
  }
}

export const attesterLibrary = new ClassLibrary<Attester>({
  "test-attester": TestAttester,
});
