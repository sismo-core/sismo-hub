# How to use the *Lens Provider*

## Use the provider

### Methods

- `getFollowers` : fetch all the followers of a Lens profile

- `getWhoCollectedPublication` : fetch all the collectors of a lens publication

- `getWhoMirroredPublication` : fetch all the mirrorers of a lens publication

### Arguments

- `profileId` : Lens profile id
- `publicationId` : Lens publication id

### Usage

First you need to instantiate the Lens Provider:
```TypeScript
const lensProvider = new dataProviders.LensProvider();
 ```

Then you will have to use one of the Lens Provider methods.
For example here, `getWhoCollectedPublication` :
```TypeScript
const collectors: FetchedData = await lensProvider.getWhoCollectedPublication({
  publicationId: "0x26e5-0x02",
});
 ```

Here you will fetch all the collectors of the [first Sismo post on Lens](https://lenster.xyz/posts/0x26e5-0x02).

Finally, here is a sample of what you should get in return:

```TypeScript
{
  "0x97c4e26a6a066c50d3ffef8272183f7086558e06": "1",
  "0xfb4351cef4808d990ea4e7eae86c61c30d1135ee": "1",
  "0x104c9f11903507977a3f486b6a296df90742665f": "1",
  "0xe8264969b6c4a26913a0336d0e809c8824c9586a": "1",
  "0x7ebae76523495f0473ea934f75563cd3ba7a8850": "1",
  "0xaf002b63f2d353c88dc4628d2ee894d97cbbc10e": "1",
  ...
) 
```