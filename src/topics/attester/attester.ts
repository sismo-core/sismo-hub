import { BigNumberish } from "ethers";
import { AttestationsCollection } from "../attestations-collection";
import { inject, injectable } from "tsyringe";
import GroupStore from "../group/group.store";

@injectable()
export class Attester {
  public attestationsCollections: AttestationsCollection[];
  public collectionIdFirst: BigNumberish;

  constructor(@inject("GroupStore") protected groupStore: GroupStore) {}
}
