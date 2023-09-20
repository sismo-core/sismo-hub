# POAP Provider

## Use the provider

### Methods

#### queryEventsTokenOwners

This method allows you to fetch all the POAP holders for different Event IDs.

There are 2 arguments to give to this method:

- `eventIds` : the array of POAP Event IDs
- `getPower` boolean: if set to true, the total power of the user for the POAPs will be his value. Else the value will be the number of POAP owned per address

The format of the object returned by the method:

```json
{
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": "1",
  "0x8ab1760889F26cBbf33A75FD2cF1696BFccDc9e6": "3"
}
```

### Usage

- Instantiate the GitHub Provider:

  ```TypeScript
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();
  ```

- Then use one of the GitHub Provider methods. For example :

  ```TypeScript
    const poapSubgraphProviderData0 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: ["3532", "8507", "14048", "32225", "47553", "63182"],
    });
  ```

Here you will fetch all early rAAVE attendees.

Finally, you will get a [FetchedData](../src/topics/group/group.types.ts) object in return (which can the be used to generate a Data Group). Here is a sample of it:

```json
{
  "0xce7e15acf3da916a4df4842c3350248ad74ffc79": "3",
  "0x54becc7560a7be76d72ed76a1f5fee6c5a2a7ab6": "4",
  "0x37341cbb14c5f128a70b149726ad8b2ce6f4c793": "2",
  ...
}
```
