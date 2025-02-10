import type { APICharacter } from "../types/Api";

export async function fetchApi(option: "character" | "location" | "episode"): Promise<APICharacter> {
    try {
        const data = await fetch(`https://rickandmortyapi.com/api/${option}`)
        return await data.json()
    } catch (error) {
        throw new Error("Error de conexión " + error)
    }
}