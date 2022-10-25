# How to use GitHub Provider

## Setup the provider

## Use the provider

To use the GitHub Provider you juste have to use 1 method: ```getRepositoriesContributors```

There are 3 arguments to give to this method:
- ```repositories```
- ```getOrganizationMembers```
- ```defaultValue```

### repositories

```repositories``` is the array that contains all the repository you want to fetch. For example if I want to fetch all contributors of the Solidity Repository from Ethereum will give this argument : ```["ethereum/solidity"]```

### getOrganizationMembers

```getOrganizationMembers``` allow you to decide to fetch the members of the organization or not.
If ```{getOrganizationMembers: true}``` it will add the members else if ```getOrganizationMembers``` it will not do it.

### defaultValue

```defaultValue``` define the value of all the items of the method returned object.
The returned object has this form:
```
{
    "github-user-1":value-defined,
    "github-user-1":value-defined
}
 ```
So here defaultValue is the value of all ```value-defined```.
By default the value is 1.

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
