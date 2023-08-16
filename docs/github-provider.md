# GitHub Provider

## Setup the provider

> ℹ️ You can also use the GitHub API without access token but you can be rate limited (depending on the amount of data you fetch).

### Get an access token

- Go to https://github.com/settings/tokens/
- Click on "Generate new token" button. (you can choose either a "Fine-grained token" or a "Classic token").
- Keep it preciously.

### Set the token

- Create the .env file:

```bash
# in a new Terminal, at sismo-hub project root
cp .example.env .env
```

- Insert your Access token here: `export SH_GITHUB_TOKEN="your_access_token"`.
  Replace `your_access_token` with the token you just copied from GitHub.
- Then run: `source .env`. This command allows you to export all environment variables defined in the .env file (including the GitHub access token you just setup) and use it in the Sismo Hub application.

---

## Use the provider

### Methods

- `getRepositoriesContributors`
- `getRepositoriesStargazers`

<br>

#### getRepositoriesContributors

This method allows you to fetch all the contributors of one or more GitHub repositories.
The value of each group member is the number of its contributions to the repositories.

There are 2 arguments to give to this method:

- `repositories`
- `getOrganizationMembers`

#### getRepositoriesStargazers

This method allows you to fetch all the GitHub user who put a star on one or more GitHub repositories.

There are 2 arguments to give to this method:

- `repositories`
- `defaultValue`

<br>

#### Arguments

- `repositories` is the array that contains all the repositories you want to fetch.
  For example, if you want to fetch all the contributors of the Solidity GitHub repository from Ethereum, you will pass this argument: `["ethereum/solidity"]`

- `getOrganizationMembers` allow you to fetch the members of the organizations that own the repositories or not (in addition to the contributors). If `{getOrganizationMembers: true}` it will add the members, else if `{getOrganizationMembers: false}` it will not do it.

  The format of the object returned by the methods:

  ```json
  {
    "github:username:id": 4,
    "github:username:id": 2
  }
  ```

  > `username` and `id` correspond to the GitHub username and id of the user. The value of each group member is the number of its contributions to the repositories.

<br>

### Usage

- Instantiate the GitHub Provider:

  ```TypeScript
  const githubProvider = new dataProviders.GithubProvider();
  ```

- Then use one of the GitHub Provider methods. For example :

  ```TypeScript
  const data: FetchedData = await githubProvider.getRepositoriesContributors(["ethereum/solidity"], {getOrganizationMembers: true});
  ```

Here you will fetch all Solidity repository contributors and members of the Ethereum organization.

Finally, you will get a [FetchedData](../src/topics/group/group.types.ts) object in return (which can the be used to generate a Data Group). Here is a sample of it:

```json
{
  "github:chriseth:9073706": "17996",
  "github:axic:20340": "4894",
  "github:cameel:137030": "2858",
  "github:ekpyron:1347491": "2214",
  "github:leonardoalt:504195": "2120",
  ...
}
```
