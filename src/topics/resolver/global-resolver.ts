import {
  IResolver,
  ResolverFactory,
  resolverFactory,
  testResolverFactory,
} from "./resolver";
import { handleResolvingErrors } from "./utils";
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
  [accountType: string]: FetchedData;
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
    const accountSources: AccountSource[] = [];
    let resolvedIdentifierData: FetchedData = {};

    const rawDataByAccountType: AccountsData = {};

    for (const [key, value] of Object.entries(rawData)) {
      let canBeResolved = false;
      for (const resolverObject of this.resolverRouter) {
        if (resolverObject.regExp && resolverObject.regExp.test(key)) {
          canBeResolved = true;
          if (!accountSources.includes(resolverObject.accountSource)) {
            accountSources.push(resolverObject.accountSource);
          }
          if (!rawDataByAccountType[resolverObject.accountType]) {
            rawDataByAccountType[resolverObject.accountType] = {};
          }
          rawDataByAccountType[resolverObject.accountType][key] = value;
        }
      }
      if (!canBeResolved) {
        handleResolvingErrors(`Account ${key} cannot be resolved`);
      }
    }

    for (const [accountType, data] of Object.entries(rawDataByAccountType)) {
      // find the resolver object that matches the account type
      const resolver = Object.entries(this.factory).find(
        ([, resolverObject]) => resolverObject.accountType == accountType
      );
      // if resolver found, resolve the data
      if (resolver) {
        resolvedIdentifierData = {
          ...resolvedIdentifierData,
          ...(await resolver[1].resolver.resolve(data)),
        };
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
