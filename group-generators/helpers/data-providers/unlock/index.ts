import { gql } from "graphql-request";
// eslint-disable-next-line no-restricted-imports
import { SubgraphHostedServiceProvider } from "../subgraph";
import {
  chainSelector,
  QueryUnlockOutput,
  QueryUnlockInput,
  IUnlockSubgraphProvider,
} from "./types";
import { FetchedData } from "topics/group";

export class UnlockSubgraphProvider
  extends SubgraphHostedServiceProvider
  implements IUnlockSubgraphProvider
{
  constructor(url?: string) {
    super({
      url:
        url ??
        "https://api.thegraph.com/subgraphs/name/unlock-protocol/mainnet-v2",
    });
  }

  public async getKeysInLock({
    lockAddress,
    chain,
  }: QueryUnlockInput): Promise<FetchedData> {
    this.setUrl(chain);
    const query = gql`
      query locks {
        locks(
          where: {
            address: "${lockAddress}"
          }
        ) {
          keys {
            owner {
              address
            }
            expiration
          }
        }
      }
    `;

    const res: QueryUnlockOutput = await this.query<QueryUnlockOutput>(query);
    const holders: FetchedData = {};
    res.locks[0].keys.forEach((key) => {
      holders[key.owner] = 1;
    });
    console.log(holders);
    return holders;
  }

  public async getKeysInLockCount({
    lockAddress,
    chain,
  }: QueryUnlockInput): Promise<number> {
    const keys = await this.getKeysInLock({
      lockAddress,
      chain,
    });
    return Object.keys(keys).length;
  }

  private setUrl(chain: string) {
    if (chainSelector[chain]) {
      this.graphQLClient.setEndpoint(chainSelector[chain]);
    } else {
      throw new Error(
        "Chain not supported. Only supports mainnet, goerli, optimism, bsc, gnosis, polygon, arbitrum, celo, avalanche"
      );
    }
  }
}
