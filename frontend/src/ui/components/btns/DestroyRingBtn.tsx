"use client"
import { BiTrash } from "react-icons/bi"
import { revalidateDashboard } from "@/lib/actions/revalidateDashboard"

export const DestroyRingBtn = ({ userEmail, ring_id }: { userEmail: string, ring_id: any }) => {
    async function destroyRing() {
        try {
            const res = await fetch("/api/delete-ring", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail, ring_id }),
            })

            console.log(res)
            
        } catch (error) {
            console.error(error)
        } finally {
            await revalidateDashboard()
        }
    }

    return (
        <button onClick={destroyRing}>
            <BiTrash />
        </button>
    )
}
