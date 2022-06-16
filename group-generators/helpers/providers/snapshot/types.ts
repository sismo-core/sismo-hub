import { FetchedData } from "../../../../src/group";
import { IGraphQLProvider } from "../graphql/types";

export type QueryVotersOutput = { votes: { voter: string }[] };

export type QuerySpaceVotersInput = { space: string };

export type QueryProposalVotersInput = { proposal: string };

export type QueryAllVotersInput =
  | QuerySpaceVotersInput
  | QueryProposalVotersInput;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISnapshotProvider extends IGraphQLProvider {
  queryAllVoters(input: QueryAllVotersInput): Promise<FetchedData>;
}
