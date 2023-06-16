import {
  ProfileId,
} from "@group-generators/helpers/data-providers/lens/types";


export const getFollowersQuery = ({
  profileId
}: ProfileId) => {
    return `SELECT address, ROW_NUMBER() OVER(ORDER BY block_timestamp ASC) as value 
    FROM \`lens-public-data.polygon.public_follower\` 
    WHERE follow_profile_id = "${profileId}"`;
};

export const getFollowersCountQuery = ({
  profileId
}: ProfileId) => {
    return `SELECT count(*) 
    FROM \`lens-public-data.polygon.public_follower\` 
    WHERE follow_profile_id = "${profileId}"`;
};