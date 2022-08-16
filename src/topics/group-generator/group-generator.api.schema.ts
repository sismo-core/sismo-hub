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
  },
} as const;

export const groupRoutesSchemas = {
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
} as const;
