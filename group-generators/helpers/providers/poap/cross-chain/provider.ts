import { BigNumber } from "ethers";
import { PoapQueryEventTokenOwnersInput } from "..";
import { FetchedData } from "../../../../../src/group";
import PoapSubgraphProvider from "../provider";
import { QueryEventsTokensOwnersInput } from "../types";
import {
  IPoapCrossChainSubgraphProvider,
  PoapCrossChainSubgraphProviderConstructor,
} from "./types";

export default class PoapCrossChainSubgraphProvider
  implements IPoapCrossChainSubgraphProvider
{
  poapProviders: PoapSubgraphProvider[] = [];

  constructor({ chainTargets }: PoapCrossChainSubgraphProviderConstructor) {
    for (const chainTarget of chainTargets) {
      this.poapProviders.push(new PoapSubgraphProvider({ chainTarget }));
    }
  }

  async queryEventTokenOwners(
    input: PoapQueryEventTokenOwnersInput
  ): Promise<FetchedData> {
    const resultingData: FetchedData = {};

    for (const poapProvider of this.poapProviders) {
      const currentProviderResultingData =
        await poapProvider.queryEventTokenOwners(input);

      for (const address of Object.keys(currentProviderResultingData)) {
        resultingData[address] = BigNumber.from(
          resultingData[address] ?? 0
        ).add(currentProviderResultingData[address]);
      }
    }

    return resultingData;
  }

  async queryEventsTokenOwners(
    input: QueryEventsTokensOwnersInput
  ): Promise<FetchedData> {
    const resultingData: FetchedData = {};

    for (const poapProvider of this.poapProviders) {
      const currentProviderResultingData =
        await poapProvider.queryEventsTokenOwners(input);

      for (const address of Object.keys(currentProviderResultingData)) {
        resultingData[address] = BigNumber.from(
          resultingData[address] ?? 0
        ).add(currentProviderResultingData[address]);
      }
    }

    return resultingData;
  }
}
