import { gql } from "graphql-request";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

function makeQuery(achievement: "winner" | "loser" | "draw" | "cheater") {
  return gql`
            query ${achievement} ($amount: Int) {
              inRowCounterEntities(where: {${achievement}MaxValue_gte: $amount}) {
                id
              }
            }`;
}

function makeAmount(grade: "bronze" | "silver" | "gold"): number | undefined {
  if (grade == "bronze") {
    return 1;
  } else if (grade == "silver") {
    return 5;
  } else if (grade == "gold") {
    return 10;
  }
}

const gamejutsuGroups: {
  achievement: "winner" | "loser" | "draw" | "cheater";
  grade: "bronze" | "silver" | "gold";
}[] = [
  { achievement: "winner", grade: "bronze" },
  { achievement: "winner", grade: "silver" },
  { achievement: "winner", grade: "gold" },
  { achievement: "loser", grade: "bronze" },
  { achievement: "loser", grade: "silver" },
  { achievement: "loser", grade: "gold" },
  { achievement: "draw", grade: "bronze" },
  { achievement: "draw", grade: "silver" },
  { achievement: "draw", grade: "gold" },
  { achievement: "cheater", grade: "bronze" },
  { achievement: "cheater", grade: "silver" },
  { achievement: "cheater", grade: "gold" },
];

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    return Promise.all(
      gamejutsuGroups.map(
        async ({ achievement, grade }): Promise<GroupWithData> => {
          // This group is constituted by all the users who have a sismo.eth domain
          const subgraphHostedServiceProvider =
            new dataProviders.SubgraphHostedServiceProvider({
              url: "https://api.thegraph.com/subgraphs/name/chainhackers/gamejutsu-subgraph",
            });

          type Player = { id: string };
          const players = await subgraphHostedServiceProvider.query<{
            inRowCounterEntities: Player[];
          }>(makeQuery(achievement), { amount: makeAmount(grade) });

          const fetchedData: { [address: string]: number } = {};

          for (const player of players.inRowCounterEntities.map((p) => p.id)) {
            fetchedData[player] = 1;
          }

          return {
            name: `gamejutsu-${grade}-${achievement}`,
            timestamp: context.timestamp,
            description: `Own a ${grade} ${achievement} achievement in GameJutsu`,
            specs: "",
            data: fetchedData,
            accountSources: [AccountSource.ETHEREUM],
            valueType: ValueType.Score,
            tags: [Tags.GameJutsu, Tags.User],
          };
        }
      )
    );
  },
};

export default generator;
