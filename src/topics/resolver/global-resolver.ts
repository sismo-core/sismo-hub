import { IResolver, ResolverFactory, resolverFactory, testResolverFactory } from "./resolver";
import { handleResolvingErrors } from "./utils";
import { AccountType, FetchedData } from "topics/group";

type Resolver = {
  resolver: IResolver;
  regExp: RegExp;
  accountType: AccountType;
};

type ResolveAllType = {
  updatedRawData: FetchedData;
  resolvedIdentifierData: FetchedData;
  accountSources: string[];
};

type AccountsData = Map<Resolver, FetchedData>;

export class GlobalResolver {
  resolverRouter: Resolver[] = [];
  factory: ResolverFactory;
  ignoreAccountErrorsWhenResolving: boolean;

  constructor(
    regExps = Object.keys(resolverFactory),
    ignoreAccountErrorsWhenResolving: string | undefined = process.env.SH_IGNORE_RESOLVING_ERRORS
  ) {
    this.factory = regExps.includes("^test:") ? testResolverFactory : resolverFactory;

    regExps.map((regexp: string) => {
      if (this.factory[regexp] === undefined) {
        throw new Error(`The RegExp ${regexp} is not mapped to any resolver`);
      }
      this.resolverRouter.push({
        resolver: this.factory[regexp].resolver,
        regExp: new RegExp(regexp),
        accountType: this.factory[regexp].accountType,
      });
    });

    this.ignoreAccountErrorsWhenResolving = ignoreAccountErrorsWhenResolving === "true";
  }

  public async resolveAll(accounts: FetchedData): Promise<ResolveAllType> {
    const accountsByType: AccountsData = new Map();

    for (const [account, value] of Object.entries(accounts)) {
      let canBeResolved = false;
      for (const resolverObject of this.resolverRouter) {
        if (resolverObject.regExp && resolverObject.regExp.test(account)) {
          canBeResolved = true;
          const accounts = accountsByType.get(resolverObject);
          if (!accounts) {
            accountsByType.set(resolverObject, { [account]: value });
          } else {
            accounts[account] = value;
            accountsByType.set(resolverObject, accounts);
          }
        }
        if (canBeResolved) {
          break;
        }
      }
      if (!canBeResolved) {
        handleResolvingErrors(
          `Account ${account} cannot be resolved. Is the account type correct?`,
          this.ignoreAccountErrorsWhenResolving
        );
      }
    }

    let resolvedAccounts: FetchedData = {};
    let updatedAccounts: FetchedData = {};
    let allAccountSources: string[] = [];

    for (const [resolver, accounts] of accountsByType) {
      const {
        accountSources,
        resolvedAccountsRaw: updatedAccountsFromResolver,
        resolvedAccounts: resolvedAccountsFromResolver,
      } = await resolver.resolver.resolve(accounts);

      updatedAccounts = {
        ...updatedAccounts,
        ...updatedAccountsFromResolver,
      };

      resolvedAccounts = {
        ...resolvedAccounts,
        ...resolvedAccountsFromResolver,
      };

      allAccountSources = [...allAccountSources, ...accountSources];
    }

    if (Object.keys(resolvedAccounts).length === 0) {
      handleResolvingErrors("No accounts were resolved");
    }

    return {
      updatedRawData: updatedAccounts,
      resolvedIdentifierData: Object.fromEntries(
        Object.entries(resolvedAccounts).map(([k, v]) => [k.toLowerCase(), v])
      ),
      accountSources: allAccountSources,
    };
  }
}
