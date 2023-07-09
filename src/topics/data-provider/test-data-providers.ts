import { DataProviderInterface, DataProviders } from "topics/data-provider/data-provider";

export const testDataProvidersInterfacesSchemas: DataProviderInterface[] = [
  {
    name: "Test",
    iconUrl: "",
    providerClassName: "TestProvider",
    functions: [
      {
        name: "Get contributors of",
        functionName: "getTestsAccounts",
        countFunctionName: "getTestsCount",
        description: "Returns all Test accounts",
        args: [
          {
            name: "tests",
            argName: "tests",
            type: "string[]",
            example: "test1, test2",
            description: "List of tests, comma separated",
          },
        ],
      },
    ],
  },
];

const getTestDataProvidersInterfacesSchemas = (): DataProviderInterface[] => {
  return testDataProvidersInterfacesSchemas;
};

export const testDataProvidersAPIEndpoints = {
  TestProvider: {
    getTestsCount: async (input: any) => input.tests * 3,
  },
};

export const testDataProviders: DataProviders = {
  interfaces: getTestDataProvidersInterfacesSchemas,
  apiEndpoints: testDataProvidersAPIEndpoints,
};
