import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["zk-developer-contributor"],
  
  generate: async (
    context: GenerationContext, 
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    const githubProvider = new dataProviders.GithubProvider();
  
    const githubProviderData0 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "lambdaclass/cairo-rs",
          "lambdaclass/lambdaworks",
          "lambdaclass/aleo_lambda_blockchain",
          "lambdaclass/starknet_in_rust",
          "lambdaclass/kakarot",
        ],
      });

    const githubProviderData1 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "sismo-core/sismo-hub",
          "sismo-core/sismo-protocol",
          "sismo-core/hydra-s1-zkps",
          "sismo-core/sismo-utils",
          "sismo-core/sismo-commitment-signer",
          "sismo-core/sismo-commitment-mapper",
        ],
      });

    const githubProviderData2 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "starkware-libs/cairo",
          "starkware-libs/papyrus",
          "starkware-libs/blockifier",
          "starkware-libs/cairo-playground",
          "starkware-libs/cairo-lang",
          "starkware-libs/starkex-contracts",
          "starknet-id/contract",
          "starknet-id/starknet.id",
          "starknet-id/app.starknet.id",
          "starknet-id/naming_contract",
        ],
      });

    const githubProviderData3 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "matter-labs/compiler-llvm-builder",
          "matter-labs/franklin-crypto",
          "matter-labs/zksync-wallet-vue",
          "matter-labs/zksync-web-v2-docs",
          "matter-labs/zksync",
          "matter-labs/awesome-zero-knowledge-proofs",
          "matter-labs/bellman",
        ],
      });

    const githubProviderData4 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "iron-fish/ironfish",
          "iron-fish/ironfish-api",
          "iron-fish/website-testnet",
          "iron-fish/block-explorer",
          "iron-fish/website",
        ],
      });

    const githubProviderData5 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "AleoHQ/snarkVM",
          "AleoHQ/aleo",
          "AleoHQ/snarkOS",
          "AleoHQ/leo",
          "AleoHQ/welcome",
          "AleoHQ/aleo-setup",
          "AleoHQ/workshop",
        ],
      });

    const githubProviderData6 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "taikoxyz/hive",
          "taikoxyz/taiko-mono",
          "taikoxyz/taiko-client",
          "taikoxyz/zkevm-circuits",
          "taikoxyz/simple-taiko-node",
        ],
      });

    const githubProviderData7 =
      await githubProvider.getRepositoriesContributors({
        repositories: ["taikoxyz/taiko-geth"],
      });

    const githubProviderData8 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "scroll-tech/zkevm-specs",
          "scroll-tech/go-ethereum",
          "scroll-tech/zkevm-circuits",
          "scroll-tech/mpt-circuit",
        ],
      });

    const githubProviderData9 =
      await githubProvider.getRepositoriesContributors({
        repositories: ["scroll-tech/uniswap-v3-interface"],
      });

    const githubProviderData10 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "EspressoSystems/HotShot",
          "EspressoSystems/cape",
          "EspressoSystems/nix-docker",
          "EspressoSystems/espresso",
          "EspressoSystems/jellyfish",
          "EspressoSystems/hyperplonk",
          "EspressoSystems/veri-zexe",
          "EspressoSystems/seahorse",
        ],
      });

    const githubProviderData11 =
      await githubProvider.getRepositoriesContributors({
        repositories: ["EspressoSystems/cap"],
      });

    const githubProviderData12 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "AztecProtocol/barretenberg",
          "AztecProtocol/docs",
          "AztecProtocol/azteccli",
          "AztecProtocol/aztec-connect-bridges",
          "AztecProtocol/AZTEC",
          "AztecProtocol/huff",
          "AztecProtocol/aztec-2.0",
          "AztecProtocol/weierstrudel",
          "AztecProtocol/aztec-connect",
        ],
      });

    const githubProviderData13 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "0xPolygonHermez/zkevm-node",
          "0xPolygonHermez/zkevm-bridge-service",
          "0xPolygonHermez/zkevm-prover",
          "0xPolygonHermez/zkevm-contracts",
          "0xPolygonHermez/zkevm-rom",
          "0xPolygonHermez/zkevm-doc",
          "0xPolygonHermez/zkevm-proverjs",
        ],
      });

    const githubProviderData14 =
      await githubProvider.getRepositoriesContributors({
        repositories: ["MinaProtocol/mina", "MinaProtocol/load-generator"],
      });

    const githubProviderData15 =
      await githubProvider.getRepositoriesContributors({
        repositories: ["2140sat/zk-badge-eligible"],
      });

    const githubProviderData16 =
      await githubProvider.getRepositoriesContributors({
        repositories: ["dhruvkelawala/web3-starknet-react"],
      });

    const githubProviderData17 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "jediswaplabs/jediswap-interface",
          "jediswaplabs/JediSwap",
        ],
      });

    const githubProviderData18 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "anoma/juvix",
          "anoma/anoma",
          "anoma/namada",
          "anoma/namada-trusted-setup",
          "anoma/zkp-compiler-shootout",
          "anoma/vamp-ir",
          "anoma/ferveo",
          "anoma/masp",
          "anoma/namada-testnets",
          "anoma/taiga",
        ],
      });

    const githubProviderData19 =
      await githubProvider.getRepositoriesContributors({
        repositories: ["anoma/specs", "anoma/anoma-alpha"],
      });

    const githubProviderData20 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "myBraavos/faucet",
          "myBraavos/starknet-url",
          "myBraavos/starknet.cc",
          "myBraavos/starknet-deeplink",
        ],
      });

    const githubProviderData21 =
      await githubProvider.getRepositoriesContributors({
        repositories: ["zkLend/paris-hackathon-2022"],
      });

    const githubProviderData22 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "zkxteam/Autumn-StarkNet-Hackathon",
          "zkxteam/interviews-public",
        ],
      });

    const githubProviderData23 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "nymtech/nym",
          "nymtech/sphinx",
          "nymtech/nym-mixnet",
          "nymtech/docs",
          "nymtech/nyxd",
          "nymtech/developer-tutorials",
          "nymtech/bdjuno",
        ],
      });

    const githubProviderData24 =
      await githubProvider.getRepositoriesContributors({
        repositories: ["mintsquare/simple-erc721-transfer-ui"],
      });

    const githubProviderData25 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "InternetMaximalism/intmax-zkp-core",
          "InternetMaximalism/plonky2",
          "InternetMaximalism/intmax-rollup-cli",
          "InternetMaximalism/intmax-rollup-interface",
        ],
      });

    const githubProviderData26 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "syncswap/weth",
          "syncswap/testnet-contracts",
          "syncswap/core",
        ],
      });

    const githubProviderData27 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "reddio-com/reddio-sdk",
          "reddio-com/NFT-Marketplace",
          "reddio-com/red-py-sdk",
          "reddio-com/red-js-sdk",
        ],
      });

    const githubProviderData28 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "argentlabs/userpage",
          "argentlabs/dappland",
          "argentlabs/argent-x",
          "argentlabs/argent-contracts-starknet",
          "argentlabs/argent-contracts",
          "argentlabs/web3.swift",
          "argentlabs/starknet-plugin-account",
          "argentlabs/argent-trustlists",
          "argentlabs/argent-js",
          "argentlabs/application",
        ],
      });

    const githubProviderData29 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "Starkswap/sdk-core",
          "Starkswap/cairo-erc20-faucet",
          "Starkswap/starkswap-public",
          "Starkswap/starkswap-docs",
        ],
      });

    const githubProviderData30 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "Astraly-Labs/Empiric",
          "Astraly-Labs/astraly-contracts",
          "Astraly-Labs/astraly-explorer",
        ],
      });

    const githubProviderData31 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "ZigZagExchange/lightning-dex",
          "ZigZagExchange/backend",
          "ZigZagExchange/frontend",
          "ZigZagExchange/market-maker",
          "ZigZagExchange/landing-site",
          "ZigZagExchange/market-maker-v3",
          "ZigZagExchange/mammoth_UI",
          "ZigZagExchange/hummingbot",
        ],
      });

    const githubProviderData32 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "ZigZagExchange/zigzag-v3",
          "ZigZagExchange/token",
          "ZigZagExchange/zznft",
          "ZigZagExchange/starknet-oracle",
          "ZigZagExchange/starknet-contracts",
        ],
      });

    const githubProviderData33 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "l2labs/nuxt3-example",
          "l2labs/zkswap-security-audit-certification",
          "l2labs/zkswap-tokens",
          "l2labs/zkswap-spec",
          "l2labs/zkswap-contracts",
          "l2labs/zkspace-whitepaper",
        ],
      });

    const githubProviderData34 =
      await githubProvider.getRepositoriesContributors({
        repositories: ["Manta-Network/manta-signer"],
      });
    
    const zkDeveloperContributorGroupLatest = await groupStore.latest(
      "zk-developer-contributor"
    );
    
    const zkDeveloperContributorData0 = dataOperators.Map(
      await zkDeveloperContributorGroupLatest.data(),
      1
    );
    
    const githubProviderData35 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "succinctlabs/eth-proof-of-consensus",
          "succinctlabs/tokenbridge-contracts",
          "succinctlabs/telepathy-contracts",
          "succinctlabs/optimism-libraries",
          "succinctlabs/omnibridge-ui",
          "succinctlabs/v3-core",
        ],
      });

    const githubProviderData36 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "axiom-crypto/halo2-lib",
          "axiom-crypto/axiom-eth",
          "axiom-crypto/halo2",
          "axiom-crypto/halo2-scaffold",
          "axiom-crypto/snark-verifier",
        ],
      });

    const githubProviderData37 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "risc0/risc0",
          "risc0/risc0-rust-starter",
          "risc0/risc0-rust-examples",
          "risc0/battleship-example",
          "risc0/website",
          "risc0/rules_rust",
          "risc0/zk-benchmarking",
        ],
      });

    const githubProviderData38 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "delendum-xyz/zk-benchmarking",
          "delendum-xyz/starkvm-compiler",
          "delendum-xyz/delendum.xyz",
          "delendum-xyz/zk-knowledge",
          "delendum-xyz/zk-dev-needs",
          "delendum-xyz/zk-academic",
        ],
      });

    const githubProviderData39 =
      await githubProvider.getRepositoriesContributors({
        repositories: ["mmaller/vdf_snark"],
      });

    const githubProviderData40 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "zkopru-network/zkopru",
          "zkopru-network/private-exchange",
          "zkopru-network/blind-find",
          "zkopru-network/wallet",
          "zkopru-network/merchant-payment-service",
          "zkopru-network/protocol-specification",
          "zkopru-network/status",
        ],
      });

    const githubProviderData41 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "0xPolygonMiden/miden-vm",
          "0xPolygonMiden/air-script",
          "0xPolygonMiden/crypto",
          "0xPolygonMiden/miden-base",
        ],
      });

    const githubProviderData42 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "aleph-zero-foundation/AlephBFT",
          "aleph-zero-foundation/aleph-node",
          "aleph-zero-foundation/Proof-of-Concept",
          "aleph-zero-foundation/consensus-go",
          "aleph-zero-foundation/core-go",
          "aleph-zero-foundation/threshold-ecdsa",
        ],
      });

    const githubProviderData43 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "darkforest-eth/eth",
          "darkforest-eth/darkforest-v0.3",
          "darkforest-eth/client",
          "darkforest-eth/plugins",
          "darkforest-eth/circuits",
          "darkforest-eth/developer-guides",
          "darkforest-eth/darkforest-v0.6",
        ],
      });

    const githubProviderData44 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "HorizenOfficial/ginger-lib",
          "HorizenOfficial/zendoo-sc-cryptolib",
        ],
      });

    const githubProviderData45 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "arkworks-rs/curves",
          "arkworks-rs/poly-commit",
          "arkworks-rs/algebra",
          "arkworks-rs/groth16",
          "arkworks-rs/crypto-primitives",
          "arkworks-rs/sumcheck",
          "arkworks-rs/r1cs-std",
          "arkworks-rs/ripp",
          "arkworks-rs/gm17",
        ],
      });

    const githubProviderData46 =
      await githubProvider.getRepositoriesContributors({
        repositories: ["arkworks-rs/snark"],
      });
    
    const githubProviderData47 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "ZeroSync/ZeroSync",
          "ZeroSync/giza",
          "ZeroSync/ZeroSync_wasm",
          "ZeroSync/winterfell",
          "ZeroSync/air-script",
          "ZeroSync/ZeroSync_design",
        ],
      });
    
    const githubProviderData48 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "personaelabs/efficient-zk-ecdsa",
          "personaelabs/spartan-ecdsa",
          "personaelabs/heyanon-v1",
          "personaelabs/heyanon-circuits",
          "personaelabs/heyanoun",
          "personaelabs/efficient-zk-ecdsa-wasm",
          "personaelabs/halo2-secp",
          "personaelabs/zk-email-verify",
          "personaelabs/data",
          "personaelabs/personaelabs.github.io",
        ],
      });
    
    const jsonListData49 = {
      "sismo.eth": "1",
      "dhadrien.sismo.eth": "1",
      "samsb.sismo.eth": "1",
      "ben.anoufa.eth": "1",
      "leo21.eth": "1",
      "CharlsCharls.sismo.eth": "1",
      "nezzar.eth": "1",
      "timbeiko.eth": "1",
      "karalabe.eth": "1",
      "baylina.eth": "1",
      "kaereste.eth": "1",
      "dcbuilder.eth": "1",
      "lisa.eth": "1",
      "CPerezz.eth": "1",
      "jonwu.eth": "1",
      "sachin.eth": "1",
      "jaosef.eth": "1",
      "shlomtz.eth": "1",
      "kobi.eth": "1",
      "wielkie.eth": "1",
      "crites.eth": "1",
      "janbenes.eth": "1",
      "sithswap.eth": "1",
      "sidius.eth": "1",
      "brunny.eth": "1",
      "vitalik.eth": "1",
      "weijie.eth": "1",
      "github:mmaller": "1",
      "github:Rumata888": "1",
      "twitter:Ziking__": "1",
      "twitter:big_q__": "1",
      "twitter:gabin7245": "1",
      "twitter:zkdrop_io": "1",
      "twitter:f9s216": "1",
      "twitter:samsbenj": "1",
      "twitter:dimahledba": "1",
      "twitter:samnode_": "1",
      "twitter:sylvechv": "1",
      "twitter:raphael_dkhn": "1",
      "twitter:0xmonkeyy": "1",
      "twitter:0x_stoun": "1",
      "twitter:ivpavici": "1",
      "twitter:xJonathanLEI": "1",
      "twitter:0xwlGravity": "1",
      "twitter:EdwardCWilson": "1",
      "twitter:VitalikButerin": "1",
      "twitter:leoyoung0": "1",
      "twitter:ethereumJoseph": "1",
      "twitter:henrlihenrli": "1",
      "twitter:EliBenSasson": "1",
      "twitter:bbrandtom": "1",
      "twitter:gluk64": "1",
      "twitter:ukolodny": "1",
      "twitter:PiotrSzlachciak": "1",
      "twitter:krzKaczor": "1",
      "twitter:bkiepuszewski": "1",
      "twitter:tomwaltonpocock": "1",
      "twitter:starknetcc": "1",
      "twitter:Maz_eth": "1",
      "twitter:OutSmth": "1",
      "twitter:DucksEverywher2": "1",
      "twitter:wraitii": "1",
      "twitter:dlubarov": "1",
      "twitter:__zkhack__": "1",
      "twitter:ZKValidator": "1",
      "twitter:will_harborne": "1",
      "twitter:hanhnguyennn": "1",
      "twitter:zeroknowledgefm": "1",
      "twitter:_bfarmer": "1",
      "twitter:AnnaRRose": "1",
      "twitter:tarunchitra": "1",
      "twitter:0xSage": "1",
      "twitter:cryptodavidw": "1",
      "twitter:zkproofs": "1",
      "twitter:Zac_Aztec": "1",
      "twitter:benediktbuenz": "1",
      "twitter:1HowardWu": "1",
      "twitter:DCbuild3r": "1",
      "twitter:hudsonjameson": "1",
      "twitter:jbaylina": "1",
      "twitter:lisacuesta": "1",
      "twitter:lopeetall": "1",
      "twitter:CPerezz19": "1",
      "twitter:SinaKian1": "1",
      "twitter:rel_zeta_tech": "1",
      "twitter:toghrulmaharram": "1",
      "twitter:adr1anh": "1",
      "twitter:awasunyin": "1",
      "twitter:jackservia": "1",
      "twitter:arantxazapico": "1",
      "twitter:TanyaKarsou": "1",
      "twitter:pseudotheos": "1",
      "twitter:Agni_deneve": "1",
      "twitter:OmerShlomovits": "1",
      "twitter:pranaymohan": "1",
      "twitter:jillrgunter": "1",
      "twitter:YourBuddyConner": "1",
      "twitter:apruden08": "1",
      "twitter:TarunsIntern": "1",
      "twitter:SuccinctJT": "1",
      "twitter:jeremyfelder": "1",
      "twitter:BigSky_7": "1",
      "twitter:HaymanLiron": "1",
      "twitter:Blulinski": "1",
      "twitter:YtzBeno": "1",
      "twitter:critesjosh_": "1",
      "twitter:janbenes16": "1",
      "twitter:BagadSuyash": "1",
      "twitter:0xA57EC": "1",
      "twitter:HerskindLasse": "1",
      "twitter:Ingo_zk": "1",
      "twitter:jdkanani": "1",
      "twitter:anuragarjun": "1",
      "twitter:MihailoBjelic": "1",
      "twitter:sandeepnailwal": "1",
      "twitter:sourcex44": "1",
      "twitter:anthonykrose": "1",
      "twitter:lakshmansankar": "1",
      "twitter:0xEZx0": "1",
      "twitter:iambillsta": "1",
      "twitter:federicocarrone": "1",
      "twitter:semenov_roman_": "1",
      "twitter:kobigurk": "1",
      "twitter:CarlBeek": "1",
      "twitter:trent_vanepps": "1",
      "twitter:guilleangeris": "1",
      "twitter:acityinohio": "1",
      "twitter:kostascrypto": "1",
      "twitter:danboneh": "1",
      "twitter:pumatheuma": "1",
      "twitter:matthew_d_green": "1",
      "twitter:khovr": "1",
      "twitter:florian_tramer": "1",
      "twitter:M_Mosier_": "1",
      "twitter:feministPLT": "1",
      "twitter:shumochu": "1",
      // "twitter:JensGroth3": "1", does not resolve from twitter API
      "twitter:rahulmaganti_": "1",
      "twitter:jniset": "1",
      "twitter:cryptobuilder_": "1",
      "twitter:wanseoblim": "1",
      "twitter:grjte": "1",
      "twitter:williamborgeaud": "1",
      "twitter:joeintheory": "1",
      // "twitter:joshbfitzgerald": "1", does not resolve from twitter API
      "twitter:EDGDrummond": "1",
      "twitter:susevans": "1",
      "twitter:bobbinth": "1",
      "twitter:matthewniemerg": "1",
      "twitter:davidsrz": "1",
      "twitter:sanaz2016": "1",
      "twitter:oskarth": "1",
      "twitter:weijie_eth": "1",
      "twitter:trpocock": "1",
      "twitter:bgu33": "1",
      "twitter:AntonioMJuliano": "1",
      "twitter:rphmeier": "1",
      "twitter:blperez_": "1",
      "twitter:drakefjustin": "1",
      "twitter:evanashapiro": "1",
      "twitter:xlusuri": "1",
      "twitter:CeweCewesunda72: "1",
      "twitter:Junhoh94: "1",
      "twitter:mazay1985: "1",
      "twitter:iForZe1: "1",
      "twitter:principalcryp: "1",
      "twitter:awakex3: "1",
      "twitter:lolon4ik: "1",
      "twitter:MVEll37: "1",
      "twitter:multyafka: "1",
      "twitter:Farmer_L3: "1",
      "twitter:0_MentisRD_0: "1",
      "twitter:DimaPop42737685: "1",
      "twitter:stylishfreak2: "1",
      "twitter:arslanovsaid: "1",
      "twitter:chelios__d: "1",
      "twitter:alexsokolov88: "1",
      "twitter:_str1cken_: "1",
      "twitter:klssora: "1",
      "twitter:elyqq_web: "1",
      "twitter:wifimosquito: "1",
      "twitter:Neophyte54: "1",
      "twitter:HladunVlad: "1",
      "twitter:cryptomiiiku: "1",
      "twitter:Artem74911470: "1",
      "twitter:Kxxx124: "1",
      "twitter:0xArtorias: "1",
      "twitter:turantuu: "1",
      "twitter:hashflowlover: "1",
      "twitter:AndreyChumack: "1",
      "twitter:RossinanteXD: "1",
      "twitter:FinikWorld: "1",
      "twitter:RudeWav: "1",
      "twitter:sadnesswne334: "1",
      "twitter:toteschefrukt: "1",
      "twitter:darkgoyard: "1",
      "twitter:xeojan: "1",
      "twitter:blackfallen8: "1",
      "twitter:ImbalancerG: "1",
      "twitter:Solomon777C: "1",
      "twitter:PavlovskiyDavid: "1",
      "twitter:KavkazskiyYumor: "1",
      "twitter:millere_helenu: "1",
      "twitter:ajap7171gmail: "1",
      "twitter:dhanneangelene: "1",
      "twitter:_Dd0s_: "1",
      "twitter:ermaputri6: "1",
      "twitter:edeib1991: "1",
      "twitter:dtalgsae2: "1",
      "twitter:DDjumba: "1",
      "twitter:4SRLysTe6KpMjub: "1",
      "twitter:DaviniFrank: "1",
      "twitter:denis_skripnik: "1",
      "twitter:BundemShake: "1",
      "twitter:pluxoryT: "1",
      "twitter:snookipollizi: "1",
      "twitter:DTebias: "1",
      "twitter:DianeAllegro6: "1",
      "twitter:edicoace: "1",
      "twitter:OlegButko1991: "1",
      "twitter:zaxarqa: "1",
    };

    const dataUnion = dataOperators.Union([
      githubProviderData0,
      githubProviderData1,
      githubProviderData2,
      githubProviderData3,
      githubProviderData4,
      githubProviderData5,
      githubProviderData6,
      githubProviderData7,
      githubProviderData8,
      githubProviderData9,
      githubProviderData10,
      githubProviderData11,
      githubProviderData12,
      githubProviderData13,
      githubProviderData14,
      githubProviderData15,
      githubProviderData16,
      githubProviderData17,
      githubProviderData18,
      githubProviderData19,
      githubProviderData20,
      githubProviderData21,
      githubProviderData22,
      githubProviderData23,
      githubProviderData24,
      githubProviderData25,
      githubProviderData26,
      githubProviderData27,
      githubProviderData28,
      githubProviderData29,
      githubProviderData30,
      githubProviderData31,
      githubProviderData32,
      githubProviderData33,
      githubProviderData34,
      githubProviderData35,
      githubProviderData36,
      githubProviderData37,
      githubProviderData38,
      githubProviderData39,
      githubProviderData40,
      githubProviderData41,
      githubProviderData42,
      githubProviderData43,
      githubProviderData44,
      githubProviderData45,
      githubProviderData46,
      githubProviderData47,
      githubProviderData48,
      jsonListData49,
    ]);
    
    return [
      {
        name: "crypton-contributor",
        timestamp: context.timestamp,
        data: zkDeveloperContributorData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
