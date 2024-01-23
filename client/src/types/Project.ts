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
