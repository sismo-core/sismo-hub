export type Attestation = {
  id: string;
  index: number;
  creator: string;
  receiver: string;
  keyString: string;
  val: string;
  valueString: string;
};

export type GetAttestationDataType = {
  attestations: Attestation[];
};

export type GetAttestationParams = {
  creator: string;
  key?: string;
  value?: string;
};

export type GetAttestationValueParams = {
  creator: string;
  key: string;
};

export type QueryParams = {
  creator: string;
  key?: string;
  value?: string;
  first?: number;
  index?: number;
};
