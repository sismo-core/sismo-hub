<br />
<div align="center">
  <img src="docs/top.png" alt="Logo" width="100" height="100" style="borderRadius: 20px">

  <h3 align="center">
    Sismo Data Sources
  </h3>

  <p align="center">
    Made by <a href="https://www.docs.sismo.io/" target="_blank">Sismo</a>
  </p>
  
  <p align="center">
    <a href="https://discord.gg/sismo" target="_blank">
        <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"/>
    </a>
    <a href="https://twitter.com/sismo_eth" target="_blank">
        <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"/>
    </a>
  </p>
  <a href="https://www.sismo.io/" target="_blank">
    
  </a>
</div>
<br/>

Sismo data source is an off-chain infrastructure which allow to generate groups used by attesters in the Sismo protocol.

## Lists

**Generate a list in local**

``` sh
yarn generate:list sismo-POAPs
```

## Attester groups

Attester groups generator are not open source yet.

Here is a code snippet of what it will look like :

``` javascript
export default new AttesterGroupsGenerator({
  name: "hydra-s1-simple",
  generate: async () => {
    // construct your groups
    const groups = [
      createGroupFromList({
        listIndex: 1,
        list: await ListDocument.getLatestList({
          generatorName: "sismo-POAPs",
        }),

        metadata: {
          name: "Sismo Diggers",
          description:
            "Ethereum Accounts who have a POAP for contributing to sismo",
        },
      }),
      createGroupFromList({
        listIndex: 2,
        list: await ListOperator.join(
          await ListDocument.getLatestList({ generatorName: "sismo-POAPs" }),
          await ListDocument.getLatestList({ generatorName: "sismo-domains" })
        ),
        metadata: {
          name: "Sismo Citizens",
          description:
            "Ethereum Accounts who have a sismo.eth ENS subdomain or a POAP for contributing to sismo",
        },
      }),
      createGroupFromList({
        listIndex: 3,
        list: await ListOperator.join(
          await ListDocument.getLatestList({ generatorName: "eth-user" }),
          await ListDocument.getLatestList({ generatorName: "eth-owner" })
        ),
        metadata: {
          name: "Sismo Guest",
          description:
            "Ethereum Accounts who have more than 1 ether or have done more than 20 transactions.",
        },
      }),
    ];
    return groups;
  },
  // Hydra S1 Registry Accounts trees structure
  formatter: hydraS1Formatter,
});

export type HydraS1GroupProperties = {
  listIndex: number;
  generationTimestamp: number;
  isScore: boolean;
};

const createGroupFromList = ({
  listIndex,
  list,
  metadata,
}: {
  listIndex: number;
  list?: List;
  metadata?: any;
}) => {
  if (!list) {
    throw new Error("List not found !");
  }
  const properties: HydraS1GroupProperties = {
    listIndex,
    generationTimestamp: getTimestampFromDate(list.generationDate),
    isScore: list.valueType === ValueType.Score ? true : false,
  };
  return new Group<HydraS1GroupProperties>({
    id: generateGroupIdFromProperties(properties),
    data: list.data,
    properties,
    metadata: {
      tags: list.tags,
      valueType: list.valueType,
      numberOfAddresses: Object.keys(list.data),
      ...metadata,
    },
  });
};

export const generateGroupIdFromProperties = (
  groupProperties: HydraS1GroupProperties
): string => {
  return BigNumber.from(
    ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ["uint128", "uint32", "bool"],
        [
          groupProperties.listIndex,
          groupProperties.generationTimestamp,
          groupProperties.isScore,
        ]
      )
    )
  )
    .mod(SNARK_FIELD)
    .toHexString();
};
```

## License

Distributed under the MIT License.

## Contribute

Please, feel free to open issues, PRs or simply provide feedback!

## Contact

Prefer [Discord](https://discord.gg/uAPtsfNrve) or [Twitter](https://twitter.com/sismo_eth)

<br/>
<img src="https://static.sismo.io/readme/bottom-main.png" alt="bottom" width="100%" >