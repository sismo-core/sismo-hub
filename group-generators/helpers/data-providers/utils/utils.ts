import readline from "readline";

import { FetchedData } from "topics/group";

/**
 * 
 * @param req  Request function
 * @param refactorData Function to refactor data.
 * Needs to have 2 parameters: dataProfiles (the current FetchedData) and res (response from request)
 * Needs to return {continueFetch: boolean, dataProfiles: FetchedData} object
 * @param offset 
 * @param chunks
 * @param chunksWaitTime 
 * @param chunksWaitRetry 
 * @param retry 
 */
export const retryRequest = async (
  context: any,
  request: any,
  refactorData: any,
  offset = 100,
  chunks = 10,
  chunksWaitTime = 1000,
  chunksWaitRetry = 10000,
  retry = 5,
) => {
  let dataProfiles: FetchedData = {};
  let profileChunks: Promise<string>[] = [];

  const retryRequest = async (cursor: number, numberOfRetry: number) => {
    let error;
    for (let i = 0; i < numberOfRetry; i++) {
      try {
        return await request(context, cursor);
      } catch (err) {
        if (Object(err).response.status == 429) {
          console.log("Too many requests");
          await new Promise((resolve: any) =>
            setTimeout(resolve, chunksWaitRetry)
          );
        }
        else if (Object(err).response.status == 400) {
          // return "error";
          return "";
        }
      }
    }
    throw new Error("Max retry reached\n" + error);
  };

  let nbProfilesFetched = 0;
  let continueFetch = true;
  let cursor = 0;

  while (continueFetch) {
    profileChunks = [];
    for (let i = 0; i <= cursor + offset; i += chunks) {
      profileChunks.push(retryRequest(i, retry));
    }
    cursor += offset;

    // console.log(profileChunks);

    await Promise.all(profileChunks)
      .then((res) => {
        console.log('----res');
        console.log(res);
        dataProfiles = refactorData(dataProfiles, res);
        // continueFetch = data.continueFetch;
        // dataProfiles = data.dataProfiles;
        nbProfilesFetched = Object.keys(dataProfiles).length;
        if(nbProfilesFetched == 0) {
          continueFetch = false;
        }
      })
      .catch((error) => {
        throw new Error(error);
      });

    readline.cursorTo(process.stdout, 0);
    process.stdout.write(
      `Profiles fetched: ${Object.keys(dataProfiles).length}\n`
    );

    await new Promise((resolve: any) => setTimeout(resolve, chunksWaitTime));
  }

  return dataProfiles;
};
