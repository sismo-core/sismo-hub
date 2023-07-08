import { Network } from "topics/registry-tree";

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
    groupGeneratorName: {
      type: "string",
      description: "GroupGenerator name",
      example: "example-group-generator-name",
    },
    publicContacts: {
      type: "array",
      description: "Contacts of GroupGenerator creators",
      example: '[{type: "github", contact: "leosayous21"}]',
      items: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description: "Website/App of the contact",
            example: "github",
          },
          contact: {
            type: "string",
            description: "Id on website/app",
            example: "leosayous21",
          },
        },
      },
    },
    eligibility: {
      type: "object",
      description: "Criterias of eligibility for the badge",
      example:
        '{"shortDescription": "my short description", "specification": "my technical specification"}',
      properties: {
        shortDescription: {
          type: "string",
          description: "a short description about eligibility",
          example: "",
        },
        specification: {
          type: "string",
          description: "a technical specification about eligibility",
          example: "",
        },
      },
    },
    links: {
      type: "array",
      description: "Links about the project that created the badge",
      example: '[{logoUrl: "", label: "PoH", url:"https://www.proofofhumanity.id/"}]',
      items: {
        type: "object",
        properties: {
          logoUrl: {
            type: "string",
            description: "Url of the logo",
            example: "",
          },
          label: {
            type: "string",
            description: "label of the project",
            example: "PoH",
          },
          url: {
            type: "string",
            description: "Url of the project",
            example: "https://www.proofofhumanity.id/",
          },
        },
      },
    },
    collectionId: {
      type: "number",
      description: "Badge collection id",
      example: "10001",
    },
    network: network,
    networks: {
      type: "array",
      description: "List of networks on which the badge exist",
      items: network,
    },
    attributes: {
      type: "array",
      description: "Badge attributes",
      items: {
        type: "object",
        properties: {
          trait_type: {
            type: "string",
            description: "Badge attribute",
            example: "PRIVACY",
          },
          value: {
            type: "string",
            description: "Badge attribute value",
            example: "Very High",
          },
        },
      },
    },
    isCurated: {
      type: "boolean",
      description: "Is badge curated by the DAO",
      example: "true",
    },
  },
} as const;

const badgeNotFound = {
  description: "Badge not found",
  type: "object",
  properties: {
    message: {
      type: "string",
    },
  },
} as const;

export const badgeRoutesSchemas = {
  list: {
    description: "List all badges for an environment",
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
  metadata: {
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
      200: badge,
      404: badgeNotFound,
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
      200: {
        description: "Badge metadata",
        type: "object",
        properties: {
          items: {
            type: "array",
            items: badge,
          },
        },
      },
      404: badgeNotFound,
    },
  },
} as const;
