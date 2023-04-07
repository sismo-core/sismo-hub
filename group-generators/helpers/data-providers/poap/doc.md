# How to use the *POAP Provider*

### Methods

- `queryEventsTokenOwners` : fetch all the holders of a POAP

### Arguments

- `eventIds` : ids of the POAP

### Usage

First you need to instantiate the POAP Provider:
```TypeScript
const poapProvider = new dataProviders.PoapSubgraphProvider();
 ```

Then you will have to use the method:
```TypeScript
const holders: FetchedData = await poapProvider.queryEventsTokenOwners({
  eventIds: [80235, 81377],
});
 ```

Here you will fetch all the collectors of the these poaps:
- [User Testing #2](https://poap.gallery/r/event/80235)
- [Contributor #2](https://poap.gallery/r/event/81377)

Finally, here is a sample of what you should get in return:

```TypeScript
{
  "0x6b5D2fb4a7e970c1bacBe80cEB20f025618125AE":"1"
  "0x5DFC5b95D1e98f1066ac87cf0dEC6cD6A8F7772c":"1"
  "0x320f2f8964102c5e5884196a05d88c4417905ad2":"1"
  ...
) 
```