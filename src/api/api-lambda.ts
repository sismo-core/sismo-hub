/* istanbul ignore file */
import awsLambdaFastify from "@fastify/aws-lambda";
import { ApiOptions, lambdaApiCmd } from "./api.commands";
import { ConfigurationDefault, ServiceFactory } from "service-factory";

let options: ApiOptions;

export const handler = async (event: any, context: any) => {
  if (!options) {
    await lambdaApiCmd.parseAsync([], { from: "user" });
    options = lambdaApiCmd.opts<ApiOptions>();
  }
  const defaultConfigurations = process.env[
    "SH_DEFAULT_CONFIGURATION"
  ] as ConfigurationDefault;
  const apiService = ServiceFactory.withDefault(
    defaultConfigurations ?? ConfigurationDefault.Local,
    options
  ).getApiService(true, options.staticUrl);
  console.log(apiService);
  return awsLambdaFastify(apiService.getApi())(event, context);
};
