// Project Type
export interface ProjectType {
  projectId: number
  projectName: string
  projectIcon: string
  categories: string[]
  projectDetails: string
  projectMetrics: Metric[]
  projectSocials: SocialLink[]
  projectLinks: ProjectLink[]
  impactDetails: string
  impactMetrics: Metric[]
  funding: Funding[]
  score: number
}

export interface Metric {
  [key: string]: number
}

export interface SocialLink {
  [key: string]: string
}

export interface ProjectLink {
  [key: string]: string
}

export interface Funding {
  [key: string]: number
}

// Project Card Type
export interface ProjectCardType {
  projectId: number
  projectIcon: string
  projectName: string
  projectDetails: string
  categories: string[]
}

// MyVote Card Type
export type MyVoteCardType = {
  firstProject: ProjectType | null
  secondProject: ProjectType | null
  status: 'displayed' | 'voted' | 'hidden'
  votedProject: ProjectType | null
  pairIndex: number | null
}

// Address Type
export type addressType = `0x${string}` | undefined

export type MyScoreDataType = {
  address: addressType
  score: number
}
