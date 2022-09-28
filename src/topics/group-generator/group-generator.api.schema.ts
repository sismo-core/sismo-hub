import { GenerationFrequency } from "topics/group-generator";

const groupGenerator = {
  title: "Group Generator",
  description: "Group Generator",
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Group generator name",
      example: "Example group generator",
    },
    generationFrequency: {
      type: "string",
      description: "Generation frequency",
      enum: Object.values(GenerationFrequency),
    },
    generationTimestamp: {
      type: "number",
      description: "Last generation timestamp",
      example: 1664371502,
    },
  },
} as const;

export const groupGeneratorsRoutesSchemas = {
  list: {
    description: "List group generators",
    response: {
      200: {
        description: "Group generators",
        type: "object",
        properties: {
          items: {
            type: "array",
            items: groupGenerator,
          },
        },
      },
    },
  },
  get: {
    description: "get group generators generations",
    params: {
      type: "object",
      required: ["generatorName"],
      properties: {
        generatorName: {
          type: "string",
          description: "Name for the group generator",
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
        description: "Group generator",
        type: "object",
        properties: {
          items: {
            type: "array",
            items: groupGenerator,
          },
        },
      },
    },
  },
} as const;
