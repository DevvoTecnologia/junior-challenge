const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:5000"

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json()

        const res = await fetch(`${API_URL}/api/create-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        })

        if (!res.ok) {
            return new Response(null, { status: 400 })
        }

        return new Response(await res.text(), { status: 200 })

    } catch (error: unknown) {
        console.error(error)
        return new Response(null, { status: 500 })
    }
}
