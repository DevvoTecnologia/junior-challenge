const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:5000"

export async function POST(request: Request) {
    try {
        const { email, name, power, carrier, forjer, image } = await request.json()

        const res = await fetch(`${API_URL}/api/create-ring`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name, power, carrier, forjer, image }),
        })

        // Captura a resposta do backend
        const responseData = await res.json()
        return new Response(JSON.stringify(responseData), { status: res.status })
        
    } catch (error: any) {
        return new Response(JSON.stringify({ message: "Erro interno", error: error.toString() }), { status: 500 })
    }
}
