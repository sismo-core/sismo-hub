import { Hashtag, PublicationReaction } from "./types";
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

export const getProfileFromAddressQuery = (address: string) => {
  return `SELECT profile_id
  FROM \`lens-public-data.polygon.public_profile\`
  WHERE LOWER(owned_by) = LOWER("${address}")`;
};

export const getProfileFromHandleQuery = (handle: string) => {
  return `SELECT profile_id
  FROM \`lens-public-data.polygon.public_profile\`
  WHERE LOWER(handle) = LOWER("${handle}")`;
};

export const getPublicationCollectorsQuery = ({
  publicationId
}: PublicationId) => {
    return `SELECT owner_address as address, ROW_NUMBER() OVER(ORDER BY block_timestamp ASC) as value
    FROM \`lens-public-data.polygon.public_collect_post_nft_ownership\`
    WHERE post_id = "${publicationId}"`;
};

export const getPublicationCollectorsCountQuery = ({
  publicationId
}: PublicationId) => {
  return `SELECT COUNT(DISTINCT owner_address)
  FROM \`lens-public-data.polygon.public_collect_post_nft_ownership\`
  WHERE post_id = "${publicationId}"`;
};

export const getPublicationMirrorersQuery = ({
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

export const getPublicationMirrorersCountQuery = ({
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

export const getPublicationCommentersQuery = ({
  publicationId
}: PublicationId) => {
    return `SELECT profile.owned_by AS address, COUNT(post.comment_by_profile_id) AS value
    FROM \`lens-public-data.polygon.public_profile\` profile
    JOIN \`lens-public-data.polygon.public_post_comment\` post ON profile.profile_id = post.comment_by_profile_id
    WHERE post.post_id = "${publicationId}"
    GROUP BY profile.owned_by;`
};

export const getPublicationCommentersCountQuery = ({
  publicationId
}: PublicationId) => {
    return `SELECT COUNT(DISTINCT profile.profile_id)
    FROM \`lens-public-data.polygon.public_profile\` profile
    JOIN \`lens-public-data.polygon.public_post_comment\` post ON profile.profile_id = post.comment_by_profile_id
    WHERE post.post_id = "${publicationId}"`
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

export const getProfilesRankQuery = (rank: number) => {
    return `SELECT owned_by as address, ROW_NUMBER() OVER(ORDER BY block_timestamp ASC) as value
    FROM \`lens-public-data.polygon.public_profile\`
    ORDER BY block_timestamp ASC LIMIT ${rank}`;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProfilesRankCountQuery = (rank: number) => {
  return `SELECT COUNT(*) FROM \`lens-public-data.polygon.public_profile\``;
};

export const getHashtagMentionersQuery = ({
  hashtag
}: Hashtag) => {
    return `SELECT profile.owned_by AS address, COUNT(post.profile_id) AS value
    FROM \`lens-public-data.polygon.public_profile\` profile
    JOIN \`lens-public-data.polygon.public_profile_post\` post ON profile.profile_id = post.profile_id
    JOIN \`lens-public-data.polygon.public_hashtag\` hashtag ON post.post_id = hashtag.post_id
    WHERE hashtag.hashtag = "${hashtag}"
    GROUP BY profile.owned_by;`
};

export const getHashtagMentionersCountQuery = ({
  hashtag
}: Hashtag) => {
    return `SELECT COUNT(DISTINCT profile.owned_by)
    FROM \`lens-public-data.polygon.public_profile\` profile
    JOIN \`lens-public-data.polygon.public_profile_post\` post ON profile.profile_id = post.profile_id
    JOIN \`lens-public-data.polygon.public_hashtag\` hashtag ON post.post_id = hashtag.post_id
    WHERE hashtag.hashtag = "${hashtag}"`
};