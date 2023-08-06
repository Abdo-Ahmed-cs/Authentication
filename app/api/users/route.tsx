import {users} from "../../../data/users"

export async function GET(request: Request) {
    return new Response(JSON.stringify(users))
}

export async function POST(request: Request) {
    const newUser = await request.json()
    users.push(newUser)
    return new Response(JSON.stringify(newUser))
}