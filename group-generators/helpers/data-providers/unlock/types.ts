import { ISubgraphProvider } from "@group-generators/helpers/data-providers/subgraph";
import { FetchedData } from "topics/group";

export type QueryUnlockOutput = {
  locks: {
    keys: [
      {
        owner: {
          address: string;
        };
        expiration: string;
      }
    ];
  };
};

export type QueryUnlockInput = { address: string };

export interface IUnlockSubgraphProvider extends ISubgraphProvider {
  getKeysInLock(input: QueryUnlockInput): Promise<FetchedData>;
}
