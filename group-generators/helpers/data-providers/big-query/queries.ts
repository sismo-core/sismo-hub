import {
  dataUrl,
  SupportedNetwork,
} from "@group-generators/helpers/data-providers/big-query/types";

export type GetNFTHoldersQueryArgs = {
  contractAddress: string;
  network: SupportedNetwork;
};

export const getNftHoldersQuery = (key: string, snapshot?: string): string => {
  return`
    WITH
      token AS (
        SELECT * FROM sismo_cache.\`query_${key}\`
        ${
          snapshot
          ? `WHERE block_timestamp <= TIMESTAMP("${snapshot}")`
          : ""
        }
      ),
      token_received AS (
        SELECT to_address AS address, COUNT(to_address) AS nb FROM token group by to_address
      ),
      token_sent AS (
        SELECT from_address AS address, COUNT(from_address) AS nb FROM token group by from_address
      )
      SELECT token_received.address as address, (COALESCE(token_received.nb, 0) - COALESCE(token_sent.nb, 0)) AS value 
      FROM token_received LEFT OUTER JOIN token_sent ON token_received.address = token_sent.address
      where (COALESCE(token_received.nb, 0) - COALESCE(token_sent.nb, 0)) > 0 
      ORDER BY address DESC
  `;
};

export type GetERC20HoldersQueryArgs = {
  contractAddress: string;
  network: SupportedNetwork;
};

export const getContractTransactionsQuery = ({
  contractAddress,
  network,
}: GetNFTHoldersQueryArgs): ((startTimestamp?: string, endTimestamp?: string) => string) => {
  return (startTimestamp?: string, endTimestamp?: string) => `
      SELECT * FROM \`${dataUrl[network]}.token_transfers\`
        WHERE token_address='${contractAddress.toLowerCase()}'
        ${
          startTimestamp && endTimestamp
            ? `AND (block_timestamp BETWEEN TIMESTAMP("${startTimestamp}") AND TIMESTAMP("${endTimestamp}"))`
            : ""
        }
      `;
};

export const getERC20HoldersQuery = (key: string, snapshot?: string) => {
  return`
    WITH
      token AS (
        SELECT * FROM sismo_cache.\`query_${key}\`
        ${
          snapshot
          ? `WHERE block_timestamp < TIMESTAMP("${snapshot}")`
          : ""
        }
      ),
      token_received AS (
        SELECT to_address AS address, SUM(safe_cast(value as NUMERIC)) AS total_received FROM token group by to_address
      ),
      token_sent AS (
        SELECT from_address AS address, SUM(safe_cast(value as NUMERIC)) AS total_sent FROM token group by from_address
      )
      SELECT token_received.address as address, (COALESCE(token_received.total_received, 0) - COALESCE(token_sent.total_sent, 0)) AS value
      FROM token_received LEFT OUTER JOIN token_sent ON token_received.address = token_sent.address
      where (COALESCE(token_received.total_received, 0) - COALESCE(token_sent.total_sent, 0)) > 0
      ORDER BY address
    `;
};