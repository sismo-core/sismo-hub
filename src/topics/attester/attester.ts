import { inject, injectable } from "tsyringe";
import { BigNumberish } from "ethers";
import { AttestationsCollection } from "../attestations-collection";
import { GroupStore } from "../group";

@injectable()
export class Attester {
  public attestationsCollections: AttestationsCollection[];
  public collectionIdFirst: BigNumberish;

  constructor(@inject("GroupStore") protected groupStore: GroupStore) {}
}
