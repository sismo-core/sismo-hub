export interface Attestation {
  id: string;
  attester: string;
  recipient: string;
  revoked: boolean;
  decodedDataJson: string;
  data: string;
  key: string;
  time: number;
  timeCreated: number;
}

export interface GetAttestationResult {
  attestations: Attestation[];
}

export interface GetAttestationParams {
  network: string;
  schema: string;
  attester: string;
  key?: string;
  value?: string;
}

export enum SupportedNetwork {
  MAINNET = "mainnet",
  ARBITRUM = "arbitrum",
  SEPOLIA = "sepolia",
  OPTIMISM_GOERLI = "optimism-goerli",
  BASE_GOERLI = "base-goerli",
}

export const fromStringToSupportedNetwork = (network: string): SupportedNetwork => {
  switch (network) {
    case "mainnet":
    case "1":
      return SupportedNetwork.MAINNET;
    case "arbitrum":
    case "42161":
      return SupportedNetwork.ARBITRUM;
    case "sepolia":
    case "11155111":
      return SupportedNetwork.SEPOLIA;
    case "optimism-goerli":
    case "420":
      return SupportedNetwork.OPTIMISM_GOERLI;
    case "base-goerli":
    case "84531":
      return SupportedNetwork.BASE_GOERLI;
    default:
      throw new Error(`Unsupported network named ${network}`);
  }
};

export interface QueryParams extends GetAttestationParams {
  take?: number;
  skip?: number;
}
