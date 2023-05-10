
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    
    const githubProviderData0 = await githubProvider.getRepositoriesContributors({
      repositories: [ "ethereum/go-ethereum", "NethermindEth/nethermind", "ledgerwatch/erigon", "hyperledger/besu", "sigp/lighthouse", "prysmaticlabs/prysm", "ConsenSys/teku", "status-im/nimbus-eth2", "ChainSafe/lodestar" ]
    });

    return [
      {
        name: "ethereum-client-contributors",
        timestamp: context.timestamp,
        description: "Data Group of Github contributors to any Ethereum execution or consensus client",
        specs: "Contribute to any Github repository of an Ethereum execution client (Geth, Nethermind, Erigon or Besu) or consensus client (Lighthouse, Prysm, Teku, Nimbus or Lodestar)",
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
