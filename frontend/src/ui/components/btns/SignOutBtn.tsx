import logoutAction from "@/lib/actions/logoutAction"

export const SignOutBtn = () => {
    return (
        <form action={logoutAction}>
            <button type="submit">Logout</button>
        </form>
    )
}
