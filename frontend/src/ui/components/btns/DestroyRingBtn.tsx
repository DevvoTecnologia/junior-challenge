"use client"
import { BiTrash } from "react-icons/bi"
import { revalidateDashboard } from "@/lib/actions/revalidateDashboard"
import { useTranslations } from "next-intl"

export const DestroyRingBtn = ({ userEmail, ringID }: { userEmail: string, ringID: any }) => {
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
                body: JSON.stringify({ userEmail, ringID }),
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
