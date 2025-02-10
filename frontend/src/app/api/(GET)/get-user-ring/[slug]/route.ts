const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:5000"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug

    try {
        const res = await fetch(`${API_URL}/api/get-user-rings/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store",
        })

        if (!res.ok) {
            return new Response(null, { status: 404 })
        }

        return new Response(res.body, { status: 200 })

    } catch (error) {
        return new Response(null, { status: 500 })
    }
}
