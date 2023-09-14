import { gql } from "graphql-request";

import {
  ITallyProvider,
  inputGetGovernanceProposers,
  inputGetProposalVoters,
  queryData,
  inputQueryToName,
} from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export default class TallyProvider extends GraphQLProvider implements ITallyProvider {
  url: string;
  headers: {
    "Api-Key": string;
  };
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

  private async _queryNameToGovernorAddressForDelegates(
    ids: string,
    offset: number,
    limit: number
  ): Promise<queryData> {
    return this.query(
      gql`
        query Governors($ids: [AccountID!], $limit: Int!, $offset: Int!) {
          governors(chainIds: "eip155:1", ids: $ids) {
            id
            name
            delegates(pagination: { limit: $limit, offset: $offset }) {
              account {
                address
              }
              stats {
                voteCount
              }
            }
          }
        }
      `,
      { ids, limit, offset }
    );
  }

  private async _queryNameToGovernorId(): Promise<inputQueryToName> {
    return this.query(
      gql`
        query Governors {
          governors(chainIds: "eip155:1") {
            id
            name
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

          if (propId == proposalId) {
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

  public async getGovernanceDelegates({ name }: inputGetGovernanceProposers): Promise<FetchedData> {
    const idForName: inputQueryToName = await this._queryNameToGovernorId();
    let nameToId = "";

    if (idForName && Array.isArray(idForName.governors)) {
      idForName.governors?.forEach((daoItem) => {
        if (daoItem.name == name) {
          nameToId = daoItem.id;
        }
      });
    }

    const limit = 30;
    let offset = 0;

    const fetchedData: { [address: string]: number } = {};

    let continueLoop = true;

    while (continueLoop) {
      const data: queryData = await this._queryNameToGovernorAddressForDelegates(
        nameToId,
        offset,
        limit
      );

      if (data && Array.isArray(data.governors)) {
        if (data.governors[0].delegates && data.governors[0].delegates.length > 0) {
          for (const delegates of data.governors[0].delegates) {
            const delegateAddress = delegates.account.address;
            const voteCount = delegates.stats.voteCount;

            fetchedData[delegateAddress] = voteCount;
          }
        } else {
          continueLoop = false;
        }
      }

      offset += limit;
    }

    return fetchedData;
  }

  public async getGovernanceDelegatesCount({ name }: inputGetGovernanceProposers): Promise<number> {
    const delegaterData = await this.getGovernanceDelegates({ name });

    const delegaterCount = Object.keys(delegaterData).length;
    return delegaterCount;
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
