
// discourse api 

export type DiscourseUser = {
  id: number;
  username: string;
  name: string;
  email: string;
  secondary_emails: [];
  active: boolean;
  admin: boolean;
  moderator: boolean;
  last_seen_at: string;
  last_emailed_at: string;
  created_at: string;
  last_seen_age: number;
  last_emailed_age: number;
  created_at_age: number;
  trust_level: number;
  manual_locked_trust_level: string;
  flag_level: number;
  title: string;
  time_read: number;
  staged: boolean;
  days_visited: number;
  posts_read_count: number;
  topics_entered: number;
  post_count: number;
};

export type DiscourseBadge = {
  id: number;
  name: string;
  description: string;
  grant_count: number;
  allow_title: boolean;
  multiple_grant: boolean;
  icon: string;
  image_url: string;
  listable: boolean;
  enabled: boolean;
  badge_grouping_id: number;
  system: boolean;
  slug: string;
  manually_grantable: boolean;
  badge_type_id: number;
};

export type DiscourseGroup = {
  id: number,
  automatic: boolean,
  name: string,
  display_name: string,
  user_count: number,
  mentionable_level: number,
  messageable_level: number,
  visibility_level: number,
  primary_group: boolean,
  title: string | null,
  grant_trust_level: string | null,
  incoming_email: string | null,
  has_messages: boolean,
  flair_url: string | null,
  flair_bg_color: string | null,
  flair_color: string | null,
  bio_raw: string | null,
  bio_cooked: string | null,
  bio_excerpt: string | null,
  public_admission: boolean,
  public_exit: boolean,
  allow_membership_requests: boolean,
  full_name: string | null,
  default_notification_level: number,
  membership_request_template: string | null,
  is_group_user: boolean,
  is_group_owner: boolean,
  members_visibility_level: number,
  can_see_members: boolean,
  can_admin_group: boolean,
  can_edit_group: boolean,
  publish_read_state: boolean,
}

// Discorse GroupMembers
export type DiscourseGroupMember = {
  id: 0,
  username: string,
  name: string,
  avatar_template: string,
  title: string,
  last_posted_at: string,
  last_seen_at: string,
  added_at: string,
  timezone: string
}

// user defined types

export type Users = {
  id: number,
  name: string,
}

export type UsersWithBadgesCountRequest = {
  discourseDomain: string, apiKey: string, badgeId: number
}

export type UsersCountRequest = {
  discourseDomain: string, apiKey: string
}

