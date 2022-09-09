import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DocumentClientV3 } from "@typedorm/document-client";

export const getLocalDocumentClient = () =>
  new DocumentClientV3(
    new DynamoDBClient({
      endpoint: "http://localhost:9000",
      region: "eu-west-1",
    })
  );

export const resetDB = async (documentClient: DocumentClientV3) => {
  const all = await documentClient.scan({
    TableName: "global-table",
  });
  /* istanbul ignore if */
  if (!all.Items) {
    return;
  }
  for (const item of all.Items) {
    await documentClient.delete({
      TableName: "global-table",
      Key: {
        PK: item.PK,
        SK: item.SK,
      },
    });
  }
};
