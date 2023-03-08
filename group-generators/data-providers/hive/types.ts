export type Influencer = {
    identity: Identity
    personal_rank: number
  }
  
  export type Identity = {
    social_accounts: SocialAccountObject[]
  }
  
  export type SocialAccountObject = {
    social_account: SocialAccount
  }
  
  export type SocialAccount = {
    id: number
    personal_rank: number
    followers_count: number
    name: string
    screen_name: string
  }

  export type ClusterName = {
    clusterName: string
  }