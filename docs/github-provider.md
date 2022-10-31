# How to use the *GitHub Provider*

## Setup the provider

---

## Use the provider

There is 2 main methods in the GitHub Provider:
- ```getRepositoriesContributors```
- ```getRepositoriesStargazers```

### getRepositoriesContributors

**This method allow you to fetch all the contributors of one or more GitHub repositories.**

There are 3 arguments to give to this method:
- ```repositories```
- ```getOrganizationMembers```
- ```defaultValue```

### getRepositoriesStargazers

**This method allow you to fetch all the GitHub user who put a star on one or more GitHub repositories.**

There are 2 arguments to give to this method:
- ```repositories```
- ```defaultValue```

#### repositories

```repositories``` is the array that contains all the repository you want to fetch. For example if I want to fetch all contributors of the Solidity Repository from Ethereum will give this argument : ```["ethereum/solidity"]```

#### defaultValue

```defaultValue``` define the value of all the items of the method returned object.
The returned object has this form:
```
{
    "github-user-1":2,
    "github-user-1":2
}
 ```
So here, in this example, ```defaultValue``` is 2.
By default ```defaultValue``` is 1.

#### getOrganizationMembers

This is concerning only the ```getRepositoriesContributors``` method.
```getOrganizationMembers``` allow you to fetch the members of the organizations that own the repositories or not (in addition to the collaboraters). If ```{getOrganizationMembers: true}``` it will add the members, else if ```{getOrganizationMembers: false}``` it will not do it.

---

## Result

Finally, This is what the request should look like :
```
const data: FetchedData = await gitHubProvider.getRepositoriesContributors(["ethereum/solidity"], {getOrganizationMembers: true});
 ```

Here is a sample of what you will probaly get

```
{
  'github:chriseth:9073706': 1,
  'github:axic:20340': 1,
  'github:cameel:137030': 1,
  'github:leonardoalt:504195': 1,
  ...
}
  ```
