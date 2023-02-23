import readline from "readline";

import { FetchedData } from "topics/group";

/**
 * 
 * @param context  Context
 * @param request  Request function
 * @param cursor  Request function
 * @param wait Time to wait between each retry
 * @param retry Number of retry
 */
export const retryRequest = async (context: any, request: any, cursor: any, retry: number) => {
  let error;
  for (let i = 0; i < retry; i++) {
    try {
      return await request(context, cursor);
    } catch (err: any) {
      console.log('err');
      // console.log(err);
      console.log(err.response.status);
      if (err.response.status == 429) {
        console.log("Too many requests");
        await new Promise((resolve: any) =>
          setTimeout(resolve, 10000)
        );
      }
    }
  }
  throw new Error("Max retry reached\n" + error);
};


// /**
//  * 
//  * @param req  Request function
//  * @param refactorData Function to refactor data.
//  * Needs to have 2 parameters: dataProfiles (the current FetchedData) and res (response from request)
//  * Needs to return {continueFetch: boolean, dataProfiles: FetchedData} object
//  * @param chunks Number of profiles to fetch per chunk
//  * @param offset Number of chunks to fetch
//  * @param chunksWaitTime Time to wait between each chunk
//  * @param chunksWaitRetry Time to wait between each retry
//  * @param retry Number of retry
//  */
// export const retryRequest = async (
//   context: any,
//   request: any,
//   refactorData: any,
//   chunks = 10,
//   offset = 100,
//   chunksWaitTime = 1000,
//   chunksWaitRetry = 10000,
//   retry = 5,
// ) => {
//   let data: {"continueFetch":boolean, "dataProfiles": FetchedData};
//   let dataProfiles: FetchedData = {};
//   let profileChunks: Promise<string>[] = [];

//   const retryRequest = async (cursor: number, numberOfRetry: number) => {
//     let error;
//     for (let i = 0; i < numberOfRetry; i++) {
//       try {
//         return await request(context, cursor);
//       } catch (err) {
//         console.log('err');
//         console.log(err);
//         if (err == 429) {
//           console.log("Too many requests");
//           await new Promise((resolve: any) =>
//             setTimeout(resolve, chunksWaitRetry)
//           );
//         }
//       }
//     }
//     throw new Error("Max retry reached\n" + error);
//   };

//   // let nbProfilesFetched = 0;
//   let continueFetch = true;
//   let cursor = 0;

//   while (continueFetch) {
//     console.log('here we go again...')
//     profileChunks = [];
//     for (let i = 0; i <= cursor + offset; i += chunks) {
//       profileChunks.push(retryRequest(i, retry));
//     }
//     cursor += offset;

//     await Promise.all(profileChunks)
//       .then((res) => {
//         // console.log('----res');
//         // console.log(res);
//         // console.log(res[0]);
//         data = refactorData(res, dataProfiles);
//         dataProfiles = data.dataProfiles;
//         // nbProfilesFetched = Object.keys(dataProfiles).length;
//         // if(nbProfilesFetched == 0 && !dataProfiles.continueFetch) {
//         // console.log(data);
//         if(!data.continueFetch) {
//           console.log("No more profiles to fetch");
//           continueFetch = false;
//         }
//       })
//       .catch((error) => {
//         throw new Error(error);
//       });

//     readline.cursorTo(process.stdout, 0);
//     process.stdout.write(
//       `Profiles fetched: ${Object.keys(dataProfiles).length}\n`
//     );

//     await new Promise((resolve: any) => setTimeout(resolve, chunksWaitTime));
//   }

//   return dataProfiles;
// };
