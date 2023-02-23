import {
  PAID_LOANS_QUERY,
  PaidLoansData,
} from "@group-generators/generators/flex-loan/PaidLoansQuery";
import { SubgraphHostedServiceProvider } from "@group-generators/helpers/data-providers/subgraph";
import {
  ValueType,
  Tags,
  FetchedData,
  GroupWithData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const fetchedData: FetchedData = {};

    const dataProvider = new SubgraphHostedServiceProvider({
      url: "https://api.thegraph.com/subgraphs/name/arthurmr96/flex-loan",
    });

    const data = await dataProvider.query<PaidLoansData>(PAID_LOANS_QUERY);
    data.loans.forEach((loan) => {
      fetchedData[loan.borrower] = 1;
    });

    return [
      {
        name: "flex-loan",
        data: fetchedData,
        description: "Be a borrower referenced in the subgraph of flex loan",
        specs: "",
        accountSources: [AccountSource.ETHEREUM],
        tags: [Tags.NFT],
        timestamp: context.timestamp,
        valueType: ValueType.Info,
      },
    ];
  },
};

export default generator;
