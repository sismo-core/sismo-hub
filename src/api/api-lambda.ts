/* istanbul ignore file */
import awsLambdaFastify from "@fastify/aws-lambda";
import { getApi, lambdaApiCmd } from "./api.commands";

export const handler = async (event: any, context: any) => {
  await lambdaApiCmd.parseAsync([], { from: "user" });
  const app = getApi(lambdaApiCmd.opts());
  return awsLambdaFastify(app)(event, context);
};
