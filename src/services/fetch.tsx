import type { ApiInitial } from "../types/Api";

export async function fetchApi() {
    try {
        const data = await fetch("https://rickandmortyapi.com/api") 
    return await data.json() as ApiInitial
    } catch (error) {
        throw new Error("error manjado pero no solucionado "+error)
    }
}