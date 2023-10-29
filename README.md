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
    <a href="https://twitter.com/sismo_eth" target="_blank">
        <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=x&logoColor=white"/>
    </a>
    <a href="https://discord.gg/sismo" target="_blank">
        <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"/>
    </a>
    <a href="https://builders.sismo.io" target="_blank">
        <img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white"/>
    </a>
  </p>
</div>
<br/>

# What is Sismo?

Sismo leverages zero-knowledge proofs (ZKPs) and privacy-preserving technologies to enable users to aggregate and selectively disclose personal data to applications.

check out the docs [here](https://docs.sismo.io/sismo-docs/).

# Sismo Hub

The Sismo Hub is the repository for integrations on Sismo, where you can create:

- [Group Generator](https://docs.sismo.io/sismo-docs/sismo-protocol/groups): Group generators are a reusable tool used by Sismo to generate [Groups](https://docs.sismo.io/sismo-docs/sismo-protocol/groups). Groups are stored in Merkle trees and the root is sent on-chain. The root enables one to prove a Group membership and thus claim a ZK Badge or use a Sismo Connect app.
  - Here is a tutorial that shows you how to create your Group: https://docs.sismo.io/sismo-docs/tutorials/sismo-hub/create-your-group

<br/>

- [Data Provider](https://docs.sismo.io/sismo-docs/technical-documentation/sismo-hub/group-generators): Data Providers enable to fetch specific data in order to make Groups.
  - Here is a tutorial that shows you how to create your Data Provider: https://docs.sismo.io/sismo-docs/tutorials/sismo-hub/create-your-data-provider

If you want to contribute to Sismo Hub, check out the Contributing Guide [here](https://github.com/sismo-core/sismo-hub/blob/main/CONTRIBUTING.md).

<br/>

On top of Groups, you can create:

- [ZK Badges](https://docs.sismo.io/sismo-docs/sismo-protocol/badges)
- [Sismo Connect apps](https://docs.sismo.io/sismo-docs/readme/sismo-connect)

While the apps are independent of the Sismo Hub, the ZK Badges are built on it, through the [Factory](https://factory.sismo.io/). Here is a tutorial to build your own ZK Badge from the factory in 5 minutes: https://docs.sismo.io/sismo-docs/tutorials/create-your-zk-badge-in-5-minutes-factory

That's why you can still also create a ZK Badge, edit its metadata, or add a custom flow directly through the Sismo Hub.

<br/>

The Sismo Hub is powered by an off-chain infrastructure that:

- Creates & Manage [Groups](https://docs.sismo.io/sismo-docs/sismo-protocol/groups): A Group bundles Source of Data that share some reputational or historical characteristics, anyone can build a new Group through the Sismo Hub. The infrastructure periodically generates off-chain Groups that aim to be reusable and sent on-chain for attesters like the [HydraS1AccountboundAttester](https://github.com/sismo-core/sismo-protocol/blob/main/contracts/attesters/hydra-s1/HydraS1AccountboundAttester.sol).
- Creates [ZK Badges](https://docs.sismo.io/sismo-docs/sismo-protocol/badges) from a Group: The infrastructure will send the Groups on-chain to the right attester so your generated Group becomes the eligible Group for a specific badge.
- Manages ZK Badges metadata

# Architecture

Here are the 2 main folders you will use when you want to contribute to the Sismo Hub:

- [`group-generators/generators/`](./group-generators/generators) : it contains all the Group Generators used to generate Groups
- [`group-generators/helpers/data-providers/`](./group-generators/helpers/data-providers) : it contains all the providers like Subgraph, Snapshot, or Lens which are used in Group Generators to fetch data in order to create Groups.

And here are the other folders more related to ZK Badges:

- [`badges-metadata/`](./badges-metadata) : it contains the metadata of each ZK Badges
- [`flows/`](./flows) : it contains all the customs flow of the ZK Badges. (i.e. is all the data associated with the minting experience of a ZK badge)
- [`static/`](./static) : it contains mainly all the images used in the Sismo Hub such as ZK Badge images or Data Provider logos

# Usage

## Installation

```bash
yarn
```

## Generate a Group in local

```bash
yarn generate-group <name-of-the-data-group>

# if you want to add additional data sources to your group
yarn generate-group local-group --additional-data 0x123...def
```

Make sure the data group exists. More details at [Sismo Hub](#sismo-hub) Group Generator.

## Setup the API in local

```bash
yarn api:watch
```

> You can go to http://localhost:8000/static/rapidoc/index.html to see the main endpoints of the Sismo Hub API

To access the Group data, go to: http://localhost:8000/file-store/group-snapshots-data/{groupId}/{timestamp}.json

To access the Group metadata, go to: http://localhost:8000/groups/{groupId}?timestamp={timestamp}

- **groupId**: id of a group you generated. It will be written on your terminal after the group generation.
- **timestamp**: timestamp of a group generation. You can find all the group generations timestamps by using this endpoint: http://localhost:8000/groups/{groupName}

## Setup Data Providers API Keys

Some Data Providers require an API Key in order to be used, here is how to setup:

```bash
# you are in sismo-hub root
cp .example.env .env
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

Send us a message in [Telegram](https://builders.sismo.io/) or [Discord](https://discord.gg/sismo)

<br/>

<img src="https://static.sismo.io/readme/bottom-main.png" alt="bottom" width="100%" >
