import { ISubgraphProvider } from "@group-generators/helpers/data-providers/subgraph";
import { FetchedData } from "topics/group";

export type QueryQuestHoldersOutput = {
  badges: {
    owner: {
      id: string;
      owner: string;
    };
    tokenId: string;
    metadata: {
      name: string;
      course_id: string;
    };
  }[];
};

export type QueryQuestHoldersByNameInput = { name: string };
export type QueryQuestHoldersByIdInput = { course_id: string };

export interface ISubgraph101Provider extends ISubgraphProvider {
  getQuestHoldersByName(
    input: QueryQuestHoldersByNameInput
  ): Promise<FetchedData>;
  getQuestHoldersById(input: QueryQuestHoldersByIdInput): Promise<FetchedData>;
}
