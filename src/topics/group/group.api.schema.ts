import { ValueType, Tags, AccountSource } from ".";

const valueType = {
  description: "Value Type",
  type: "string",
  enum: Object.values(ValueType),
} as const;

const group = {
  title: "Group",
  description: "Group",
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "Group id (uint128)",
      example: "0x826cd6fa6e8b22299e794a530250852f",
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
    description: {
      type: "string",
      description: "Group eligibility description",
      example: "Example group description",
    },
    specs: {
      type: "string",
      description: "Highly detailed group eligibility specs",
      example: "Example group specs",
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
        tierDistribution: {
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

const groupList = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: group,
    },
  },
} as const;

export const groupRoutesSchemas = {
  list: {
    description: "List groups",
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
        latest: {
          type: "boolean",
          description: "Keep only the last generation",
        },
        timestamp: {
          type: "number",
          description: "Keep only the generation at the specified timestamp",
        },
      },
    },
    response: {
      200: groupList,
    },
  },
  latests: {
    description: "Get badge metadata",
    response: {
      200: groupList,
    },
  },
} as const;
