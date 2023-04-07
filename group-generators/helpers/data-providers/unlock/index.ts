import { gql } from "graphql-request";
// eslint-disable-next-line no-restricted-imports
import { SubgraphHostedServiceProvider } from "../subgraph";
import {
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
    address,
  }: QueryUnlockInput): Promise<FetchedData> {
    const query = gql`
      query locks {
        locks(
          where: {
            address: "${address}"
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
    const keys = res.locks.keys;
    const holders: FetchedData = {};
    for (const address of keys) {
      holders[address.owner.address] = 1;
    }
    console.log("here");
    console.log(holders);
    return holders;
  }
}
