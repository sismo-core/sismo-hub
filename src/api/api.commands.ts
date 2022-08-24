import "@fastify/swagger";
import { Option } from "commander";
import {
  ApiConfigurationDefault,
  createApiWithDefaults,
} from "./api-configuration";
import { DataSourcesCmd, GlobalOptions } from "cli/command";

type ApiOptions = Pick<
  GlobalOptions,
  "availableDataStore" | "availableGroupStore" | "groupStore"
> & {
  port: number;
  staticUrl?: string;
};

export const getApi = (
  {
    availableDataStore,
    availableGroupStore,
    groupStore,
    staticUrl,
  }: ApiOptions,
  defaultConfiguration: ApiConfigurationDefault = ApiConfigurationDefault.Local
) =>
  createApiWithDefaults(defaultConfiguration, {
    availableDataStore: availableDataStore,
    availableGroupStore: availableGroupStore,
    groupStore: groupStore,
    ...(staticUrl ? { staticPrefix: staticUrl } : {}),
  });

/* istanbul ignore next */
export const startApi = async (options: ApiOptions): Promise<void> => {
  await getApi(options).listen({ port: options.port });
};

export const apiCmd = new DataSourcesCmd("api");
apiCmd.addOption(
  new Option("--port <number>", "Listen to specific port")
    .default(8000)
    .argParser(parseInt)
);
apiCmd.addOption(
  new Option(
    "--static-url <string>",
    "Static URL. If set, static assets won't be served by this API."
  )
);
apiCmd.action(startApi);

export const lambdaApiCmd = new DataSourcesCmd("api");
lambdaApiCmd.addOption(
  new Option(
    "--static-url <string>",
    "Static URL. If set, static assets won't be served by this API."
  )
);
/* istanbul ignore next */
// eslint-disable-next-line @typescript-eslint/no-empty-function
lambdaApiCmd.action(() => {});

export const getOpenApi = async (options: ApiOptions) => {
  const api = await getApi(options);
  await api.ready();
  return api.swagger();
};

/* istanbul ignore next */
export const openApi = async (options: ApiOptions): Promise<void> =>
  console.log(JSON.stringify(await getOpenApi(options)));

export const openApiCmd = new DataSourcesCmd("generate-openapi");
openApiCmd.action(openApi);
