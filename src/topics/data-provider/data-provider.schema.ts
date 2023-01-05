const dataProviderInterface = {
  title: "Data Provider",
  description: "Data Provider",
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Data Provider name",
      example: "Github",
    },
    iconUrl: {
      type: "string",
      description: "Data Provider icon URL",
      example: "https://example.com/icon.svg",
    },
    providerClassName: {
      type: "string",
      description: "Data Provider class name",
      example: "GithubProvider",
    },
    functions: {
      type: "array",
      description: "Data Provider functions",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Function name",
            example: "Repositories Contributors",
          },
          functionName: {
            type: "string",
            description: "Function name",
            example: "getRepositoriesContributors",
          },
          countFunctionName: {
            type: "string",
            description:
              "Function that will send back the number of accounts for the provider function",
            example: "getFollowersCount",
          },
          description: {
            type: "string",
            description: "Function description",
            example:
              "Return all Github accounts which have contributed to a list of specific repositories",
          },
          args: {
            type: "array",
            description: "Function arguments",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Argument name",
                  example: "repositories",
                },
                argName: {
                  type: "string",
                  description: "Argument name",
                  example: "repositories",
                },
                type: {
                  type: "string",
                  description: "Argument type",
                  example: "string[]",
                },
                example: {
                  type: "string",
                  description: "Argument example",
                  example: "sismo-core/sismo-hub, sismo-core/sismo-protocol",
                },
                description: {
                  type: "string",
                  description: "Argument description",
                  example: "List of repositories, comma separated",
                },
              },
            },
          },
        },
      },
    },
  },
};

export const dataProviderInterfacesRoutesSchemas = {
  list: {
    description: "List data providers",
    response: {
      200: {
        description: "Data providers",
        type: "object",
        properties: {
          items: {
            type: "array",
            items: dataProviderInterface,
          },
        },
      },
    },
  },
  post: {
    description: "List data providers",
    params: {
      type: "object",
      required: ["providerName", "countFunctionName"],
      properties: {
        providerName: {
          type: "string",
          description: "Data Provider name",
        },
        countFunctionName: {
          type: "string",
          description: "Data Provider count function name",
        },
      },
    },
    response: {
      200: {
        description: "Data providers",
        type: "number",
      },
    },
  },
};
