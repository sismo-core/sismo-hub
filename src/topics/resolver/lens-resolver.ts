/* istanbul ignore file */
import { gql } from "graphql-request";
import { IResolver } from "./resolver";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export type LensProfile = {
  handle: string;
  ownedBy: string;
};

export class LensResolver extends GraphQLProvider implements IResolver {
  constructor() {
    super({
      url: "https://api.lens.dev",
    });
  }
  public async resolve(lensHandleArray: FetchedData): Promise<FetchedData> {
    const lensHandle = Object.keys(lensHandleArray)[0];
    const userData = await this.query<{
      profile: LensProfile;
    }>(
      gql`
        query ExploreProfiles($lensHandle: Handle) {
          profile(request: { handle: $lensHandle }) {
            handle
            ownedBy
          }
        }
      `,
      { lensHandle: lensHandle }
    );

    return { [userData.profile.ownedBy]: Object.values(lensHandleArray)[0] };
  }
}
