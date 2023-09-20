import { BigNumber, utils } from "ethers";
import {
  dataUrl,
  SupportedNetwork,
} from "@group-generators/helpers/data-providers/big-query/types";

export const getERC721HoldersQuery = (key: string, snapshot?: string): string => {
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

export const getERC20HoldersQuery = (key: string, snapshot?: string) => {
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

export const getERC1155HoldersQuery = (key: string, snapshot?: string) => {
  return`
    SELECT * FROM sismo_cache.\`query_${key}\`
      ${
        snapshot
        ? `WHERE block_timestamp <= TIMESTAMP("${snapshot}")`
        : ""
      }
  `;
};

type TokenQueryArgs = {
  contractAddress: string;
  network: SupportedNetwork;
};

export const getTokenTransactionsQuery = ({
  contractAddress,
  network,
}: TokenQueryArgs): ((startTimestamp?: string, endTimestamp?: string) => string) => {
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

type ERC1155TokenQueryArgs = {
  contractAddress: string;
  network: SupportedNetwork;
  tokenId?: string;
  eventSignature?: string;
};

export const getERC1155TokenTransactionsQuery = ({
  contractAddress,
  network,
  tokenId,
  eventSignature,
}: ERC1155TokenQueryArgs): ((startTimestamp?: string, endTimestamp?: string) => string) => {
  return (startTimestamp?: string, endTimestamp?: string) => `
    SELECT data, topics, block_timestamp FROM \`${dataUrl[network]}.logs\`
    WHERE address="${contractAddress.toLowerCase()}"
    ${
      startTimestamp && endTimestamp
        ? `AND (block_timestamp BETWEEN TIMESTAMP("${startTimestamp}") AND TIMESTAMP("${endTimestamp}"))`
        : ""
    }
    AND topics[OFFSET(0)] LIKE '%${eventSignature}%'
    ${tokenId ? "AND data LIKE \"" + utils.hexZeroPad(BigNumber.from(tokenId).toHexString(), 32) + "%\"" : ""}`
  };