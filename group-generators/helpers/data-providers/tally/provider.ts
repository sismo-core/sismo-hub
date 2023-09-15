import { gql } from "graphql-request";

import {
  ITallyProvider,
  inputGetGovernanceProposers,
  inputGetProposalVoters,
  queryData,
} from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export default class TallyProvider extends GraphQLProvider implements ITallyProvider {
  public constructor() {
    super({
      url: "https://api.tally.xyz/query",
      headers: {
        "Api-Key": process.env.TALLY_API_KEY as string,
        accept: "application/json",
      },
    });
  }

  private async _queryNameToGovernorAddress(): Promise<queryData> {
    return this.query(
      gql`
        query Governors {
          governors(chainIds: "eip155:1") {
            id
            type
            name
            proposals {
              id
              title
              description
              proposer {
                address
              }
              votes {
                id
                voter {
                  id
                  address
                }
              }
            }
          }
        }
      `,
      {}
    );
  }

  public async getProposalVoters({
    name,
    proposalId,
  }: inputGetProposalVoters): Promise<FetchedData> {
    const data = await this._queryNameToGovernorAddress();

    const fetchedData: { [address: string]: number } = {};

    if (data && Array.isArray(data.governors)) {
      const matchingGovernors = data.governors.filter(
        (governor: { name: string }) => governor.name === name
      );

      for (const governor of matchingGovernors) {
        for (const proposals of governor.proposals) {
          const propId = proposals.id;

          if (parseInt(propId) === proposalId) {
            const allVotes = proposals.votes;

            allVotes.forEach((voteItem: { id: string; voter: any }) => {
              const { voter } = voteItem;
              const { address } = voter;
              if (fetchedData[address]) {
                fetchedData[address]++;
              } else {
                fetchedData[address] = 1;
              }
            });
          }
        }
      }

      return fetchedData;
    }

    return fetchedData;
  }

  public async getProposalVotersCount({
    name,
    proposalId,
  }: inputGetProposalVoters): Promise<number> {
    const ProposalVoterData = await this.getProposalVoters({ name, proposalId });

    const ProposalVoterCount = Object.keys(ProposalVoterData).length;
    return ProposalVoterCount;
  }

  public async getGovernanceVoters({ name }: inputGetGovernanceProposers): Promise<FetchedData> {
    const data: queryData = await this._queryNameToGovernorAddress();
    const fetchedData: { [address: string]: number } = {};

    if (data && Array.isArray(data.governors)) {
      const matchingGovernors = data.governors.filter(
        (governor: { name: string }) => governor.name === name
      );

      for (const governor of matchingGovernors) {
        for (const proposals of governor.proposals) {
          const votesArray = proposals?.votes;

          votesArray.forEach((item: { id: string; voter: any }) => {
            const { voter } = item;
            const { address } = voter;
            if (fetchedData[address]) {
              fetchedData[address]++;
            } else {
              fetchedData[address] = 1;
            }
          });
        }
      }

      return fetchedData;
    }

    return fetchedData;
  }

  public async getGovernanceVotersCount({ name }: inputGetGovernanceProposers): Promise<number> {
    const VoterData = await this.getGovernanceVoters({ name });

    const VoterCount = Object.keys(VoterData).length;
    return VoterCount;
  }

  public async getGovernanceProposers({ name }: inputGetGovernanceProposers): Promise<FetchedData> {
    const data: queryData = await this._queryNameToGovernorAddress();
    const fetchedData: { [address: string]: number } = {};

    if (data && Array.isArray(data.governors)) {
      const matchingGovernors = data.governors.filter(
        (governor: { name: string }) => governor.name === name
      );

      for (const governor of matchingGovernors) {
        for (const proposal of governor.proposals) {
          const proposerAddress = proposal.proposer.address;

          if (fetchedData[proposerAddress]) {
            fetchedData[proposerAddress]++;
          } else {
            fetchedData[proposerAddress] = 1;
          }
        }
      }

      return fetchedData;
    }
    return fetchedData;
  }

  public async getGovernanceProposersCount({ name }: inputGetGovernanceProposers): Promise<number> {
    const proposersData = await this.getGovernanceProposers({ name });

    const proposerCount = Object.keys(proposersData).length;
    return proposerCount;
  }
}
