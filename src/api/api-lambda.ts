/* istanbul ignore file */
import awsLambdaFastify from "@fastify/aws-lambda";
import { ApiConfigurationDefault, ApiService } from "./api";
import { lambdaApiCmd } from "./api.commands";

export const handler = async (event: any, context: any) => {
  await lambdaApiCmd.parseAsync([], { from: "user" });
  const apiService = ApiService.fromDefault(
    ApiConfigurationDefault.Local,
    lambdaApiCmd.opts()
  );
  return awsLambdaFastify(apiService.getApi())(event, context);
};
