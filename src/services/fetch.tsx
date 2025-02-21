
export async function fetchApi(option: "character" | "location" | "episode") {
    try {
        const data = await fetch(`https://rickandmortyapi.com/api/${option}`)
        return await data.json()
    } catch (error) {
        throw new Error("Error de conexión " + error)
    }
}