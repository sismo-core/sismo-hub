<br/>
<div align="center">
  <a href="https://www.sismo.io/" target="_blank">
    <img src="https://static.sismo.io/readme/top-main.png" alt="Logo" width="100" height="100" style="borderRadius: 20px">
  </a>

  <h3 align="center">
    Sismo Hub
  </h3>

  <p align="center">
    Made by <a href="https://docs.sismo.io/" target="_blank">Sismo</a>
  </p>

  <p align="center">
    <a href="https://discord.gg/sismo" target="_blank">
        <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"/>
    </a>
    <a href="https://twitter.com/sismo_eth" target="_blank">
        <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"/>
    </a>
  </p>
</div>
<br/>

# What is Sismo?

Sismo is an attestation protocol that enables users to selectively reveal data derived from their web2 or web3 accounts.

Users aggregate their identity and use it to generate ZK proofs that applications can verify on-chain or off-chain. The resulting privacy-preserving attestations—stored in on-chain smart contracts or off-chain databases—are utilized by applications for access control and reputation curation.

If you want more info on what is Sismo and how it works, checkout the docs [here](https://docs.sismo.io/sismo-docs/).

# Sismo Hub

The Sismo Hub is the repository for integrations on Sismo, where you can create:

- [Group Generator](https://docs.sismo.io/sismo-docs/sismo-protocol/groups): Group generators are a reusable tool used by Sismo to generate available [Data Groups](https://docs.sismo.io/sismo-docs/sismo-protocol/groups) for attesters.
  - Here is a tutorial that shows you how to create your Data Group: https://docs.sismo.io/sismo-docs/tutorials/create-your-data-group-developers

<br/>

- [Data Provider](https://docs.sismo.io/sismo-docs/technical-documentation/sismo-hub/group-generators): Data Providers enable to fetch specific data in order to makes Data Groups.
  - Here is a tutorial that shows you how to create your Data Provider: https://docs.sismo.io/sismo-docs/tutorials/create-your-data-provider-developers

If you want to contribute to Sismo Hub, check out the Contributing Guide [here](https://github.com/sismo-core/sismo-hub/blob/main/CONTRIBUTING.md).

<br/>

On top of Data Groups you can create:

- [ZK Badges](https://docs.sismo.io/sismo-docs/sismo-protocol/badges)
- [zkConnect apps](https://docs.sismo.io/sismo-docs/what-is-sismo/prove-with-sismo)

zkConnect is independent of the Sismo Hub but ZK Badges are creating on the Sismo Hub, through the [Factory](https://factory.sismo.io/). Here is a tutorial to build your own ZK Badge from the factory in 5 minutes: https://docs.sismo.io/sismo-docs/tutorials/create-your-zk-badge-in-5-minutes-factory

<br/>

The Sismo Hub is powered by an off-chain infrastructure which:

- Creates & Manage [Data Groups](https://docs.sismo.io/sismo-docs/sismo-protocol/groups): A Data Group bundles Source of Data that share some reputational or historical characteristics, anyone can build a new Data Group through the Sismo Hub. The infrastructure periodically generates off-chain Data Groups that aim to be reusable and sent on-chain for attesters like the [HydraS1AccountboundAttester](https://github.com/sismo-core/sismo-protocol/blob/main/contracts/attesters/hydra-s1/HydraS1AccountboundAttester.sol).
- Creates [ZK Badges](https://docs.sismo.io/sismo-docs/sismo-protocol/badges) from a Data Group: The infrastructure will send the Data Groups on-chain to the right attester so your generated Data Group becomes the eligible Data Group for a specific badge.
- Manages ZK Badges metadata

# Architecture

Here are the 2 main folders you will use when you want to contribute to the Sismo Hub:

- [`group-generators/generators/`](https://github.com/sismo-core/sismo-hub/tree/main/group-generators/generators) : it contains all the Data Group Generators used generate Data Groups
- [`group-generators/helpers/dataproviders/`](https://github.com/sismo-core/sismo-data-sources/tree/main/group-generators/helpers/data-providers) : it contains all the providers like Subgraph, Snapshot or Lens which are used in Group Generators to fetch data in order to create Data Groups.

And here are the other folders more related to ZK Badges:

- [`badges-metadata/`](https://github.com/sismo-core/sismo-hub/tree/main/badges-metadata) : it contains the metadatas of each ZK Badges
- [`flows/`](https://github.com/sismo-core/sismo-hub/tree/main/flows) : a flow is all the data associated with the minting experience of a badge
- [`static/`](https://github.com/sismo-core/sismo-hub/tree/main/static) : it contains mainly all te images use in the Sismo Hub such as ZK Badge SVG or Data Provider logos

# Usage

## Installation

```bash
yarn
```

## Generate a Data Group in local

```bash
yarn generate-group <name-of-the-data-group>

# if you want to add additional data sources to your data group
yarn generate-group local-group --additional-data 0x123...def
```

## Start API in local

```bash
yarn api:watch
```

> You can go to http://127.0.0.1:8000/static/rapidoc/index.html to see the main endpoints of the Sismo Hub API

## Setup Data Providers API Keys

Some Data Providers requires API Key in order to be used, here is how to setup:

```bash
# you are in sismo-hub root
cp .example.env .en
```

Add your own API key by adding a new line to this file or fill an already existing Data Provider with an API key:

```bash
# in the .env file
export YOUR_DATA_PROVIDER_API_KEY="<API_KEY>"
```

Export the API key:

```bash
source .env
```

# Contribute

Interested in contributing? Check out our [CONTRIBUTING](./CONTRIBUTING.md) guide for a comprehensive guide on how to get started.

# Requests

If you have a need for additional Data Providers in your Group Generators, please feel free to open an issue. We also encourage you to share your idea on [Discord](https://discord.gg/sismo) for further discussion. A submission template is available on [CONTRIBUTING](./CONTRIBUTING.md).

# License

Distributed under the MIT License.

# Contact

Prefer [Discord](https://discord.gg/sismo) or [Twitter](https://twitter.com/sismo_eth)

<br/>

<img src="https://static.sismo.io/readme/bottom-main.png" alt="bottom" width="100%" >
