/* istanbul ignore file */
import { ethers } from "ethers";
import { gql } from "graphql-request";
import { IResolver } from "./resolver";
import { domain } from "@group-generators/helpers/data-providers/ens/types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { JsonRpcProvider } from "@group-generators/helpers/data-providers/json-rpc";

export class EnsResolver extends GraphQLProvider implements IResolver {
  _jsonRpcUrl: string | undefined;
  provider: JsonRpcProvider | ethers.providers.BaseProvider;

  constructor(jsonRpcUrl = process.env.JSON_RPC_URL) {
    super({
      url: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
    });
    this._jsonRpcUrl = jsonRpcUrl;
    this._jsonRpcUrl
      ? (this.provider = new JsonRpcProvider(this._jsonRpcUrl))
      : (this.provider = ethers.getDefaultProvider());
  }

  public async resolve(ensDataArray: string[]): Promise<string[]> {
    const ensData = ensDataArray[0];
    const domains = await this.query<{
      domains: domain[];
    }>(
      gql`
        query getDomain($ensName: String) {
          domains(where: { name: $ensName }) {
            name
            resolvedAddress {
              id
            }
          }
        }
      `,
      { ensName: ensData }
    );
    const userData = domains.domains[0];

    try {
      return [userData.resolvedAddress.id];
    } catch (error) {
      // ens user address is not in the subgraph, calling ENS Registry with ethers
      return this.resolveEnsFromJsonRpc(ensData);
    }
  }

  public async resolveEnsFromJsonRpc(ens: string): Promise<string[]> {
    // another try to prevent this type of invalid address https://etherscan.io/enslookup-search?search=karl.floersch.eth
    try {
      const resolvedAddress: string | null = await this.provider.resolveName(
        ens
      );
      if (resolvedAddress === null) {
        return ["0x0000000000000000000000000000000000000000"];
      }
      return [resolvedAddress];
    } catch (error) {
      console.log(`invalid address for ${ens}`);
      // invalid address for ensUser.name
      return ["0x0000000000000000000000000000000000000000"];
    }
  }
}
