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
