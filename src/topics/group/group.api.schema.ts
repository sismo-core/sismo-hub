import { ValueType, Tags } from ".";

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
      description: "group name",
      example: "example-group",
    },
    displayName: {
      type: "string",
      description: "group display name",
      example: "Example Group",
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
    publicContacts: {
      type: "array",
      description: "Public contacts",
      example: "[\"{ 'type': 'twitter', 'contact': '@Sismo_eth' }\"]",
      items: {
        type: "object",
        properties: {
          type: {
            type: "string",
            example: "twitter",
          },
          contact: {
            type: "string",
            example: "@Sismo_eth",
          },
        },
      },
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
        minValue: {
          type: "string",
          example: "1",
        },
        maxValue: {
          type: "string",
          example: "10",
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
  computeId: {
    description: "Compute group id from group name",
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
    response: {
      200: {
        type: "object",
        properties: {
          groupId: {
            type: "string",
            description: "Group id (uint128)",
            example: "0x5f7e599835506cf5eab5de725c41cc14",
          },
          groupName: {
            type: "string",
            description: "Group name",
            example: "example-group",
          },
        },
      },
    },
  },
} as const;
