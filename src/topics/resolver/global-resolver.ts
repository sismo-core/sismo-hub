import { BigNumberish } from "ethers";
import { IResolver, resolverFactory, testResolverFactory } from "./resolver";
import { AccountSource, FetchedData } from "topics/group";

type Resolver = {
  resolver: IResolver;
  regExp: RegExp;
  accountType: AccountSource;
};

type ResolveAllType = {
  updatedRawData: FetchedData;
  resolvedIdentifierData: FetchedData;
  accountTypes: AccountSource[];
};

type AccountsData = {
  [accountType: string]: FetchedData;
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
        accountType: factory[regexp].accountType,
      });
    });
  }

  public async resolveAll(rawData: FetchedData): Promise<ResolveAllType> {
    const updatedRawData: FetchedData = rawData;
    const resolvedIdentifierData: FetchedData = {};
    const accountTypes: AccountSource[] = [];

    console.log("rawData", rawData);

    const rawDataByAccountType: AccountsData = {};

    for (const [key, value] of Object.entries(rawData)) {
      for (const resolverObject of this.resolverRouter) {
        if (resolverObject.regExp && resolverObject.regExp.test(key)) {
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

    // const resolvedFunction = async (rawDataSample: [string, BigNumberish][]) => {
    //   let isResolved = false;
    //   for(const data of rawDataSample) {
    //     for (const resolverObject of this.resolverRouter) {
    //       if (
    //         resolverObject.regExp &&
    //         resolverObject.regExp.test(data[0])
    //       ) {
    //         const resolvedAccount = await resolverObject.resolver.resolve(
    //           data[0]
    //         );
    //         if (resolvedAccount !== "undefined") {
    //           if (!accountTypes.includes(resolverObject.accountType)) {
    //             accountTypes.push(resolverObject.accountType);
    //           }

    //           resolvedIdentifierData[resolvedAccount] = data[1];
    //           isResolved = true;
    //         }
    //       }
    //     }
    //     if (!isResolved) {
    //       this.handleResolvingErrors(data);
    //       delete updatedRawData[data[0]];
    //     }
    //   }
    //   return [];
    // };

    // const resolvedFunction = async (rawDataSample: [string, BigNumberish][]) => {
    //   let isResolved = false;
    //   for(const data of rawDataSample) {
    //     for (const resolverObject of this.resolverRouter) {
    //       if (
    //         resolverObject.regExp &&
    //         resolverObject.regExp.test(data[0])
    //       ) {
    //         const resolvedAccount = await resolverObject.resolver.resolve(
    //           data[0]
    //         );
    //         if (resolvedAccount !== "undefined") {
    //           resolvedIdentifierData[resolvedAccount] = data[1];
    //           isResolved = true;
    //         }
    //       }
    //     }
    //     if (!isResolved) {
    //       this.handleResolvingErrors(data);
    //       delete updatedRawData[data[0]];
    //     }
    //   }
    //   return [];
    // };

    const resolvedFunction = async (
      rawDataSample: [string, BigNumberish][]
    ) => {
      const rawDataSampleUpdated = rawDataSample.map(([k]) => k);
      console.log(rawDataSample);
      console.log(rawDataSampleUpdated);
      // console.log("rawDataSample");
      // rawDataSample.forEach((data) => {console.log(data);});
      // rawDataSample.forEach((data) => {Object.entries(data).forEach(([k,v]) => {console.log(k); console.log(v);})});
      // Object.entries(rawDataSample).forEach((data) => {console.log(data);});

      let isResolved = false;
      for (const resolverObject of this.resolverRouter) {
        // ça ça va pas changer
        if (
          resolverObject.regExp &&
          resolverObject.regExp.test(rawDataSampleUpdated[0])
        ) {
          const resolvedAccount = await resolverObject.resolver.resolve(
            rawDataSampleUpdated
          );
          if (resolvedAccount[0] !== "undefined") {
            // ça ça va changer
            resolvedIdentifierData[resolvedAccount[0]] = rawDataSample[0][1];
            isResolved = true;
          }
        }
      }
      if (!isResolved) {
        // ça ça va changer
        this.handleResolvingErrors(rawDataSample[0]);
        delete updatedRawData[rawDataSample[0][0]];
      }
    };

    for (const [accountType] of Object.entries(rawDataByAccountType)) {
      if (accountType === "twitter") {
        await this.withConcurrency(
          Object.entries(rawDataByAccountType[accountType]),
          resolvedFunction,
          {
            concurrency: 10,
            batchSize: 5,
          }
        );
      } else {
        await this.withConcurrency(
          Object.entries(rawDataByAccountType[accountType]),
          resolvedFunction,
          {
            concurrency: 10,
          }
        );
      }
    }

    return {
      updatedRawData,
      resolvedIdentifierData: Object.fromEntries(
        Object.entries(resolvedIdentifierData).map(([k, v]) => [
          k.toLowerCase(),
          v,
        ])
      ),
      accountTypes,
    };
  }

  /* istanbul ignore next */
  // public async withConcurrency<T, K>(
  //   myItemArray: T[],
  //   fn: (item: T) => Promise<K>,
  //   { concurrency = 5 }
  // ) {
  //   const array: K[][] = [];
  //   let data: K[] = [];
  //   for (let i = 0; i < myItemArray.length / concurrency; i++) {
  //     const requests: Promise<K>[] = myItemArray
  //       .slice(i * concurrency, (i + 1) * concurrency)
  //       .map((item) => fn(item));
  //     data = await Promise.all(requests);
  //     array.push(data);
  //   }
  //   return array.flat(1);
  // }

  // public async testWithConcurrencyTwitter(itemsBatch: any) {
  //   console.log("itemsBatch", itemsBatch);
  //   return itemsBatch;
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
