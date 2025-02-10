const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:5000"

export async function DELETE(request: Request) {
    const { userEmail, ringID } = await request.json()

    try {
        const res = await fetch(`${API_URL}/api/delete-ring`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                user_email: userEmail,
                ring_id: ringID
            }),
        })

        // Captura a resposta do backend
        const responseData = await res.json()
        return new Response(JSON.stringify(responseData), { status: res.status })
    } catch (error: any) {
        return new Response(JSON.stringify({ message: "Erro interno", error: error.toString() }), { status: 500 })
    }
}
