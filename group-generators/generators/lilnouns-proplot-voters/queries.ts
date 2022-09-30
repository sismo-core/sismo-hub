import { gql } from "graphql-request";

export const GET_ALL_VOTERS = gql`
  query getAllVoters {
    getAllUsers {
      wallet
      userStats { 
        totalVotes
      }
    }
  }
`;