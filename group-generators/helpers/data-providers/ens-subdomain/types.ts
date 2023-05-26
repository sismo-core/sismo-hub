import { FetchedData } from "topics/group";

export type EnsSubdomainResponse = {
  domains: [
    {
      name: string;
      subdomains: [
        {
          owner: {
            id: string;
          };
        }
      ];
    }
  ];
};

export type EnsDomainParams = { domain: string };

export interface IEnsSubdomainProvider {
  getEnsSubdomains(input: EnsDomainParams): Promise<FetchedData>;
  getEnsSubdomainsCount(input: EnsDomainParams): Promise<number>;
}
