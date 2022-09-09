/* istanbul ignore file */
import awsLambdaFastify from "@fastify/aws-lambda";
import { ApiOptions, lambdaApiCmd } from "./api.commands";
import { ConfigurationDefault, ServiceFactory } from "service-factory";

let options: ApiOptions;

export const handler = async (event: any, context: any) => {
  if (!options) {
    await lambdaApiCmd.parseAsync(["--storage-type", "aws"], { from: "user" });
    options = lambdaApiCmd.opts<ApiOptions>();
  }
  console.log(options);
  const apiService = ServiceFactory.withDefault(
    ConfigurationDefault.Dev,
    options
  ).getApiService(true, options.staticUrl);
  console.log(apiService);
  return awsLambdaFastify(apiService.getApi())(event, context);
};
