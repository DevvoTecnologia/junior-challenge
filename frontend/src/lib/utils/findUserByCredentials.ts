//

export async function findUserByCredentials(email: string, password: string) {

    try {
        const res = await fetch(`${process.env.AUTH_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        if (!res.ok) {
            return null
        }

        const data = await res.json()

        return data.user || null

    } catch (error) {
        return null
    } 
}
