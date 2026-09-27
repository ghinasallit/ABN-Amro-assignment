export interface Show {
  id: number
  name: string
  genres: string[]
  image: Image | null
  rating: Rating
  summary: string | null
}

export interface Image {
  medium: string
  original: string
}

export interface Rating {
  average: number | null
}
