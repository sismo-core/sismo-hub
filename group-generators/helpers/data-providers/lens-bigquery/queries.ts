import { PublicationReaction } from "./types";
import {
  ProfileId, 
  PublicationId,
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

export const getWhoCollectedPublicationQuery = ({
  publicationId
}: PublicationId) => {
    return `SELECT owner_address as address, ROW_NUMBER() OVER(ORDER BY block_timestamp ASC) as value
    FROM \`lens-public-data.polygon.public_collect_post_nft_ownership\`
    WHERE post_id = "${publicationId}"`;
};

export const getWhoCollectedPublicationCountQuery = ({
  publicationId
}: PublicationId) => {
  return `SELECT COUNT(DISTINCT owner_address)
  FROM \`lens-public-data.polygon.public_collect_post_nft_ownership\`
  WHERE post_id = "${publicationId}"`;
};

export const getWhoMirroredPublicationQuery = ({
  publicationId
}: PublicationId) => {
    return `SELECT owned_by AS address, ROW_NUMBER() OVER(ORDER BY block_timestamp ASC) as value
    FROM \`lens-public-data.polygon.public_profile\`
    WHERE profile_id IN (
      SELECT profile_id
      FROM \`lens-public-data.polygon.public_profile_post\`
      WHERE is_related_to_post = "${publicationId}"
    );`
};

export const getWhoMirroredPublicationCountQuery = ({
  publicationId
}: PublicationId) => {
    return `SELECT COUNT(DISTINCT owned_by)
    FROM \`lens-public-data.polygon.public_profile\`
    WHERE profile_id IN (
      SELECT profile_id
      FROM \`lens-public-data.polygon.public_profile_post\`
      WHERE is_related_to_post = "${publicationId}"
    );`
};

export const getProfilesRankQuery = (rank: number) => {
    return `SELECT owned_by as address, ROW_NUMBER() OVER(ORDER BY block_timestamp ASC) as value
    FROM \`lens-public-data.polygon.public_profile\`
    ORDER BY block_timestamp ASC LIMIT ${rank}`;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProfilesRankCountQuery = (rank: number) => {
  return `SELECT COUNT(*) FROM \`lens-public-data.polygon.public_profile\``;
};

export const getPublicationReactorsQuery = ({
  publicationId,
  reaction
}: PublicationReaction) => {
    return `SELECT owned_by AS address, ROW_NUMBER() OVER(ORDER BY block_timestamp ASC) as value
    FROM \`lens-public-data.polygon.public_profile\`
    WHERE profile_id IN (
      SELECT actioned_by_profile_id
      FROM \`lens-public-data.polygon.public_publication_reaction_records\`
      WHERE publication_id = "${publicationId}" AND reaction = "${reaction}" AND has_undone is FALSE
    )`
};

export const getPublicationReactorsCountQuery = ({
  publicationId,
  reaction
}: PublicationReaction) => {
    return `SELECT COUNT(actioned_by_profile_id)
    FROM \`lens-public-data.polygon.public_publication_reaction_records\`
    WHERE publication_id = "${publicationId}" AND reaction = "${reaction}" AND has_undone is FALSE`
};

export const getWhoCommentedPublicationQuery = ({
  publicationId
}: PublicationId) => {
    return `SELECT profile.owned_by AS address, COUNT(post.comment_by_profile_id) AS value
    FROM \`lens-public-data.polygon.public_profile\` profile
    JOIN \`lens-public-data.polygon.public_post_comment\` post ON profile.profile_id = post.comment_by_profile_id
    WHERE post.post_id = "${publicationId}"
    GROUP BY profile.owned_by;`
};

export const getWhoCommentedPublicationCountQuery = ({
  publicationId
}: PublicationId) => {
    return `SELECT COUNT(DISTINCT comment_by_profile_id) FROM \`lens-public-data.polygon.public_post_comment\` WHERE post_id = "${publicationId}"`
};