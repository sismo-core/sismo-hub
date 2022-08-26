const flow = {
  title: "Flow",
  description: "Flow",
  type: "object",
  properties: {
    path: {
      type: "string",
      description: "Flow path",
      example: "my-flow",
    },
    attester: {
      type: "string",
      description: "Attester name",
      example: "attester-1",
    },
    attesterType: {
      type: "string",
      description: "Attester type",
      example: "hydra-s1",
    },
    chainId: {
      type: "number",
      description: "Network chain ID",
      example: "137",
    },
    badgeIds: {
      type: "array",
      description: "Badge Ids",
      example: "[10001, 10005]",
      items: {
        type: "number",
      },
    },
    title: {
      type: "string",
      description: "Flow title",
      example: "Flow title",
    },
    logoUrl: {
      type: "string",
      nullable: true,
      description: "Logo URL",
      example: "https://example.com/logo.svg",
    },
    subtitle: {
      type: "string",
      description: "Flow subtitle",
      example: "Flow subtitle",
    },
    onboardingDescription: {
      type: "string",
      description: "Flow onboarding description",
      example: "Flow onboarding description",
    },
    ctaLabel: {
      type: "string",
      description: "Call to action Label",
      example: "Access gated channel",
    },
    ctaUrl: {
      type: "string",
      description: "Call to action URL",
      example: "https://example.com/access",
    },
    congratulationTexts: {
      type: "array",
      description: "Flow congratulation texts",
      example: ["Congratulation"],
      items: {
        type: "string",
      },
    },
  },
} as const;

export const flowsRoutesSchemas = {
  list: {
    description: "List flows",
    response: {
      200: {
        description: "Flows",
        type: "object",
        properties: {
          items: {
            type: "array",
            items: flow,
          },
        },
      },
    },
  },
} as const;
