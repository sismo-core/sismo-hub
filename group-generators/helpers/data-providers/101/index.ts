import { gql } from "graphql-request";
// eslint-disable-next-line no-restricted-imports
import { SubgraphHostedServiceProvider } from "../subgraph";
import {
  ISubgraph101Provider,
  QueryQuestHoldersByIdInput,
  QueryQuestHoldersByNameInput,
  QueryQuestHoldersOutput,
} from "./types";
import { FetchedData } from "topics/group";

export class Subgraph101Provider
  extends SubgraphHostedServiceProvider
  implements ISubgraph101Provider
{
  constructor(url?: string) {
    super({
      url: url ?? "https://api.thegraph.com/subgraphs/name/anudit/101badges",
    });
  }

  public async getQuestHoldersByName({
    name,
  }: QueryQuestHoldersByNameInput): Promise<FetchedData> {
    const holders: FetchedData = {};
    try {
      const query = gql`
        query getBadges {
          badges (where: {metadata_: {name: "${name}"}}) {
            owner {
              id
            }
            tokenURI
            metadata {
              name
              course_id
            }
          }
        }
      `;
      const res: QueryQuestHoldersOutput =
        await this.query<QueryQuestHoldersOutput>(query);

      Object.values(res.badges).forEach((badge) => {
        holders[badge["owner"]["id"]] = 1;
      });
    } catch (error) {
      console.log(error);
    }
    return holders;
  }

  public async getQuestHoldersById({
    course_id,
  }: QueryQuestHoldersByIdInput): Promise<FetchedData> {
    const holders: FetchedData = {};

    try {
      const query = gql`
      query getBadges {
        badges (where: {metadata_: {course_id: "${course_id}"}}) {
          owner {
            id
          }
          tokenURI
          metadata {
            name
            course_id
          }
        }
      }
    `;
      const res: QueryQuestHoldersOutput =
        await this.query<QueryQuestHoldersOutput>(query);

      Object.values(res.badges).forEach((badge) => {
        holders[badge["owner"]["id"]] = 1;
      });
    } catch (error) {
      console.log(error);
    }
    return holders;
  }

  public async getQuestHoldersByNameCount({
    name,
  }: QueryQuestHoldersByNameInput): Promise<number> {
    const res = await this.getQuestHoldersByName({ name });

    return Object.keys(res).length;
  }

  public async getQuestHoldersByIdCount({
    course_id: courseId,
  }: QueryQuestHoldersByIdInput): Promise<number> {
    const res = await this.getQuestHoldersById({ course_id: courseId });

    return Object.keys(res).length;
  }
}
