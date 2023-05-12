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
