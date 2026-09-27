import type { Image, Show } from "@/types/show";

export interface ShowDetails extends Show {
  language?: string
  status?: string
  premiered?: string
  officialSite?: string | null
  network?: Network | null
  runtime?: number
  _embedded?: {
    cast: CastMember[]
  }
}

export interface Network {
  name: string
  country: Country | null
}


export interface Country {
  name: string
  code: string
}


export interface CastMember {
  person: Person
  character: Character
}

export interface Person {
  id: number
  name: string
  image: Image | null
  url: string | null
}

export interface Character {
  id: number
  name: string
  image: Image | null
}
