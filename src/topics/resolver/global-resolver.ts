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

    const resolvedFunction = async (rawDataSample: [string, BigNumberish]) => {
      let isResolved = false;
      for (const resolverObject of this.resolverRouter) {
        if (
          resolverObject.regExp &&
          resolverObject.regExp.test(rawDataSample[0])
        ) {
          const resolvedAccount = await resolverObject.resolver.resolve(
            rawDataSample[0]
          );
          if (resolvedAccount !== "undefined") {
            if (!accountTypes.includes(resolverObject.accountType)) {
              accountTypes.push(resolverObject.accountType);
            }

            resolvedIdentifierData[resolvedAccount] = rawDataSample[1];
            isResolved = true;
          }
        }
      }
      if (!isResolved) {
        this.handleResolvingErrors(rawDataSample);
        delete updatedRawData[rawDataSample[0]];
      }
    };

    await this.withConcurrency(Object.entries(rawData), resolvedFunction, {
      concurrency: 10,
    });

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
  public async withConcurrency<T, K>(
    myItemArray: T[],
    fn: (item: T) => Promise<K>,
    { concurrency = 5 }
  ) {
    const array: K[][] = [];
    let data: K[] = [];
    for (let i = 0; i < myItemArray.length / concurrency; i++) {
      const requests: Promise<K>[] = myItemArray
        .slice(i * concurrency, (i + 1) * concurrency)
        .map((item) => fn(item));
      data = await Promise.all(requests);
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
