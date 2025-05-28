export const structureFavorites = {
  character: Array<string>(),
  episode: Array<string>(),
  location: Array<string>()
}

export const sections = {
  person: 'personajes',
  episode: 'episodios',
  ubi: 'ubicaciones',
  all: 'todos'
}
const [p, e, u] = Object.keys(structureFavorites)

export const reformatSections = {
  [sections.person]: p,
  [sections.episode]: e,
  [sections.ubi]: u
} as const;
export const sectionToDP = {
  [p.concat('s')]: sections.person,
  [e.concat('s')]: sections.episode,
  [u.concat('s')]: sections.ubi
}
export const widthClases = {
  grande: 'grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]',
  mediano: 'grid-cols-[repeat(auto-fill,minmax(200px,1fr))]',
  pequeño: 'grid-cols-[repeat(auto-fill,minmax(130px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]'
}

export const padding = 'p-3 sm:px-4 sm:py-3'

export const Desconocidos = (ori?: string, text?: string) => ori === 'unknown' ? `${text} desconocido` : ori