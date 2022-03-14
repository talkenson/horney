export interface CardContent {
  id: number //userid
  title: string
  subtitle?: string
  desc?: string
  coverURL?: CoverImageHash
  photos?: ImageUrl[]
}

export type ImageUrl = string
export type CoverImageHash = string
