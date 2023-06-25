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
  network: "mainnet" | "arbitrum" | "sepolia" | "optimism-goerli" | "base-goerli";
  schema: string;
  attester: string;
  key?: string;
  value?: string;
}

export interface QueryParams extends GetAttestationParams {
  take?: number;
  skip?: number;
}
