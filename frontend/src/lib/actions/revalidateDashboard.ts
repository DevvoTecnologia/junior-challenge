"use server"
import { revalidatePath } from "next/cache"

export async function revalidateDashboard() {
  revalidatePath("/pt/dashboard")
  revalidatePath("/en/dashboard")
  revalidatePath("/es/dashboard")
}
