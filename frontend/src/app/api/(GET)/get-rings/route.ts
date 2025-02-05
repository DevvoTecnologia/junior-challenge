const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:5000"

export async function GET() {
    try {
        const res = await fetch( `${API_URL}/api/get-users-rings`, {
            method: "GET",
            cache: "force-cache",
            next: { tags: [ "RINGS_DATA" ] }
        })

        if (!res.ok) {
            return new Response(JSON.stringify({ message: "No data found" }), { status: 404 })
        }

        return new Response(res.body, { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 })
    }
}
