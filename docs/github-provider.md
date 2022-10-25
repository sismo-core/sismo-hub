# How to use GitHub Provider

## Setup the provider

## Use the provider

To use the GitHub Provider you juste have to use 1 method: ```getRepositoriesContributors```

There are 2 arguments to give to this method:
- repositories
- getOrganizationMembers
- defaultValue

GithubRepositories is the array that contains all the repository you want to fetch. For example if I want to fetch all contributors of the Solidity Repository from Ethereum will give this argument : ```["ethereum/solidity"]```

getOrganizationMembers allow you to fetch the member of the organization 