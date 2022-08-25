/* istanbul ignore file */
import awsLambdaFastify from "@fastify/aws-lambda";
import { ApiOptions, lambdaApiCmd } from "./api.commands";
import { ConfigurationDefault, ServiceFactory } from "service-factory";

export const handler = async (event: any, context: any) => {
  await lambdaApiCmd.parseAsync([], { from: "user" });
  const options = lambdaApiCmd.opts<ApiOptions>();
  const apiService = ServiceFactory.withDefault(
    ConfigurationDefault.Local,
    options
  ).getApiService(true, options.staticUrl);
  return awsLambdaFastify(apiService.getApi())(event, context);
};
