/* istanbul ignore file */
import { gql } from "graphql-request";
import { IResolver } from "./resolver";
import { GraphQLProvider } from "@group-generators/data-providers/graphql";

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
  public async resolve(lensHandle: string): Promise<string> {
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

    return userData.profile.ownedBy;
  }
}
