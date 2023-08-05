"use client"
import React, { useRef, useState } from 'react'
import {signIn} from "next-auth/react"
import { useRouter } from 'next/navigation'
import { Box, Paper, Typography, Button, TextField, Stack } from "@mui/material"

export default function SingIn() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const login = async () => {
        const res = await signIn("credentials", {
            username: username,
            password: password,
            callbackUrl: "/"
        })
    }
  return (
    <Box component="section" sx={{width: "100%", minHeight: "100vh", display: "flex",gap: "10px",flexDirection: "column",justifyContent: "center", alignItems: "center", background: "#fff"}}>
        <Typography color="black" variant='h4'>SignIn</Typography>
        <Paper sx={{display: "flex", flexDirection: "column", gap: "20px"}}>
            <TextField onChange={(e) => setUsername(() => e.target.value)} variant='outlined'label="Username" placeholder='your cool username' size='medium'/>
            <TextField onChange={(e) => setPassword(() => e.target.value)} variant='outlined' type='password' label="Password" placeholder='your cool password' size='medium'/>
            <Stack spacing={0.7}>
                <Button variant='contained' color='primary' onClick={login} disableRipple>LogIn</Button>
                <Button variant='contained' color='primary' onClick={() => router.push("/auth/signUp")} disableRipple>SignUp</Button>
            </Stack>
        </Paper>
    </Box>
  )
}
