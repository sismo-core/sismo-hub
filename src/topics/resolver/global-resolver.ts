import { BigNumberish } from "ethers";
import { IResolver, resolverFactory, testResolverFactory } from "./resolver";
import { FetchedData } from "topics/group";

type Resolver = { resolver: IResolver; regExp: RegExp };

export class GlobalResolver {
  resolverRouter: Resolver[] = [];

  constructor(regExps = Object.keys(resolverFactory)) {
    const factory = regExps.includes("^test:")
      ? testResolverFactory
      : resolverFactory;

    regExps.map((regexp: string) => {
      if (factory[regexp] === undefined) {
        throw new Error(`The RegExp ${regexp} is not mapped to any resolver`);
      }
      this.resolverRouter.push({
        resolver: factory[regexp],
        regExp: new RegExp(regexp),
      });
    });
  }

  public async resolveAll(rawData: FetchedData): Promise<FetchedData> {
    const resolvedIdentifierData: FetchedData = {};

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
          resolvedIdentifierData[resolvedAccount] = rawDataSample[1];
          isResolved = true;
        }
      }
      if (!isResolved) {
        throw new Error(
          `The data ${rawDataSample[0]} with value ${rawDataSample[1]} can't be resolved`
        );
      }
    };

    await this.withConcurrency(Object.entries(rawData), resolvedFunction, {
      concurrency: 10,
    });

    return Object.fromEntries(
      Object.entries(resolvedIdentifierData).map(([k, v]) => [
        k.toLowerCase(),
        v,
      ])
    );
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
}
