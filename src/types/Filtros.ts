import type { Result, ResultEpisode, ResultLocation } from '@/types/Api'

export type FiltroSelected = 'todos' | 'personajes' | 'episodios' | 'ubicaciones' | string

export interface GroupResult extends Result {
  dimension: string
}

export interface RequestFilter {
  personajes: Result[]
  episodios: ResultEpisode[] | GroupResult[]
  ubicaciones: ResultLocation[] | GroupResult[]
}
