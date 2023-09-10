import { gql } from "graphql-request";

import { ITallyProvider } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";
interface inputGetGovernanceProposers {
  name: string;
}

interface inputGetProposalVoters {
  name: string;
  proposalId: number;
}

// interface Proposal {
//   id: string;
//   title: string;
//   description: string;
//   proposer: {
//     address: string;
//   };
//   delegates: {
//     account: {
//       id: string;
//     };
//   };
// }

interface govArray {
  id: string;
  type: string;
  name: string;
  proposals: any[];
  delegates: any[];
}

interface queryData {
  governor?: govArray[];
}

export default class TallyProvider extends GraphQLProvider implements ITallyProvider {
  url: string;
  headers: {
    "Content-Type": string;
  };
  public constructor() {
    console.log(process.env.TALLY_API_KEY, "process.env.TALLY_API_KEY");
    super({
      url: "https://api.tally.xyz/query",
      headers: {
        authorization: process.env.TALLY_API_KEY as string,
        accept: "application/json",
      },
    });
  }

  // ! internal functions

  // governor to name function query

  private async _queryNameToGovernorAddress(): Promise<queryData> {
    return this.query(
      gql`
        query Governors {
          governors(
            chainIds: "eip155:1" # pagination: { limit: 80, offset: 0 }
          ) {
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
            delegates {
              account {
                id
              }
            }
          }
        }
      `,
      {}
    );

    // return name;
  }

  // ! needed for PR functions

  // Get voters of proposal

  public async getProposalVoters({
    name,
    proposalId,
  }: inputGetProposalVoters): Promise<FetchedData> {
    const data = await this._queryNameToGovernorAddress();

    const fetchedData: { [address: string]: number } = {};

    if (data && Array.isArray(data.governor)) {
      const matchingGovernors = data.governor.filter(
        (governor: { name: string }) => governor.name === name
      );

      for (const governor of matchingGovernors) {
        for (const proposals of governor.proposals) {
          const propId = proposals.id;

          if (propId === proposalId) {
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

  // counts function Get voters of proposal

  public async getProposalVotersCount({
    name,
    proposalId,
  }: inputGetProposalVoters): Promise<number> {
    const ProposalVoterData = await this.getProposalVoters({ name, proposalId });

    const ProposalVoterCount = Object.keys(ProposalVoterData).length;
    return ProposalVoterCount;
  }

  // Get voters of a DAO

  public async getGovernanceVoters({ name }: inputGetGovernanceProposers): Promise<FetchedData> {
    const data: queryData = await this._queryNameToGovernorAddress();
    const fetchedData: { [address: string]: number } = {};

    if (data && Array.isArray(data.governor)) {
      const matchingGovernors = data.governor.filter(
        (governor: { name: string }) => governor.name === name
      );

      for (const governor of matchingGovernors) {
        for (const proposals of governor.proposals) {
          const votesArray = proposals.votes;

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

  // count function Get voters of a DAO

  public async getGovernanceVotersCount({ name }: inputGetGovernanceProposers): Promise<number> {
    const VoterData = await this.getGovernanceVoters({ name });

    const VoterCount = Object.keys(VoterData).length;
    return VoterCount;
  }

  // Get delegates of a DAO

  public async getGovernanceDelegates({ name }: inputGetGovernanceProposers): Promise<FetchedData> {
    const data: queryData = await this._queryNameToGovernorAddress();
    const fetchedData: { [address: string]: number } = {};

    if (data && Array.isArray(data.governor)) {
      const matchingGovernors = data.governor.filter(
        (governor: { name: string }) => governor.name === name
      );

      for (const governor of matchingGovernors) {
        for (const delegates of governor.delegates) {
          const delegateAddress = delegates.account.id;

          if (fetchedData[delegateAddress]) {
            fetchedData[delegateAddress]++;
          } else {
            fetchedData[delegateAddress] = 1;
          }
        }
      }

      return fetchedData;
    }
    return fetchedData;
  }

  //count fxn for delegates of a DAO

  public async getGovernanceDelegatesCount({ name }: inputGetGovernanceProposers): Promise<number> {
    const delegaterData = await this.getGovernanceDelegates({ name });

    const delegaterCount = Object.keys(delegaterData).length;
    return delegaterCount;
  }

  // Get proposers of a DAO

  public async getGovernanceProposers({ name }: inputGetGovernanceProposers): Promise<FetchedData> {
    const data: queryData = await this._queryNameToGovernorAddress();
    const fetchedData: { [address: string]: number } = {};

    if (data && Array.isArray(data.governor)) {
      const matchingGovernors = data.governor.filter(
        (governor: { name: string }) => governor.name === name
      );

      // const proposals: Proposal[] = [];

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

  // count fxn for proposers of a DAO

  public async getGovernanceProposersCount({ name }: inputGetGovernanceProposers): Promise<number> {
    const proposersData = await this.getGovernanceProposers({ name });

    const proposerCount = Object.keys(proposersData).length;
    return proposerCount;
  }
}
