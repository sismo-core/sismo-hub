<br />
<div align="center">
  <img src="https://static.sismo.io/readme/top-main.png" alt="Logo" width="100" height="100" style="borderRadius: 20px">

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

The Sismo Hub is the epicenter of the Sismo protocol. It is the place where one wants to contribute to the Sismo protocol and help leveraging on-chain reputation and privacy preserving services. The Sismo Hub offers an off-chain infrastructure which allows to periodically generate off-chain Groups that aim to be reusable and sent on-chain for attesters like the [HydraS1SimpleAttester](https://github.com/sismo-core/sismo-protocol/blob/main/contracts/attesters/hydra-s1/HydraS1SimpleAttester.sol). A Group of accounts bundles accounts that share some reputational or historical characteristics. Anyone can propose a new group to Sismo.

The Sismo Hub aims at offering to developers a coding experience in a local environment that is as closed as possible to a testing and production environment. This aims at reducing the friction between learning in a safe local environment and deploying a working product for your users.

The repository is organized in five main folders:

- `group-generators/` : it contains all the Group Generators used to quickly generate specific groups with well-known providers like Subgraph, Snapshot or Lens. The providers used by Group Generators can be found [here](https://github.com/sismo-core/sismo-data-sources/tree/main/group-generators/helpers/providers). 

- `attestation-collections/` : it contains all the logic for computing the Groups previously generated in order to send on the blockchain the merkle root of those groups. By doing this, you create attestations collections and you prepare the on-chain data that attesters need to verify that an address belongs to a Group thanks to a proof. 

- `flows/` : A flow is all the data associated with the minting experience of a badge like the frontend path, the blockchain network (local, testnet, polygon), the attester used, the badge etc. You can see the production flows here: [https://github.com/sismo-core/sismo-data-sources/blob/main/flows/prod-flows.ts]

- `src/` : 




- Feel free to open a PR
- Join us on [discord](https://discord.gg/sismo)

**Generate a group in local**

```sh
yarn generate-group sismo-contributors
```

**Compute attester in local**

```sh
yarn compute-attester hydra-s1-local
```

**Start API**

```sh
yarn api
```

## License

Distributed under the MIT License.

## Contribute

Please, feel free to open issues, PRs or simply provide feedback!

## Contact

Prefer [Discord](https://discord.gg/sismo) or [Twitter](https://twitter.com/sismo_eth)

<br/>
<img src="https://static.sismo.io/readme/bottom-main.png" alt="bottom" width="100%" >
