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
    valueType: valueType,
    tags: {
      type: "array",
      example: '["NFT", "Web3Social"]',
      items: {
        type: "string",
        enum: Object.values(Tags),
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
