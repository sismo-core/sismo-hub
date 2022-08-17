export const fileStoreSchemas = {
  get: {
    description: "Download file from file store",
    hide: true,
    params: {
      type: "object",
      required: ["*"],
      properties: {
        "*": {
          type: "string",
          description: "File path",
        },
      },
    },
    response: {
      "200": {
        description: "File content",
        type: "object",
        additionalProperties: true,
      },
      404: {
        description: "File not found",
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
    },
  },
} as const;
