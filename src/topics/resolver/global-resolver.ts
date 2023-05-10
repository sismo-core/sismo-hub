import {
  IResolver,
  ResolverFactory,
  resolverFactory,
  testResolverFactory,
} from "./resolver";
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
  factory: ResolverFactory;

  constructor(
    regExps = Object.keys(resolverFactory),
    ignoreAccountErrorsWhenResolving = process.env.SH_IGNORE_RESOLVING_ERRORS
  ) {
    this.ignoreAccountErrorsWhenResolving =
      ignoreAccountErrorsWhenResolving === "true";

    this.factory = regExps.includes("^test:")
      ? testResolverFactory
      : resolverFactory;

    regExps.map((regexp: string) => {
      if (this.factory[regexp] === undefined) {
        throw new Error(`The RegExp ${regexp} is not mapped to any resolver`);
      }
      this.resolverRouter.push({
        resolver: this.factory[regexp].resolver,
        regExp: new RegExp(regexp),
        accountSource: this.factory[regexp].accountSource,
        accountType: this.factory[regexp].accountType,
      });
    });
  }

  public async resolveAll(rawData: FetchedData): Promise<ResolveAllType> {
    const updatedRawData: FetchedData = rawData;
    const resolvedIdentifierData: FetchedData = {};
    const accountSources: AccountSource[] = [];

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

    let resolver;
    for (const [accountType, data] of Object.entries(rawDataByAccountType)) {
      // find the resolver object that matches the account type
      resolver = Object.entries(this.factory).find(
        ([, resolverObject]) => resolverObject.accountType == accountType
      );
      // if resolver found, resolve the data
      if (resolver) {
        const resolvedAccounts = await resolver[1].resolver.resolve(data);
        Object.entries(resolvedAccounts).forEach(([resolvedAccount, value]) => {
          resolvedIdentifierData[resolvedAccount] = value;
        });
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
      accountSources,
    };
  }
}
