export const resolverRoutesSchemas = {
  resolveAll: {
    description: "Resolve accounts to identifiers",
    body: {
      type: "array",
      description: "Array of accounts to resolve",
      items: {
        type: "string",
      },
      examples: [`["github:dhadrien", "telegram:leo21_eth"]`],
    },
    response: {
      200: {
        type: "array",
        description: "Array of resolved identifiers",
        items: {
          type: "string",
        },
        examples: [
          `["0x1001000000000000000000000000000035774097", "0x1003000000000000000000000000001092424530"]`,
        ],
      },
    },
  },
};
