import {users} from "../../../../data/users"

export async function GET(request: Request) {
    return new Response(JSON.stringify(users))
}

export async function POST(request: Request) {
    const newUser = await request.json()
    const authUser = await users.find((user: { name: string | undefined }) => user.name === newUser?.name)
    if (authUser && authUser.password === newUser?.password) {
        return new Response(JSON.stringify(authUser))
    } else {
        return new Response(null)
    }
}