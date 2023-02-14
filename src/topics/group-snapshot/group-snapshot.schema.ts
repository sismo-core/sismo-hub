import { AccountSource, Tags, ValueType } from "topics/group";

const valueType = {
  description: "Value Type",
  type: "string",
  enum: Object.values(ValueType),
} as const;

const groupSnapshot = {
  title: "Group Snapshot",
  description: "Group Snapshot",
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "Group Id",
      example: "123-456-789",
    },
    name: {
      type: "string",
      description: "Badge name",
      example: "Example Badge",
    },
    timestamp: {
      type: "number",
      description: "Group generation timestamp",
      example: "1660065741",
    },
    generatedBy: {
      type: "string",
      description: "Name of the group generator",
      example: "my-group-generator",
    },
    valueType: valueType,
    accountSources: {
      type: "array",
      example: '["ethereum", "github"]',
      items: {
        type: "string",
        enum: Object.values(AccountSource),
      },
    },
    tags: {
      type: "array",
      example: '["NFT", "Web3Social"]',
      items: {
        type: "string",
        enum: Object.values(Tags),
      },
    },
    properties: {
      type: "object",
      description: "Badge properties",
      properties: {
        accountsNumber: {
          type: "number",
        },
        valueDistribution: {
          type: "object",
          example: "{ '1': 123, '2': 456 }",
          patternProperties: {
            "^[0-9]+$": {
              type: "number",
            },
          },
        },
      },
    },
    dataUrl: {
      type: "string",
      description: "Url to retrieve group data",
      example: "https://example.com/group-data/data.json",
    },
  },
} as const;

const groupSnapshotList = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: groupSnapshot,
    },
  },
} as const;

export const groupSnapshotRoutesSchemas = {
  listById: {
    description: "List group snapshots for an id",
    params: {
      type: "object",
      required: ["groupId"],
      properties: {
        groupId: {
          type: "string",
          description: "Group Id",
        },
      },
    },
    querystring: {
      type: "object",
      properties: {
        timestamp: {
          anyOf: [
            {
              type: "number",
              description:
                "Keep only the generation at the specified timestamp",
            },
            {
              type: "string",
              description:
                "Keep only the generation at the specified timestamp",
            },
          ],
        },
      },
    },
    response: {
      200: groupSnapshotList,
    },
  },
  listByName: {
    description: "List group snapshots for a name",
    params: {
      type: "object",
      required: ["groupName"],
      properties: {
        groupName: {
          type: "string",
          description: "Group name",
        },
      },
    },
    querystring: {
      type: "object",
      properties: {
        timestamp: {
          anyOf: [
            {
              type: "number",
              description:
                "Keep only the generation at the specified timestamp",
            },
            {
              type: "string",
              description:
                "Keep only the generation at the specified timestamp",
            },
          ],
        },
      },
    },
    response: {
      200: groupSnapshotList,
    },
  },
  latests: {
    description: "Get all latests group snapshots",
    response: {
      200: groupSnapshotList,
    },
  },
} as const;
