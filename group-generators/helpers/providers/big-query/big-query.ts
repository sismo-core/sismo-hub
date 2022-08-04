import { BigQuery } from "@google-cloud/bigquery";
import { BigNumber, BigNumberish, utils } from "ethers";
import { Interface } from "ethers/lib/utils";
import { FetchedData } from "topics/group";

type BigQueryProviderConstructor = {
  chainId: number;
};

type BigQueryEthUserArgs = {
  minNumberOfTransactions: number;
  dateRange?: BigQueryDateRange;
};

type BigQueryDateRange = {
  min?: string;
  max?: string;
};

type BigQueryNftOwnershipArgs = {
  contractAddress: string;
  blockNumber: number;
};

type BigQueryEventArgs = {
  contractAddress: string;
  eventABI: string;
  options?: {
    blockNumber: number;
  };
};

export default class BigQueryProvider {
  chainId: number;

  constructor({ chainId }: BigQueryProviderConstructor = { chainId: 1 }) {
    this.chainId = chainId;
  }

  public async authenticate() {
    if (
      process.env.NODE_ENV === "local" ||
      !process.env.GOOGLE_APPLICATION_CREDENTIALS
    ) {
      return new BigQuery();
    }
    const credential = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    return new BigQuery({
      projectId: credential.project_id,
      credentials: credential,
    });
  }

  public async fetch(query: string) {
    const bigqueryClient = await this.authenticate();

    if (this.chainId != 1) {
      throw new Error(`Bigquery not implemented for ${this.chainId}`);
    }
    const accounts: { [address: string]: BigNumberish } = {};
    console.time("BigQuery request time");
    await new Promise((resolve, reject) => {
      bigqueryClient
        .createQueryStream(query)
        .on("error", function (error) {
          reject(error);
        })
        .on("data", function (row) {
          // row is a result from your query.
          if (typeof row.value === "number") {
            accounts[row.address] = row.value;
          } else if (typeof row.value === "object") {
            accounts[row.address] = BigNumber.from(
              BigInt(row.value.toFixed())
            ).toHexString();
          } else {
            throw new Error("BigQuery value result unhandled!");
          }
        })
        .on("end", function () {
          // All rows retrieved.
          resolve(null);
        });
    });
    console.timeEnd("BigQuery request time");
    return accounts;
  }

  public async getNftOwnership({
    contractAddress,
    blockNumber,
  }: BigQueryNftOwnershipArgs): Promise<FetchedData> {
    const query = `
    WITH token AS (
        SELECT * FROM \`bigquery-public-data.crypto_ethereum.token_transfers\`
        WHERE token_address='${contractAddress.toLowerCase()}'
        ${blockNumber ? `AND block_number <= ${blockNumber}` : ""}
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
      ORDER BY address DESC;
    `;
    return await this.fetch(query);
  }

  public async getEthTransactions({
    minNumberOfTransactions,
    dateRange,
  }: BigQueryEthUserArgs) {
    const query = `
        with transactions as (
          select from_address as address, count(*) as nb_transaction from \`bigquery-public-data.crypto_ethereum.transactions\` 
          where ${
            dateRange?.min ? `'${dateRange?.min}' < block_timestamp` : "1=1"
          } and ${
      dateRange?.max ? `block_timestamp < '${dateRange?.max}'` : "1=1"
    } 
          group by from_address
        )
        select address, nb_transaction as value
        from transactions
        where nb_transaction > ${minNumberOfTransactions}
        order by address 
        `;
    return await this.fetch(query);
  }

  public async getEvents<T>({
    contractAddress,
    eventABI,
    options,
  }: BigQueryEventArgs): Promise<T[]> {
    const bigqueryClient = await this.authenticate();
    const iface = new Interface([eventABI]);

    const eventSignature = utils.id(
      `${iface.fragments[0].name}(${iface.fragments[0].inputs
        .map((x) => x.type)
        .join(",")})`
    );

    // filter the event directly in the query using the eventSignature
    const query = `
    SELECT data, topics FROM \`bigquery-public-data.crypto_ethereum.logs\` 
    WHERE address="${contractAddress}"
    ${options?.blockNumber ? `AND block_number <= ${options.blockNumber}` : ""}
    AND topics[OFFSET(0)] LIKE '%${eventSignature}%';
    `;
    const response = await bigqueryClient.query(query);

    // decode the event using the data and topics fields
    return response[0].map(
      (event) =>
        iface.parseLog({
          topics: event.topics,
          data: event.data,
        }).args as any as T
    );
  }
}
