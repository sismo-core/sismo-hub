import { FetchedData } from "topics/group";
import { IGraphQLProvider } from "@group-generators/helpers/providers/graphql/types";

export type QueryVotersOutput = { votes: { voter: string }[] };

export type QuerySpaceVotersInput = { space: string };

export type QueryProposalVotersInput = { proposal: string };

export type QueryAllVotersInput =
  | QuerySpaceVotersInput
  | QueryProposalVotersInput;

export interface ISnapshotProvider extends IGraphQLProvider {
  queryAllVoters(input: QueryAllVotersInput): Promise<FetchedData>;
}
