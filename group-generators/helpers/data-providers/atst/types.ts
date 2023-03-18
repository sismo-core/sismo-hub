export type Attestation = {
  id: string;
  creator: string;
  receiver: string;
  keyString: string;
  valueString: string;
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
