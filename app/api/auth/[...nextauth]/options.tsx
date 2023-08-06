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
                const config = {
                    headers: {
                      "Content-Type": "application/json; charset=utf-8",
                      corsOrigin: "*",
                      "Access-Control-Allow-Origin": "*",
                    }
                }
                const {data: user} = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/authUser`, {
                    name: credentials?.username,
                    password: credentials?.password
                }, config)
                console.log(user === null ? user : "undefined user")
                if (user) {
                    return user
                } else {
                    return null
                }
                // const authUser = await users.find((user: { name: string | undefined }) => user.name === credentials?.username)
                // console.log(authUser)
                // if (authUser && authUser.password === credentials?.password) {
                //     return authUser
                // } else {
                //     return null
                // }
            }
        }),
    ],
    pages: {
        signIn: "/auth/signIn",
        // signOut: "/auth/signOut",
    }
}