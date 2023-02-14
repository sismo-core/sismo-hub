import { createAvailableDataEntityManager } from "infrastructure/available-data/available-data.entity";
import { DynamoDBAvailableDataStore } from "infrastructure/available-data/dynamodb-available-data";
import { resetDB, getLocalDocumentClient } from "infrastructure/utils";
import { Network } from "topics/attester";
import { testAvailableData } from "topics/available-data/test-available-data";

const dynamodbClient = getLocalDocumentClient();

describe("test available data", () => {
  const dynamoDBAvailableDataStore = new DynamoDBAvailableDataStore(
    createAvailableDataEntityManager({
      documentClient: dynamodbClient,
    })
  );

  beforeEach(async () => {
    await resetDB(dynamodbClient);
  });

  it("Should generate multiple available data and search by name", async () => {
    await dynamoDBAvailableDataStore.save(testAvailableData.attester1_0);
    await dynamoDBAvailableDataStore.save(testAvailableData.attester1_1);
    await dynamoDBAvailableDataStore.save(testAvailableData.attester2_0);

    const attester1 = await dynamoDBAvailableDataStore.search({
      attesterName: testAvailableData.attester1_0.attesterName,
      network: Network.Test,
    });
    expect(attester1).toHaveLength(2);
    expect(attester1).toContainEqual(testAvailableData.attester1_0);
    expect(attester1).toContainEqual(testAvailableData.attester1_1);
  });

  it("Should generate multiple available data and search by name and latest", async () => {
    await dynamoDBAvailableDataStore.save(testAvailableData.attester1_0);
    await dynamoDBAvailableDataStore.save(testAvailableData.attester1_1);
    await dynamoDBAvailableDataStore.save(testAvailableData.attester2_0);

    const latest1 = await dynamoDBAvailableDataStore.search({
      attesterName: testAvailableData.attester1_0.attesterName,
      network: Network.Test,
      latest: true,
    });
    expect(latest1[0]).toEqual(testAvailableData.attester1_1);

    const latest2 = await dynamoDBAvailableDataStore.search({
      attesterName: testAvailableData.attester2_0.attesterName,
      network: Network.Test,
      latest: true,
    });
    expect(latest2[0]).toEqual(testAvailableData.attester2_0);
  });

  it("Should generate multiple available data and search by is on chain", async () => {
    await dynamoDBAvailableDataStore.save(testAvailableData.attester1_0);
    await dynamoDBAvailableDataStore.save(testAvailableData.attester1_1);
    await dynamoDBAvailableDataStore.save(testAvailableData.attester1_2);
    await dynamoDBAvailableDataStore.save(testAvailableData.attester2_0);

    const onChainAvailableData = await dynamoDBAvailableDataStore.search({
      attesterName: testAvailableData.attester1_0.attesterName,
      network: Network.Test,
      isOnChain: true,
    });

    expect(onChainAvailableData).toHaveLength(1);
    expect(onChainAvailableData[0].transactionHash).toEqual("0x1000");

    const notOnChainAvailableData = await dynamoDBAvailableDataStore.search({
      attesterName: testAvailableData.attester1_0.attesterName,
      network: Network.Test,
      isOnChain: false,
    });
    expect(notOnChainAvailableData).toHaveLength(1);
    expect(notOnChainAvailableData[0].identifier).toEqual("0x11");
  });

  it("Should search latest in empty store and get empty array", async () => {
    const availableData = await dynamoDBAvailableDataStore.search({
      attesterName: testAvailableData.attester1_0.attesterName,
      network: Network.Test,
      latest: true,
    });
    expect(availableData).toHaveLength(0);
  });
});
