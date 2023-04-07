# How to use the *DegenScore Provider*

### Methods

- `getBeaconOwnersWithScore` : fetch all the holders of the [DegenScore beacon](https://degenscore.com/beacon) with a minimum score

### Arguments

- `score` : the minimum score

### Usage

First you need to instantiate the GitPOAP Provider:
```TypeScript
const degenScoreProvider = new dataProviders.DegenScoreProvider();
 ```

Then you will have to use the method:
```TypeScript
const addresses = await degenscoreProvider.getBeaconOwnersWithScore({score: 900});
 ```

Here you will fetch all the holders of the DegenScore beacon with a minimum score of 900.

Finally, here is a sample of what you should get in return:

```TypeScript
{
  "0x123...456":"1"
  "0x456...789":"1"
  "0x789...123":"1"
  ...
) 
```

[**Here**](group-generators/generators/degenscore-over-900/index.ts) is an example of group that use the DegenScore Provider.