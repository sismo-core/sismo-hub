import { Option } from "commander";
import { FastifyInstance } from "fastify";
import {
  createFastifyWithDefaults,
  ApiConfigurationDefault,
} from "./api-configuration";
import { DataSourcesCmd, GlobalOptions } from "cli/command";

type ApiOptions = Pick<
  GlobalOptions,
  "attesterLibrary" | "groupStore" | "groupGeneratorLibrary"
> & {
  port: number;
};

export const getFastify = ({
  attesterLibrary,
  groupStore,
  groupGeneratorLibrary,
}: ApiOptions): FastifyInstance => {
  return createFastifyWithDefaults(ApiConfigurationDefault.Local, {
    attesterLibrary: attesterLibrary,
    groupStore: groupStore,
    groupGeneratorLibrary: groupGeneratorLibrary,
  });
};

/* istanbul ignore next */
export const startApi = async (options: ApiOptions): Promise<void> => {
  await getFastify(options).listen({ port: options.port });
};

export const apiCmd = new DataSourcesCmd("api");
apiCmd.addOption(
  new Option("--port <number>", "Listen to specific port")
    .default(8000)
    .argParser(parseInt)
);
apiCmd.action(startApi);
