import { BigNumberish } from "ethers";
import { IResolver, resolverFactory, testResolverFactory } from "./resolver";
import { AccountSource, AccountType, FetchedData } from "topics/group";

type Resolver = {
  resolver: IResolver;
  regExp: RegExp;
  accountSource: AccountSource;
  accountType: AccountType;
};

type ResolveAllType = {
  updatedRawData: FetchedData;
  resolvedIdentifierData: FetchedData;
  accountSources: AccountSource[];
};

type AccountsData = {
  [accountSource: string]: FetchedData;
};

export class GlobalResolver {
  resolverRouter: Resolver[] = [];
  ignoreAccountErrorsWhenResolving: boolean;

  constructor(
    regExps = Object.keys(resolverFactory),
    ignoreAccountErrorsWhenResolving = process.env.SH_IGNORE_RESOLVING_ERRORS
  ) {
    this.ignoreAccountErrorsWhenResolving =
      ignoreAccountErrorsWhenResolving === "true";

    const factory = regExps.includes("^test:")
      ? testResolverFactory
      : resolverFactory;

    regExps.map((regexp: string) => {
      if (factory[regexp] === undefined) {
        throw new Error(`The RegExp ${regexp} is not mapped to any resolver`);
      }
      this.resolverRouter.push({
        resolver: factory[regexp].resolver,
        regExp: new RegExp(regexp),
        accountSource: factory[regexp].accountSource,
        accountType: factory[regexp].accountType,
      });
    });
  }

  public async resolveAll(rawData: FetchedData): Promise<ResolveAllType> {
    const updatedRawData: FetchedData = rawData;
    const resolvedIdentifierData: FetchedData = {};
    const accountSources: AccountSource[] = [];

    console.log("rawData", rawData);

    const rawDataByAccountType: AccountsData = {};

    for (const [key, value] of Object.entries(rawData)) {
      for (const resolverObject of this.resolverRouter) {
        if (resolverObject.regExp && resolverObject.regExp.test(key)) {
          if (!accountSources.includes(resolverObject.accountSource)) {
            accountSources.push(resolverObject.accountSource);
          }
          if (
            !Object.prototype.hasOwnProperty.call(
              rawDataByAccountType,
              resolverObject.accountType
            )
          ) {
            rawDataByAccountType[resolverObject.accountType] = {};
          }
          rawDataByAccountType[resolverObject.accountType][key] = value;
        }
      }
    }

    console.log("rawDataByAccountType", rawDataByAccountType);

    let resolver;
    for (const [accountType, data] of Object.entries(rawDataByAccountType)) {
      // find the resolver object that matches the account type
      resolver = Object.entries(resolverFactory).find(
        ([, resolverObject]) => resolverObject.accountType == accountType
      );
      // if resolver found, resolve the data
      if (resolver) {
        const resolvedAccounts = await resolver[1].resolver.resolve(
          Object.keys(data)
        );
        console.log("=>resolvedAccounts", resolvedAccounts);
        resolvedAccounts.forEach((resolvedAccount, i) => {
          resolvedIdentifierData[resolvedAccount] = Object.values(data)[i];
        });
      }
    }

    // let resolverEntry;
    // for (const [accountType, data] of Object.entries(rawDataByAccountType)) {
    //   let isResolved = false;
    //   // find the resolver object that matches the account type
    //   resolverEntry = Object.entries(resolverFactory).find(
    //     ([, resolverObject]) => resolverObject.accountType == accountType
    //   );
    //   // if found, resolve the data
    //   if (resolverEntry) {
    //     const resolver = resolverEntry[1].resolver;
    //     const resolvedAccounts = await resolver.resolve(Object.keys(data));
    //     if (resolvedAccounts[0] !== "undefined") {
    //       // ça ça va changer => itérer sur les resolvedAccounts
    //       resolvedIdentifierData[resolvedAccounts[0]] = Object.values(data)[0];
    //       isResolved = true;
    //     }
    //     if (!isResolved) {
    //       // ça ça va changer
    //       this.handleResolvingErrors([
    //         Object.keys(data)[0],
    //         Object.values(data)[0],
    //       ]);
    //       delete updatedRawData[Object.keys(data)[0]];
    //     }
    //   }
    // }

    console.log("resolvedIdentifierData", resolvedIdentifierData);

    return {
      updatedRawData,
      resolvedIdentifierData: Object.fromEntries(
        Object.entries(resolvedIdentifierData).map(([k, v]) => [
          k.toLowerCase(),
          v,
        ])
      ),
      accountSources,
    };
  }

  // public async resolveAll(rawData: FetchedData): Promise<ResolveAllType> {
  //   const updatedRawData: FetchedData = rawData;
  //   const resolvedIdentifierData: FetchedData = {};
  //   const accountSources: AccountSource[] = [];

  //   console.log("rawData", rawData);

  //   const rawDataByAccountType: AccountsData = {};

  //   for (const [key, value] of Object.entries(rawData)) {
  //     for (const resolverObject of this.resolverRouter) {
  //       if (resolverObject.regExp && resolverObject.regExp.test(key)) {
  //         if (
  //           !Object.prototype.hasOwnProperty.call(
  //             rawDataByAccountType,
  //             resolverObject.accountSource
  //           )
  //         ) {
  //           rawDataByAccountType[resolverObject.accountSource] = {};
  //         }
  //         rawDataByAccountType[resolverObject.accountSource][key] = value;
  //       }
  //     }
  //   }

  //   console.log("rawDataByAccountType", rawDataByAccountType);

  //   const resolvedFunction = async (
  //     rawDataSample: [string, BigNumberish][]
  //   ) => {
  //     const rawDataSampleUpdated = rawDataSample.map(([k]) => k);
  //     console.log(rawDataSample);
  //     console.log(rawDataSampleUpdated);

  //     // let resolverEntry;
  //     // Object.entries(rawDataByAccountType).forEach(([accountSource, data]) => {
  //     //   resolverEntry = Object.entries(resolverFactory).find(
  //     //     ([, resolverObject]) => resolverObject.accountSource == accountSource
  //     //   );
  //     //   if (resolverEntry) {
  //     //     resolverEntry[1].resolver.resolve(Object.);
  //     //   }
  //     // });

  //     let isResolved = false;
  //       for (const resolverObject of this.resolverRouter) {
  //         // ça ça va pas changer
  //         if (
  //           resolverObject.regExp &&
  //           resolverObject.regExp.test(rawDataSampleUpdated[0])
  //         ) {
  //           const resolvedAccount = await resolverObject.resolver.resolve(
  //             rawDataSampleUpdated
  //           );
  //           if (resolvedAccount[0] !== "undefined") {
  //             // ça ça va changer
  //             resolvedIdentifierData[resolvedAccount[0]] = rawDataSample[0][1];
  //             isResolved = true;
  //           }
  //         }
  //       }
  //       if (!isResolved) {
  //         // ça ça va changer
  //         this.handleResolvingErrors(rawDataSample[0]);
  //         delete updatedRawData[rawDataSample[0][0]];
  //       }
  //   };

  //   for (const [accountSource] of Object.entries(rawDataByAccountType)) {
  //     if (accountSource === "twitter") {
  //       await this.withConcurrency(
  //         Object.entries(rawDataByAccountType[accountSource]),
  //         resolvedFunction,
  //         {
  //           concurrency: 10,
  //           batchSize: 5,
  //         }
  //       );
  //     } else {
  //       await this.withConcurrency(
  //         Object.entries(rawDataByAccountType[accountSource]),
  //         resolvedFunction,
  //         {
  //           concurrency: 10,
  //         }
  //       );
  //     }
  //   }

  //   return {
  //     updatedRawData,
  //     resolvedIdentifierData: Object.fromEntries(
  //       Object.entries(resolvedIdentifierData).map(([k, v]) => [
  //         k.toLowerCase(),
  //         v,
  //       ])
  //     ),
  //     accountSources,
  //   };
  // }

  public async withConcurrency<T, K>(
    myItemArray: T[],
    fn: (items: T[]) => Promise<K>,
    { concurrency = 5, batchSize = 1 }
  ) {
    const array: K[][] = [];
    console.log("myItemArray", myItemArray);

    for (
      let batchStart = 0;
      batchStart < myItemArray.length;
      batchStart += batchSize * concurrency
    ) {
      const requests: Promise<K>[] = [];

      for (
        let i = batchStart;
        i < batchStart + batchSize * concurrency && i < myItemArray.length;
        i += batchSize
      ) {
        const itemsBatch = myItemArray.slice(
          i,
          Math.min(i + batchSize, myItemArray.length)
        );
        console.log("itemsBatch", itemsBatch);
        requests.push(fn(itemsBatch));
      }

      const data = await Promise.all(requests);
      array.push(data);
    }

    return array.flat(1);
  }

  public handleResolvingErrors(rawDataSample: [string, BigNumberish]) {
    const errorMessage = `The data ${rawDataSample[0]} with value ${rawDataSample[1]} can't be resolved`;
    if (!this.ignoreAccountErrorsWhenResolving) {
      throw new Error(errorMessage);
    }
  }
}
