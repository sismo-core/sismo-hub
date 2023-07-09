/* istanbul ignore file */
import awsLambdaFastify from "@fastify/aws-lambda";
import { ApiOptions, lambdaApiCmd } from "./api.commands";
import { ServiceFactory } from "service-factory";

let options: ApiOptions;
let lambdaFastify: any;

export const handler = async (event: any, context: any) => {
  if (!options) {
    await lambdaApiCmd.parseAsync([], { from: "user" });
    options = lambdaApiCmd.opts<ApiOptions>();
    const apiService = ServiceFactory.withDefault(options.env, options).getApiService(
      true,
      options.staticUrl
    );
    lambdaFastify = awsLambdaFastify(apiService.getApi());
  }

  return lambdaFastify(event, context);
};
