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

type AccountsData = Map<Resolver, FetchedData>;

export class GlobalResolver {
  resolverRouter: Resolver[] = [];
  factory: ResolverFactory;
  ignoreAccountErrorsWhenResolving: boolean;

  constructor(
    regExps = Object.keys(resolverFactory),
    ignoreAccountErrorsWhenResolving?: boolean
  ) {
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

    this.ignoreAccountErrorsWhenResolving =
      ignoreAccountErrorsWhenResolving === true;
  }

  public async resolveAll(accounts: FetchedData): Promise<ResolveAllType> {
    const accountSources: AccountSource[] = [];
    let resolvedAccounts: FetchedData = {};
    const accountsByType: AccountsData = new Map();

    for (const [account, value] of Object.entries(accounts)) {
      let canBeResolved = false;
      for (const resolverObject of this.resolverRouter) {
        if (resolverObject.regExp && resolverObject.regExp.test(account)) {
          canBeResolved = true;
          if (!accountSources.includes(resolverObject.accountSource)) {
            accountSources.push(resolverObject.accountSource);
          }
          const accounts = accountsByType.get(resolverObject);
          if (!accounts) {
            accountsByType.set(resolverObject, { [account]: value });
          } else {
            accounts[account] = value;
            accountsByType.set(resolverObject, accounts);
          }
        }
      }
      if (!canBeResolved) {
        handleResolvingErrors(
          `Account ${account} cannot be resolved. Is the account type correct?`,
          this.ignoreAccountErrorsWhenResolving
        );
      }
    }

    console.log("accountsByType", accountsByType);

    for (const [resolver, accounts] of accountsByType) {
      resolvedAccounts = {
        ...resolvedAccounts,
        ...(await resolver.resolver.resolve(accounts)),
      };
    }

    if (Object.keys(resolvedAccounts).length === 0) {
      throw new Error(`No accounts were resolved`);
    }

    return {
      updatedRawData: accounts,
      resolvedIdentifierData: Object.fromEntries(
        Object.entries(resolvedAccounts).map(([k, v]) => [k.toLowerCase(), v])
      ),
      accountSources,
    };
  }
}
