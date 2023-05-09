export type EnsSubdomainsResponse = {
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

export type EnsDomainParams = { subdomain: string };
