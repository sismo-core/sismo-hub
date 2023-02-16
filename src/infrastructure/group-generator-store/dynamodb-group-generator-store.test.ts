import { createGroupGeneratorStoreEntityManager } from "./group-generator.entity";
import { DynamoDBGroupGeneratorStore } from "infrastructure/group-generator-store";
import { resetDB, getLocalDocumentClient } from "infrastructure/utils";
import { testGeneratorGenerations } from "topics/group-generator/test-group-generator";

const dynamodbClient = getLocalDocumentClient();

describe("test group generator generation", () => {
  const dynamoDBGroupGeneratorStore = new DynamoDBGroupGeneratorStore(
    createGroupGeneratorStoreEntityManager({
      documentClient: dynamodbClient,
    })
  );

  beforeEach(async () => {
    await resetDB(dynamodbClient);
  });

  it("Should generate multiple group generator generation and search by name and latest", async () => {
    await dynamoDBGroupGeneratorStore.save(
      testGeneratorGenerations.testGeneration1_0
    );
    await dynamoDBGroupGeneratorStore.save(
      testGeneratorGenerations.testGeneration1_1
    );
    await dynamoDBGroupGeneratorStore.save(
      testGeneratorGenerations.testGeneration2_0
    );

    const generator1 = await dynamoDBGroupGeneratorStore.search({
      generatorName: testGeneratorGenerations.testGeneration1_0.name,
    });
    expect(generator1).toContainEqual(
      testGeneratorGenerations.testGeneration1_0
    );
    expect(generator1).toContainEqual(
      testGeneratorGenerations.testGeneration1_1
    );

    const latest1 = await dynamoDBGroupGeneratorStore.search({
      generatorName: testGeneratorGenerations.testGeneration1_0.name,
      latest: true,
    });
    expect(latest1[0]).toEqual(testGeneratorGenerations.testGeneration1_1);

    const latest2 = await dynamoDBGroupGeneratorStore.search({
      generatorName: testGeneratorGenerations.testGeneration2_0.name,
      latest: true,
    });
    expect(latest2[0]).toEqual(testGeneratorGenerations.testGeneration2_0);
  });

  it("Should search latest in empty store and get empty array", async () => {
    const availableData = await dynamoDBGroupGeneratorStore.search({
      generatorName: testGeneratorGenerations.testGeneration1_0.name,
      latest: true,
    });
    expect(availableData).toHaveLength(0);
  });
});
