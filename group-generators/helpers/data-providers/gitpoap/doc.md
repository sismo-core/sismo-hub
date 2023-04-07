# How to use the *GitPOAP Provider*

### Methods

- `getGitPoapHoldersByEventId` : fetch all the holders of a GitPOAP

### Arguments

- `gitPoapEventId` : ids of the GitPOAP

### Usage

First you need to instantiate the GitPOAP Provider:
```TypeScript
const gitPoapProvider = new dataProviders.GitPoapProvider();
 ```

Then you will have to use the method:
```TypeScript
const holders: FetchedData = await gitPoapProvider.getGitPoapHoldersByEventId({gitPoapEventId: "831"});
 ```

Here you will fetch all the collectors of this GitPOAP: [2023 Sismo Contributor](https://www.gitpoap.io/gp/831)

Finally, here is a sample of what you should get in return:

```TypeScript
{
  "0x183bDB344A07Ee3D27f07AC4799A56E4A2fE5439":"1"
  "0x841AD0AbAb2D33520ca236A2F5D8b038adDc12BA":"1"
  "0x544a40955bA1C7e56E161a59E1319e3313C25251":"1"
  ...
) 
```