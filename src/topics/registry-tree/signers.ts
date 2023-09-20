import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "@openzeppelin/defender-relay-client/lib/ethers";
import { ethers, Signer } from "ethers";
import { Network } from "./networks";
import { getProvider } from "./providers";

export enum SignerFunction {
  Local = "local",
  Sismo = "sismo",
  Relayed = "relayed",
}

export const networkSigners: { [network in Network]?: SignerFunction } = {
  [Network.Local]: SignerFunction.Local,
  [Network.Goerli]: SignerFunction.Relayed,
  [Network.Sepolia]: SignerFunction.Relayed,
  [Network.Mainnet]: SignerFunction.Relayed,
  [Network.Gnosis]: SignerFunction.Relayed,
  [Network.Polygon]: SignerFunction.Relayed,
  [Network.Mumbai]: SignerFunction.Relayed,
  [Network.Optimism]: SignerFunction.Relayed,
  [Network.OptimismGoerli]: SignerFunction.Relayed,
  [Network.ArbitrumOne]: SignerFunction.Sismo,
  [Network.ArbitrumGoerli]: SignerFunction.Sismo,
  [Network.ScrollTestnet]: SignerFunction.Sismo,
  [Network.Base]: SignerFunction.Sismo,
  [Network.BaseGoerli]: SignerFunction.Sismo,
};

export const getSigner = (network: Network): Signer => {
  switch (networkSigners[network]) {
    case SignerFunction.Local:
      return getLocalSigner();
    case SignerFunction.Relayed:
      return getDefenderRelayerSigner(network);
    case SignerFunction.Sismo:
      return getWalletSigner(network);
    default:
      throw new Error(`Signer not available for ${network}.`);
  }
};

const getWalletSigner = (network: Network): Signer => {
  const MNEMONIC = process.env.ROOTS_REGISTRY_OWNER_MNEMONIC;
  if (!MNEMONIC) {
    throw new Error("ROOTS_REGISTRY_OWNER_MNEMONIC env variable is missing.");
  }
  const provider = getProvider(network);
  const wallet = ethers.Wallet.fromMnemonic(MNEMONIC);
  return wallet.connect(provider);
};

const getDefenderRelayerSigner = (network: Network): Signer => {
  const SH_RELAY_DEFENDER_API_KEYS = process.env.SH_RELAY_DEFENDER_API_KEYS;
  if (!SH_RELAY_DEFENDER_API_KEYS) {
    throw new Error(
      "SH_RELAY_DEFENDER_API_KEY or SH_RELAY_DEFENDER_API_SECRET env variables missing."
    );
  }
  const shRelayDefenderApiKeysJson = JSON.parse(SH_RELAY_DEFENDER_API_KEYS);
  const SH_RELAY_DEFENDER_API_KEY = shRelayDefenderApiKeysJson[`${network}`].key;
  const SH_RELAY_DEFENDER_API_SECRET = shRelayDefenderApiKeysJson[`${network}`].secret;
  const credentials = {
    apiKey: SH_RELAY_DEFENDER_API_KEY,
    apiSecret: SH_RELAY_DEFENDER_API_SECRET,
  };
  return new DefenderRelaySigner(credentials, new DefenderRelayProvider(credentials), {
    speed: "fast",
  });
};

const getLocalSigner = (): Signer => {
  return new ethers.providers.JsonRpcProvider("http://localhost:8545").getSigner(
    // address owner local
    "0xb01ee322C4f028B8A6BFcD2a5d48107dc5bC99EC"
  );
};
