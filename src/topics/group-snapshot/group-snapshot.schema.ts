const groupSnapshot = {
  title: "Group Snapshot",
  description: "Group Snapshot",
  type: "object",
  properties: {
    groupId: {
      type: "string",
      description: "Group Id (uint128)",
      example: "0x826cd6fa6e8b22299e794a530250852f",
    },
    name: {
      type: "string",
      description: "Group name",
      example: "Example Badge",
    },
    timestamp: {
      type: "number",
      description: "Group snapshot timestamp",
      example: "1660065741",
    },
    properties: {
      type: "object",
      description: "Group Snapshot properties",
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
      description: "Url to retrieve group snapshot data",
      example: "https://example.com/group-data/data.json",
    },
    dataIntegrity: {
      type: "string",
      description: "MD5 checksum of the group snapshot data",
      example: "md5-d41d8cd98f00b204e9800998ecf8427e",
    },
    resolvedIdentifierDataIntegrity: {
      type: "string",
      description:
        "MD5 checksum of the group snapshot resolved identifier data",
      example: "md5-d41d8cd98f00b204e9800998ecf8427e",
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
