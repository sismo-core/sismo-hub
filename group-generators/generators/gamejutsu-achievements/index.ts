import { gql } from "graphql-request";
import { dataProviders } from "@group-generators/helpers/providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

function makeQuery(achievement: 'winner' | 'loser' | 'draw' | 'cheater') {
  return gql`
            query ${achievement} ($amount: Int) {
              inRowCounterEntities(where: {${achievement}MaxValue_gte: $amount}) {
                id
              }
            }`;
}

function makeAmount(grade: 'bronze' | 'silver' | 'gold') : number | undefined {
  if (grade == 'bronze') {
    return 1;
  } else
  if (grade == 'silver') {
    return 5;
  } else
  if (grade == 'gold') {
    return 10;
  }
}

function makeGenerator(achievement: 'winner' | 'loser' | 'draw' | 'cheater', grade: 'bronze' | 'silver' | 'gold') {
  const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Daily,

    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
      // This group is constituted by all the users who have a sismo.eth domain
      const subgraphHostedServiceProvider =
        new dataProviders.SubgraphHostedServiceProvider({
          url: "https://api.thegraph.com/subgraphs/name/chainhackers/gamejutsu-subgraph",
        });

      type Player = { id: string };
      const players = await subgraphHostedServiceProvider.query<{
        inRowCounterEntities: Player[];
      }>(
        makeQuery(achievement),
        { amount: makeAmount(grade) }
      );

      const fetchedData: { [address: string]: number } = {};

      for (const player of players.inRowCounterEntities.map((p) => p.id)) {
        fetchedData[player] = 1;
      }

      return [
        {
          name: `gamejutsu-${grade}-${achievement}`,
          timestamp: context.timestamp,
          data: fetchedData,
          valueType: ValueType.Score,
          tags: [Tags.GameJutsu, Tags.User],
        },
      ];
    },
  };
  return generator;
}

export const gamejustuBronzeWinner = makeGenerator('winner', 'bronze');
export const gamejustuSilverWinner = makeGenerator('winner', 'silver');
export const gamejustuGoldWinner = makeGenerator('winner', 'gold');
export const gamejustuBronzeLoser = makeGenerator('loser', 'bronze');
export const gamejustuSilverLoser = makeGenerator('loser', 'silver');
export const gamejustuGoldLoser = makeGenerator('loser', 'gold');
export const gamejustuBronzeDraw = makeGenerator('draw', 'bronze');
export const gamejustuSilverDraw = makeGenerator('draw', 'silver');
export const gamejustuGoldDraw = makeGenerator('draw', 'gold');
export const gamejustuBronzeCheater = makeGenerator('cheater', 'bronze');
export const gamejustuSilverCheater = makeGenerator('cheater', 'silver');
export const gamejustuGoldCheater = makeGenerator('cheater', 'gold');
