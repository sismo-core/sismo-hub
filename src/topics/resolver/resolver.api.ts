import { FastifyRequest } from "fastify";
import { resolverRoutesSchemas } from "./resolver.api.schema";
import { Api } from "api";
import { FetchedData } from "topics/group";

const routes = async (api: Api) => {
  api.post("/resolver", { schema: resolverRoutesSchemas.resolveAll }, async (req) => {
    const accounts: string[] = getAccounts(req);
    if (accounts.length === 0) {
      return [];
    }
    const fetchedData: FetchedData = {};
    for (const account of accounts) {
      fetchedData[account] = 1;
    }
    const resolved = await api.globalResolver.resolveAll(fetchedData);
    return Object.keys(resolved.resolvedIdentifierData);
  });
};

const getAccounts = (req: FastifyRequest) => {
  let accounts: string[];
  if (typeof req.body === "string") {
    // When the request content type is plain text, the body is a string
    accounts = JSON.parse(req.body as string);
  } else {
    accounts = req.body as string[];
  }
  return accounts;
};

export default routes;
