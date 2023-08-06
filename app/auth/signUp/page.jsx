"use client"
import React, { useRef, useState } from 'react'
import { Box, Paper, Typography, Button, TextField, Stack } from "@mui/material"
import axios from "axios"
import { useRouter } from 'next/navigation'


export default function SingIn() {
    const router = useRouter()
    const [error, setError] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confpassword, setConfPassword] = useState("")
    const isdisabled = username && password && password === confpassword
    const createAccount = async () => {
        const {data: users} = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users`)
        const isfound = users.find((user) => user.name === username)
        // console.log(isfound)
        if (isfound != null) {
            setError(() => true)
            return
        }
            setError(() => false)
            const newUser = {id: Date.now(), name: username, password}
            const res = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users`, newUser)
            setUsername(() => "")
            setPassword(() => "")
            setConfPassword(() => "")
            router.push("/auth/signIn")
    }
  return (
    <Box component="section" 
    sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",gap: "10px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
        }}>
        <Typography color="black" variant='h4'>Create your account</Typography>
        <Paper sx={{display: "flex", flexDirection: "column", gap: "20px", padding: "16px 25px"}}>
            <TextField helperText={error === true ? "username does exist" : ""} error={error} value={username} onChange={(e) => setUsername(() => e.target.value)} variant='outlined'label="Username" placeholder='your cool username' size='medium'/>
            <TextField value={password} onChange={(e) => setPassword(() => e.target.value)} variant='outlined' type='password' label="Password" placeholder='your cool password' size='medium'/>
            <TextField value={confpassword} onChange={(e) => setConfPassword(() => e.target.value)} variant='outlined' type='password' label="Confirm Password" placeholder='your cool password' size='medium'/>
            <Stack spacing={0.7}>
                <Button variant='contained' color='primary' onClick={createAccount} disabled={!isdisabled} disableRipple>Create</Button>
            </Stack>
        </Paper>
    </Box>
  )
}
