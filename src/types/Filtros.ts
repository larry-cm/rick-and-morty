import type { Result, ResultEpisode, ResultLocation } from '@/types/Api'

export type FiltroSelected = 'todos' | 'personajes' | 'episodios' | 'ubicaciones' | string

type Context = {context?:string}

export type Collections = Result[] & Context | ResultEpisode[] & Context | ResultLocation[] & Context

export interface GroupResult extends Result {dimension: string}

export interface RequestFilter {
  personajes: Result[]
  episodios: ResultEpisode[] 
  ubicaciones: ResultLocation[] 
}
