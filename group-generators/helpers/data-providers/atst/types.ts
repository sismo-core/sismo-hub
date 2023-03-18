export type Attestation = {
  address: string;
  id: string;
  creator: string;
  receiver: string;
  key: string;
  value: string;
};

export type GetAttestationDataType = {
  attestations: Attestation[];
};

export type QueryParams = {
  key: string;
  value: string;
  first?: number
  skip?: number;
};
