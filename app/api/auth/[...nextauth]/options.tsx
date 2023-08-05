import axios from "axios"
import type {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

export const options: NextAuthOptions = {
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_CLIENT as string,
        //     clientSecret: process.env.GITHUB_SECRET as string
        // }),
        CredentialsProvider({
            name: "credential",
            credentials: {
                username: {
                    label: "UserName",
                    type: "text",
                    placeholder: "your cool name"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "your cool password"
                }
            },
            async authorize(credentials) {
                const {data: users} = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users`)
                console.log(process.env.NEXTAUTH_URL)
                const authUser = users.find((user: { name: string | undefined }) => user.name === credentials?.username)
                if (authUser != null && authUser.password === credentials?.password) {
                    return authUser
                } else {
                    return null
                }
            }
        }),
    ],
    pages: {
        signIn: "/auth/signIn",
        // signOut: "/auth/signOut",
    }
}