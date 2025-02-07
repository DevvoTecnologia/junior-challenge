"use client"
import { BiTrash } from "react-icons/bi"
import { revalidateDashboard } from "@/lib/actions/revalidateDashboard"
import { useTranslations } from "next-intl"

export const DestroyRingBtn = ({ userEmail, ring_id }: { userEmail: string, ring_id: any }) => {
    const tI = useTranslations("Index")

    async function destroyRing() {
        const confirm = window.confirm(tI("confirm_destroy_ring"))

        if (!confirm) {
            return
        }

        try {
            await fetch("/api/delete-ring", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail, ring_id }),
            })
            
            await revalidateDashboard()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <button onClick={destroyRing}>
            <BiTrash />
        </button>
    )
}
