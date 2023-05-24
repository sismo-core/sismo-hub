import { BigNumberish, utils } from "ethers";
import { FetchedData } from "topics/group";

export function resolveAccount(encoding: string, id: string) {
  return `0x${encoding}${utils.hexZeroPad(`0x${id}`, 20).slice(6)}`;
}

export async function withConcurrency<T, K>(
  itemsArray: T[],
  fn: (items: T[]) => Promise<[K, K]>,
  { concurrency = 10, batchSize = 1 }
): Promise<[K, K]> {
  const rawArray: K[] = [];
  const array: K[] = [];

  for (
    let batchStart = 0;
    batchStart < itemsArray.length;
    batchStart += batchSize * concurrency
  ) {
    const requests: Promise<[K, K]>[] = [];

    for (
      let i = batchStart;
      i < batchStart + batchSize * concurrency && i < itemsArray.length;
      i += batchSize
    ) {
      const itemsBatch = itemsArray.slice(
        i,
        Math.min(i + batchSize, itemsArray.length)
      );

      requests.push(fn(itemsBatch));
    }

    const data = await Promise.all(requests);

    data.forEach((item) => {
      rawArray.push(item[0]);
      array.push(item[1]);
    });
  }

  return [Object.assign({}, ...rawArray), Object.assign({}, ...array)];
}

export function handleResolvingErrors(
  errorMessage: string,
  ignoreAccountErrorsWhenResolving: string = process.env
    .SH_IGNORE_RESOLVING_ERRORS ?? "false"
) {
  if (ignoreAccountErrorsWhenResolving == "false") {
    throw new Error(errorMessage);
  } else {
    console.log("Error: ", errorMessage);
  }
}

export function convertToFetchedData(
  accounts: [string, BigNumberish][]
): FetchedData {
  return accounts.reduce(
    (acc: FetchedData, [address, value]: [string, BigNumberish]) => {
      acc[address] = value;
      return acc;
    },
    {} as FetchedData
  );
}
