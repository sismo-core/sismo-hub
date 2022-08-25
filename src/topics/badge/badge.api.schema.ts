import { Network } from "topics/attester";

const network = {
  title: "Network",
  description: "Network",
  type: "string",
  enum: Object.values(Network),
} as const;

const badge = {
  title: "Badge",
  description: "Badge",
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Badge name",
      example: "Example Badge",
    },
    description: {
      type: "string",
      description: "Badge description",
      example: "This is an example badge",
    },
    image: {
      type: "string",
      description: "Image link",
      example: "https://example.com/badge.svg",
    },
    attributes: {
      type: "object",
      description: "Badge attributes",
      example: '{"attributeName": "attributeValue"}',
    },
    requirements: {
      type: "array",
      description: "Badge requirements",
      example: '["requirement1", "requirement2"]',
      items: {
        type: "string",
      },
    },
    collectionId: {
      type: "number",
      description: "Badge collection id",
      example: "10001",
    },
    network: network,
  },
} as const;

const badgeMetadata = {
  title: "Badge Metadata",
  description: "Badge Metadata",
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Badge name",
      example: "Example Badge",
    },
    description: {
      type: "string",
      description: "Badge description",
      example: "This is an example badge",
    },
    image: {
      type: "string",
      description: "Image link",
      example: "https://example.com/badge.svg",
    },
    attributes: {
      type: "object",
      description: "Badge attributes",
      example: '{"attributeName": "attributeValue"}',
    },
  },
} as const;

export const badgeRoutesSchemas = {
  networkList: {
    description: "List badges for a specific network",
    params: {
      type: "object",
      required: ["network"],
      properties: {
        network: network,
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          items: {
            type: "array",
            items: badge,
          },
        },
      },
    },
  },
  get: {
    description: "Get badge metadata",
    params: {
      type: "object",
      required: ["network", "collectionId"],
      properties: {
        network: network,
        collectionId: {
          type: "string",
          description: "Badge collection id",
        },
      },
    },
    response: {
      200: badgeMetadata,
      404: {
        description: "Badge not found",
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
