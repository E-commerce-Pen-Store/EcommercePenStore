export async function getData(url) {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`${response.status} Something went wrong, couldn't fetch data!`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error(error)
    }
}