import { utils } from "ethers";

export function resolveAccount(encoding: string, id: string) {
  return `0x${encoding}${utils.hexZeroPad(`0x${id}`, 20).slice(6)}`;
}

export async function withConcurrency<T, K>(
  itemsArray: T[],
  fn: (items: T[]) => Promise<K>,
  { concurrency = 10, batchSize = 1 }
) {
  const array: K[][] = [];

  for (
    let batchStart = 0;
    batchStart < itemsArray.length;
    batchStart += batchSize * concurrency
  ) {
    const requests: Promise<K>[] = [];

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
    array.push(data);
  }

  return array.flat(1);
}

export function handleResolvingErrors(
  errorMessage: string,
  ignoreAccountErrorsWhenResolving: string = process.env.SH_IGNORE_RESOLVING_ERRORS ?? "false"
) {
  if (!ignoreAccountErrorsWhenResolving) {
    throw new Error(errorMessage);
  } else {
    console.log("Error: ", errorMessage);
  }
}
