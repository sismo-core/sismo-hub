# How to use the *GitHub Provider*

## Setup the provider

To setup the provider you need to do 2 main things:
- get an access token from your GitHub account
- set the access token in your development environment

ℹ️ You can also use the GitHub API without access token. But you will be limited in the number of request you can make.
So you are free to skip this setup part untill you are limited by the api.

### Access token

- Go to https://github.com/settings/tokens/ and click on "Generate new token" button. (you can choose either a "Fine-grained token" or a "Classic token").
- After generating the token, keep it preciously.

### Set the token

- Create a new file named `.env` at the root of the project and write this line: `export SH_GITHUB_TOKEN="<token_generated>"`. 
  Replace `<token_generated>` with the token you just copied from GitHub.
- Run this command: `source .env`.
  This command allow you to export the `SH_GITHUB_TOKEN` environment variable and use it in the Sismo Hub application.


You can now use the GitHub Provider!


---

## Use the provider

### Methods

There are 2 main methods in the GitHub Provider:
- `getRepositoriesContributors`
- `getRepositoriesStargazers`

<br>

#### getRepositoriesContributors

**This method allow you to fetch all the contributors of one or more GitHub repositories.**

There are 3 arguments to give to this method:
- `repositories`
- `getOrganizationMembers`
- `defaultValue`

#### getRepositoriesStargazers

**This method allow you to fetch all the GitHub user who put a star on one or more GitHub repositories.**

There are 2 arguments to give to this method:
- `repositories`
- `defaultValue`

<br>

#### Arguments

##### repositories

`repositories` is the array that contains all the repository you want to fetch.
For example, if you want to fetch all the contributors of the Solidity GitHub repository from Ethereum, you need to pass this argument: `["ethereum/solidity"]`

##### defaultValue

`defaultValue` defines the level that will be attributed to the retrieved GitHub users. By default, the level is 1 and should only be changed for a specific application (voting weight with the badge for example).

The object returned by the methods is of this form:
```TypeScript
{
    "github:username:id":2,
    "github:username:id":2
}
 ```
So here, in this example, `defaultValue` is 2.
By default `defaultValue` is 1.

ℹ️ `username` and `id` corespond to the GitHub username and id of the user.

##### getOrganizationMembers

This concerns only the `getRepositoriesContributors` method.
`getOrganizationMembers` allow you to fetch the members of the organizations that own the repositories or not (in addition to the contributors). If `{getOrganizationMembers: true}` it will add the members, else if `{getOrganizationMembers: false}` it will not do it.

<br>

### Usage

First you need to instantiate the GitHub Provider:
```TypeScript
const githubProvider = new dataProviders.GithubProvider();
 ```

Then you will have to use one of the GitHub Provider methods.
For example :
```TypeScript
const data: FetchedData = await githubProvider getRepositoriesContributors(["ethereum/solidity"], {getOrganizationMembers: true});
 ```

Here you will fetch all Solidity repository contributors and Ethereum organization members.

Finally, here is a sample of what you will get in return:

```TypeScript
{
  'github:chriseth:9073706': 1,
  'github:axic:20340': 1,
  'github:cameel:137030': 1,
  'github:leonardoalt:504195': 1,
  ...
}
  ```
