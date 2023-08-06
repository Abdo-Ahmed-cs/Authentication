"use client"

import Image from 'next/image'
import styles from './page.module.css'
import {signOut, signIn, useSession} from "next-auth/react"
import { Box, AppBar, Button, Typography, Avatar, Tooltip } from '@mui/material'
import {Dashboard, CheckCircleOutline} from "@mui/icons-material"
import {redirect} from "next/navigation"
export default function Home() {
  const {data: session} = useSession()
  // console.log(session)
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
          <AppBar sx={{padding: "16px 25px", display: "flex", flexDirection: "row"}}>
            <Dashboard sx={{fontSize: "2rem"}}/>
            <Box sx={{flexGrow: "1", display: "flex", alignItems: "center", gap: "20px"}}>
              {/* <Typography sx={{marginLeft: "auto"}}></Typography> */}
              <Tooltip title={session?.user?.name} arrow>
                <Avatar sx={{marginLeft: "auto", background: "green"}}>{session?.user?.name?.[0]}</Avatar>
              </Tooltip>
              <Button variant='contained' color='success' onClick={() => signOut()} disableRipple>Sign out</Button>
            </Box>
          </AppBar>
          <Box sx={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <CheckCircleOutline sx={{fontSize: "10rem"}} color='success'/>
            <Typography variant='h1'>You Signed in successfully</Typography>
            <Typography variant='h1'>as {session?.user?.name}</Typography>
          </Box>
    </Box>
  )
}
