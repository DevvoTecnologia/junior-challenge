"use server"
import { signIn } from "@/auth"

export async function loginAction(_prevState: any, formData: FormData) {
    try {
        const res = await signIn("credentials", {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            redirect: false,
        })

        if (res?.error) {
            return { success: false, message: "Dados de login incorretos." }
        }

        return { success: true }
        
    } catch (e: any) {
        if (e.type === "CredentialsSignin") {
            return { success: false, message: "Dados de login incorretos." }
        }
        return { success: false, message: "Ops, algum erro aconteceu!" }
    }
}
