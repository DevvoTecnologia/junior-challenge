const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:5000"

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        const res = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        if (!res.ok) {
            return new Response(JSON.stringify({ message: "Erro ao fazer login" }), { status: res.status })
        }

        return new Response(res.body, { status: 200 })

    } catch (error: any) {
        return new Response(JSON.stringify({ message: "Erro interno", error: error.toString() }), { status: 500 })
    }
}
