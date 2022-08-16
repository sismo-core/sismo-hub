const availableData = {
  title: "Available Data",
  description: "Available Data",
  type: "object",
  properties: {
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
    metadata: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "Url to retrieve available data",
          example: "https://example.com/available-data/available-data.json",
        },
      },
    },
  },
} as const;

export const availableDataRoutesSchemas = {
  list: {
    description: "List available data for an attester",
    params: {
      type: "object",
      required: ["attesterName"],
      properties: {
        attesterName: {
          type: "string",
          description: "Attester name",
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
