<br />
<div align="center">
  <img src="https://static.sismo.io/readme/top-main.png" alt="Logo" width="100" height="100" style="borderRadius: 20px">

  <h3 align="center">
    Sismo Hub
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

The Sismo Hub is the repository for integrations on Sismo:

- Create your Badge (define the group of eligible accounts, define Badge metadata and picture)
- Create your integration flows directly in Sismo app (define the minting process in sismo app)

This repository offers a local environment of the entire Sismo stack so you can test your integration before opening a PR:

- Sismo app on local
- Sismo Badge metadata local server
- Protocol deployed on local chain

Once you have tested your integration on local, you can open a PR to add your badge to the rinkeby, sandbox or live environment!

A [tutorial](https://docs.sismo.io/sismo-docs/tutorials/create-your-zk-badge-in-15-minutes) is available on how to use this repo to create your ZK Badge.

The Sismo Hub is powered by an off-chain infrastructure which:

- Manages Badges metadata
- Manages Groups: The infrastructure periodically generates off-chain Groups that aim to be reusable and sent on-chain for attesters like the [HydraS1SimpleAttester](https://github.com/sismo-core/sismo-protocol/blob/main/contracts/attesters/hydra-s1/HydraS1SimpleAttester.sol). A Group of accounts bundles accounts that share some reputational or historical characteristics. Anyone can propose a new group to Sismo.
- Creates Badges from a Group: The infrastructure will send the groups on-chain to the right attester so your generated group becomes the eligible group for a specific badge.

The Sismo Hub aims at offering to developers a coding experience in a local environment that is as closed as possible to a testing and production environment. This aims at reducing the friction between learning in a safe local environment and deploying a working product for your users.

# Architecture

Here is the three folders you want to look at for contributing:

- `group-generators/` : it contains all the Group Generators used to quickly generate specific groups with well-known providers like Subgraph, Snapshot or Lens. The providers used by Group Generators can be found [here](https://github.com/sismo-core/sismo-data-sources/tree/main/group-generators/helpers/providers).

- `attestation-collections/` : it contains all the logic for computing the Groups previously generated in order to send on the blockchain the merkle root of those groups. By doing this, you make your groups available to attesters. Your users are now able to mint a badge and receive an attestation.

- `flows/` : A flow is all the data associated with the minting experience of a badge, it contains the frontend path, the blockchain network (local, testnet, polygon), the attester used, the badge used etc. You can see the production flows [here](https://github.com/sismo-core/sismo-data-sources/blob/main/flows/prod-flows.ts).

You can learn how to create a ZK badge in 15 minutes with this [tutorial](https://docs.sismo.io/sismo-docs/tutorials/create-your-zk-badge-in-15-minutes). After this tutorial, you will be able to submit a PR in order to see your customized minting flow lived on [sandbox.sismo.io](https://sandbox.sismo.io/).

# Usage

## Installation

```bash
yarn
```

## Start a local infra

```bash
docker compose up
```

## Generate a group in local

```bash
yarn generate-group local-group
```

> Add your address to the group

```bash
yarn generate-group local-group --additional-data 0x123...def
```

## Compute attester in local

```bash
yarn compute-attester hydra-s1-local
```

## Start API in local

```bash
yarn api:watch
```

Mint on your local frontend : [http://localhost:3000/](http://localhost:3000/)

## License

Distributed under the MIT License.

## Contribute

Please, feel free to open issues, PRs or simply provide feedback!

## Contact

Prefer [Discord](https://discord.gg/sismo) or [Twitter](https://twitter.com/sismo_eth)

<br/>
<img src="https://static.sismo.io/readme/bottom-main.png" alt="bottom" width="100%" >
