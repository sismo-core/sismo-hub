import { Network } from "topics/registry-tree";

const network = {
  title: "Network",
  description: "Network",
  type: "string",
  enum: Object.values(Network),
} as const;

const availableData = {
  title: "Available Data",
  description: "Available Data",
  type: "object",
  properties: {
    registryTreeName: {
      type: "string",
      description: "Registry tree name",
      example: "my-attester",
    },
    attesterName: {
      type: "string",
      description: "Attester name",
      example: "my-attester",
    },
    timestamp: {
      type: "number",
      description: "Available data generation timestamp",
      example: "1660065741",
    },
    identifier: {
      type: "string",
      description:
        "Identifier for the available data. Can be for instance the root of a merkle tree if the available data is a merkle tree",
      example: "0x198b000769a7a7a9c243ab7d4055cc3813e3ac7d566a1dd97f201e660fa835f0",
    },
    isOnChain: {
      type: "boolean",
      description: "Is currently on chain",
      example: "true",
    },
    transactionHash: {
      type: "string",
      description: "Transaction hash of the transaction that sent onchain the available data",
      example: "0x6b6679f2d029219f2219c4be4817653729d53d1d3846d12809ace267209104ff",
    },
    url: {
      type: "string",
      description: "Url to retrieve available data",
      example: "https://example.com/available-data/available-data.json",
    },
    network,
  },
} as const;

export const availableDataRoutesSchemas = {
  list: {
    description: "List available data for an attester",
    params: {
      type: "object",
      required: ["network", "registryTreeName"],
      properties: {
        network,
        registryTreeName: {
          type: "string",
          description: "Registry Tree name",
        },
      },
    },
    querystring: {
      type: "object",
      properties: {
        latest: {
          type: "boolean",
          description: "Keep only the last generation",
        },
        isOnChain: {
          type: "boolean",
          description: "Search only available data on chain",
        },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          items: {
            type: "array",
            items: availableData,
          },
        },
      },
    },
  },
} as const;
