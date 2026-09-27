import type { Show } from "@/types/show";
import { BASE_URL } from "@/utils/constants";
import type { SearchResult } from "@/types/search";
import type { ShowDetails } from "@/types/showDetails";
import { apiFetch } from "./fetchClient";
export async function fetchShows(page = 0): Promise<Show[]> {
  return apiFetch(`${BASE_URL}/shows?page=${page}`);
}

export async function searchShows(query: string): Promise<SearchResult[]> {
  return apiFetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);

}

export async function fetchShowDetails(id: number): Promise<ShowDetails> {
  return apiFetch(`${BASE_URL}/shows/${id}?embed=cast`);
}
