import { DynamoDBFlowStore } from "./dynamodb-flow-store";
import { createFlowEntityManager } from "./flow.entity";
import { resetDB, getLocalDocumentClient } from "infrastructure/utils";
import { testFlows } from "topics/flow/test-flows";

const dynamodbClient = getLocalDocumentClient();

describe("test group generator generation", () => {
  const dynamoDBFlowStore = new DynamoDBFlowStore(
    createFlowEntityManager({
      documentClient: dynamodbClient,
    })
  );

  beforeEach(async () => {
    await resetDB(dynamodbClient);
  });

  it("Should update all flows and retrieve them", async () => {
    await dynamoDBFlowStore.updateAll(testFlows);
    const flows = await dynamoDBFlowStore.all();
    expect(flows).toContainEqual(
        testFlows
    );
  });
});
