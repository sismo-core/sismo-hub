import { BigQuery, BigQueryTimestamp, QueryRowsResponse } from "@google-cloud/bigquery";
import { BigNumber, BigNumberish, utils } from "ethers";
import { Interface } from "ethers/lib/utils";
import { hashJson } from "./helper";
import {
  getTokenTransactionsQuery,
  getERC20HoldersQuery,
  getERC721HoldersQuery,
  getERC1155HoldersQuery,
  getERC1155TokenTransactionsQuery,
} from "@group-generators/helpers/data-providers/big-query/queries";
import {
  SupportedNetwork,
  BigQueryProviderConstructor,
  dataUrl,
  BigQueryEthUserArgs,
  BigQueryEventArgs,
  BigQueryBadgeArgs,
  BadgeEventType,
  BigQueryMethodArgs,
  ERC1155EventType,
  BigQueryNftHoldersArgs,
  BigQueryERC20HoldersArgs,
  BigQueryERC1155HoldersArgs,
} from "@group-generators/helpers/data-providers/big-query/types";
import { FetchedData } from "topics/group";

export class BigQueryProvider {
  network: SupportedNetwork;

  constructor(
    { network }: BigQueryProviderConstructor = {
      network: SupportedNetwork.MAINNET,
    }
  ) {
    this.network = network;
  }

  public async authenticate() {
    if (process.env.NODE_ENV === "local" || !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return new BigQuery();
    }
    const credential = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    return new BigQuery({
      projectId: credential.project_id,
      credentials: credential,
    });
  }

  public async fetch(query: string): Promise<QueryRowsResponse> {
    const bigqueryClient = await this.authenticate();

    console.time("BigQuery request time");
    const response = await bigqueryClient.query(query)
    console.timeEnd("BigQuery request time");

    return response;
  }

  public async fetchAccounts(query: string) {
    const bigqueryClient = await this.authenticate();

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
            accounts[row.address] = BigNumber.from(BigInt(row.value.toFixed())).toHexString();
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

  public async fetchCount(query: string): Promise<number> {
    const bigqueryClient = await this.authenticate();

    console.time("BigQuery request time");
    const response = await bigqueryClient.query(query)
    console.timeEnd("BigQuery request time");

    const count = response[0][0]["f0_"];
    return count;
  }

  public async getERC721Holders({
    contractAddress,
    snapshot,
    options,
  }: BigQueryNftHoldersArgs): Promise<FetchedData> {
    const cacheKey = hashJson({
      version: "1",
      queryType: "getERC721Holders",
      contractAddress,
      dataSet: dataUrl[this.network],
    });

    // get last txs and store in cache (or create cache if not exists)
    const getLatestsTransactionsQuery = getTokenTransactionsQuery({ contractAddress, network: this.network });
    await this.storeInCache(cacheKey, getLatestsTransactionsQuery, {
      startTimestamp: options?.dateRange?.min,
      endTimestamp: options?.dateRange?.max,
    });

    // get all holders from cache
    const bigqueryClient = await this.authenticate();
    const response = await bigqueryClient.query(
      getERC721HoldersQuery(cacheKey, snapshot)
    );

    const data: FetchedData = {};
    response[0].forEach((owner) => {
      data[owner.address] = owner.value;
    });

    return data;
  }

  public async getERC20Holders({
    contractAddress,
    snapshot,
    options,
  }: BigQueryERC20HoldersArgs): Promise<FetchedData> {
    const cacheKey = hashJson({
      version: "1",
      queryType: "getERC20Holders",
      contractAddress,
      dataSet: dataUrl[this.network],
    });

    const getLatestsTransactionsQuery = getTokenTransactionsQuery({ contractAddress, network: this.network });
    await this.storeInCache(cacheKey, getLatestsTransactionsQuery, {
      startTimestamp: options?.dateRange?.min,
      endTimestamp: options?.dateRange?.max,
    });

    // get all holders from cache
    const bigqueryClient = await this.authenticate();
    const response = await bigqueryClient.query(
      getERC20HoldersQuery(cacheKey, snapshot)
    );

    const data: FetchedData = {};
    response[0].forEach((owner) => {
      data[owner.address] = owner.value.toFixed().toString();
    });

    return data;
  }

  public async getERC1155Holders({
    contractAddress,
    tokenId,
    snapshot,
    options,
  }: BigQueryERC1155HoldersArgs): Promise<FetchedData> {
    const cacheKey = hashJson({
      version: "1",
      queryType: "getERC1155Holders",
      contractAddress,
      tokenId,
      dataSet: dataUrl[this.network],
    });

    const iface = new Interface([
      "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)",
    ]);
    const eventSignature = utils.id(
      `${iface.fragments[0].name}(${iface.fragments[0].inputs.map((x) => x.type).join(",")})`
    );

    const getLatestsTransactionsQuery = getERC1155TokenTransactionsQuery({ contractAddress, network: this.network, tokenId, eventSignature });
    await this.storeInCache(cacheKey, getLatestsTransactionsQuery, {
      startTimestamp: options?.timestampPeriodUtc?.[0],
      endTimestamp: options?.timestampPeriodUtc?.[1],
    });

    // get all holders from cache
    const bigqueryClient = await this.authenticate();
    const response = await bigqueryClient.query(
      getERC1155HoldersQuery(cacheKey, snapshot)
    );

    // decode the event using the data and topics fields
    const events = response[0].map(
      (event) =>
        iface.parseLog({
          topics: event.topics,
          data: event.data,
        }).args as any as ERC1155EventType
    );

    // filter the events to keep only the ones with a value > 0
    const fetchedData: FetchedData = {};
    events.forEach((event) => {
      if (BigNumber.from(event.value).gte(BigNumber.from(0))) {
        fetchedData[event.to] = BigNumber.from(event.value)
          .add(BigNumber.from(fetchedData[event.to] ?? 0))
          .toString();
        fetchedData[event.from] = fetchedData[event.from]
          ? BigNumber.from(fetchedData[event.from]).sub(BigNumber.from(event.value)).toString()
          : BigNumber.from(0).sub(BigNumber.from(event.value)).toString();
      }
    });

    return fetchedData;
  }

  public async getEthTransactions({ minNumberOfTransactions, dateRange }: BigQueryEthUserArgs) {
    const query = `
        with transactions as (
          select from_address as address, count(*) as nb_transaction from \`${
            dataUrl[this.network]
          }.transactions\` 
          where ${dateRange?.min ? `'${dateRange?.min}' < block_timestamp` : "1=1"} and ${
      dateRange?.max ? `block_timestamp < '${dateRange?.max}'` : "1=1"
    } 
          group by from_address
        )
        select address, nb_transaction as value
        from transactions
        where nb_transaction > ${minNumberOfTransactions}
        order by address 
        `;
    return await this.fetchAccounts(query);
  }

  public async getEvents<T>({
    contractAddress,
    eventABI,
    options,
  }: BigQueryEventArgs): Promise<T[]> {
    const iface = new Interface([eventABI]);

    const eventSignature = utils.id(
      `${iface.fragments[0].name}(${iface.fragments[0].inputs.map((x) => x.type).join(",")})`
    );

    // filter the event directly in the query using the eventSignature
    const query = (startTimestamp?: string, endTimestamp?: string) => `
    SELECT data, topics, block_number FROM \`${dataUrl[this.network]}.logs\`
    WHERE address="${contractAddress.toLowerCase()}"
    AND (block_timestamp BETWEEN TIMESTAMP("${startTimestamp}") AND TIMESTAMP("${endTimestamp}"))
    AND topics[OFFSET(0)] LIKE '%${eventSignature}%'
    ${options?.data ? `AND data = "${options?.data}"` : ""}
    `;

    const cacheKey = hashJson({
      queryType: "getAllTransactionsForSpecificMethod",
      contractAddress,
      eventSignature,
      dataSet: dataUrl[this.network],
    });

    const response = await this.computeQueryWithCache(cacheKey, query, {
      startTimestamp: options?.timestampPeriodUtc?.[0],
      endTimestamp: options?.timestampPeriodUtc?.[1],
    });

    // decode the event using the data and topics fields
    return response[0].map(
      (event) => {
        const data = iface.parseLog({
          topics: event.topics,
          data: event.data,
        }).args as any as T
        return {
          ...data,
          block_number: event.block_number
        };
      }
    );
  }

  public async getSismoZkBadges({
    contractAddress,
    zkBadgeId,
    options,
  }: BigQueryBadgeArgs): Promise<BadgeEventType[]> {
    const bigqueryClient = await this.authenticate();
    const iface = new Interface([
      "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)",
    ]);

    const eventSignature = utils.id(
      `${iface.fragments[0].name}(${iface.fragments[0].inputs.map((x) => x.type).join(",")})`
    );

    // filter the event directly in the query using the eventSignature
    const query = `
    SELECT data, topics FROM \`${dataUrl[this.network]}.logs\`
    WHERE address="${contractAddress.toLowerCase()}"
    ${
      options?.timestampPeriodUtc
        ? `AND (block_timestamp BETWEEN TIMESTAMP("${options?.timestampPeriodUtc[0]}") AND TIMESTAMP("${options?.timestampPeriodUtc[1]}"))`
        : ""
    }
    AND topics[OFFSET(0)] LIKE '%${eventSignature}%'
    AND data LIKE "${utils.hexZeroPad(BigNumber.from(zkBadgeId).toHexString(), 32)}%"`;
    const response = await bigqueryClient.query(query);

    // decode the event using the data and topics fields
    return response[0].map(
      (event) =>
        iface.parseLog({
          topics: event.topics,
          data: event.data,
        }).args as any as BadgeEventType
    );
  }

  public async getAllTransactionsForSpecificMethod<T>({
    contractAddress,
    functionABI,
    options,
  }: BigQueryMethodArgs): Promise<{ from: string; to: string; value: BigNumber; blockNumber: number; args?: T }[]> {
    const iface = new Interface([functionABI]);
    const contractAddressLower = contractAddress.toLowerCase();

    const functionSelector = utils
      .id(`${iface.fragments[0].name}(${iface.fragments[0].inputs.map((x) => x.type).join(",")})`)
      .substring(0, 10);

    // filter the transactions directly in the query using the functionSelector
    const query = (startTimestamp?: string, endTimestamp?: string) => `
    SELECT from_address, value, block_number, block_timestamp ${
      options?.functionArgs ? `,input` : ""
    } FROM \`${dataUrl[this.network]}.transactions\`
    WHERE to_address="${contractAddressLower}"
    AND input LIKE '%${functionSelector}%'
    AND block_timestamp > TIMESTAMP("${startTimestamp}")
    AND block_timestamp <= TIMESTAMP("${endTimestamp}")
    AND receipt_status=1
    `;
    const cacheKey = hashJson({
      queryType: "getAllTransactionsForSpecificMethod",
      contractAddress,
      functionSelector,
      input: options?.functionArgs ?? false,
      dataSet: dataUrl[this.network],
    });
    const response = await this.computeQueryWithCache(cacheKey, query, {
      startTimestamp: options?.timestampPeriodUtc?.[0],
      endTimestamp: options?.timestampPeriodUtc?.[1],
    });
    const transactions = response[0] as {
      from_address: string;
      value: bigint;
      input?: string;
      block_number: number;
    }[];

    const res = transactions.map((transaction) => ({
      from: transaction.from_address,
      to: contractAddressLower,
      value: BigNumber.from(transaction.value.toString()),
      blockNumber: transaction.block_number,
      // decode the args
      args: options?.functionArgs
        ? (iface.parseTransaction({
            data: transaction.input ? transaction.input : "",
          }).args as any as T)
        : undefined,
    }));
    return res;
  }

  public async initCache() {
    const bigqueryClient = await this.authenticate();
    // ensure the dataset exists
    const datasets = (await bigqueryClient.getDatasets())[0];
    const cacheDataSetName = "sismo_cache";
    if (!datasets.find((dataset) => dataset.id === cacheDataSetName)) {
      await bigqueryClient.createDataset(cacheDataSetName);
    }
    // ensure the query metadata table exists
    const createQueriesMetadataTable = `
    create table if not exists sismo_cache.\`queries_metadata\` (
      \`key\` STRING,
      \`last_block_timestamp\` TIMESTAMP,
    );
    `;
    await bigqueryClient.query(createQueriesMetadataTable);
  }

  public async getCacheLastTimestamp(key: string): Promise<string> {
    await this.initCache();
    const bigqueryClient = await this.authenticate();
    // get the last timestamp
    const getLastTimestampQuery = `
    select last_block_timestamp from sismo_cache.\`queries_metadata\`
    where key = "${key}";
    `;
    const response = await bigqueryClient.query(getLastTimestampQuery);
    return response[0][0]?.last_block_timestamp?.value;
  }

  public async getLastBlockTimestamp(): Promise<string> {
    const bigqueryClient = await this.authenticate();
    // get current block timestamp
    const lastBlockTimestampQuery = `select timestamp from \`bigquery-public-data\`.\`crypto_ethereum\`.blocks order by timestamp DESC limit 1;`;
    const response = await bigqueryClient.query(lastBlockTimestampQuery);
    const lastBlockTimestamp = response[0][0].timestamp as BigQueryTimestamp;
    return lastBlockTimestamp.value;
  }

  public async computeQueryWithCache(
    key: string,
    query: (startTimestamp?: string, endTimestamp?: string) => string,
    options?: { startTimestamp?: string; endTimestamp?: string }
  ): Promise<QueryRowsResponse> {
    await this.initCache();
    const bigqueryClient = await this.authenticate();

    await this.storeInCache(key, query, options);

    return bigqueryClient.query(`select * from sismo_cache.\`query_${key}\``);
  }

  public async storeInCache(
    key: string,
    query: (startTimestamp?: string, endTimestamp?: string) => string,
    options?: { startTimestamp?: string; endTimestamp?: string }
  ): Promise<string> {
    await this.initCache();
    const bigqueryClient = await this.authenticate();

    const lastBlockTimestamp = options?.endTimestamp ?? (await this.getLastBlockTimestamp());
    const firstBlockTimestamp = options?.startTimestamp ?? "1970-01-01 00:00:00 UTC"

    const lastCacheTimestamp = await this.getCacheLastTimestamp(key);

    // insert in cache
    if (!lastCacheTimestamp) {
      console.log(`Creating cache for key ${key}`);
      await bigqueryClient.query(`
      create table sismo_cache.\`query_${key}\` 
      as ${query(firstBlockTimestamp, lastBlockTimestamp)};
      `);
      
      // insert cacheTimestamp value
      await bigqueryClient.query(`
      INSERT INTO sismo_cache.\`queries_metadata\`(key, last_block_timestamp) VALUES('${key}','${lastBlockTimestamp}');
      `);
    } 
    // update cache
    else {
      console.log(`Updating cache for key ${key}`);
      await bigqueryClient.query(`
      INSERT INTO sismo_cache.\`query_${key}\` 
      ${query(lastCacheTimestamp, lastBlockTimestamp)};`);
      
      // update cacheTimestamp value
      await bigqueryClient.query(`
      update sismo_cache.\`queries_metadata\` set last_block_timestamp = TIMESTAMP("${lastBlockTimestamp}")
      WHERE key = '${key}';
      `);
    }

    return key;
  }
}
