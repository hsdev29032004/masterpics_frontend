"use client"
import { Avatar, Box, Button, Chip, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Login() {
    const { t } = useTranslation()
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: 'user@gmail.com',
        password: 'masterpics',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        })
        const result = await res.json()
        if(result.status == "success"){ 
            router.push("/")
        }
    };

    return (
        <Box
            component="main"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h1 style={{ marginBottom: "10px" }}>
                {t('Login')}
            </h1>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "350px"
                }}
            >
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{
                        mb: "15px",
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label={t('Password')}
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Link
                    style={{
                        marginBottom: "10px",
                        fontWeight: "600",
                        fontSize: "13px",
                        marginTop: "5px"
                    }}
                    href="#"
                >
                    {t('Forgotpassword')}
                </Link>
                <Button fullWidth type="submit" variant="contained" color="primary">
                    {t('Login')}
                </Button>
            </Box>
            <Typography component="p" style={{ fontSize: "13px", marginTop: "20px" }}>{t('Orcontinuewith')}</Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mt: "20px",
                    "& .MuiChip-root": {
                        cursor: "pointer"
                    }
                }}
            >
                <Chip
                    sx={{
                        display: "flex", flexDirection: "column", width: "100px", "& .MuiAvatar-root": {
                            margin: 0,
                        },
                    }}
                    avatar={<Avatar
                        src="https://www.pngmart.com/files/16/official-Google-Logo-PNG-Image.png"
                        alt="Google"
                    />}
                />

                <Chip
                    sx={{
                        display: "flex", flexDirection: "column", width: "100px", "& .MuiAvatar-root": {
                            margin: 0,
                        },
                    }}
                    avatar={<Avatar
                        src="https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png"
                        alt="Facebook"
                        style={{width: 37, height: 37}}
                    />}
                />

                <Chip
                    sx={{
                        display: "flex", flexDirection: "column", width: "100px", "& .MuiAvatar-root": {
                            margin: 0,
                        },
                    }}
                    avatar={<Avatar
                        src="https://www.pngmart.com/files/23/Github-Logo-PNG.png"
                        alt="Github"
                        style={{width: 28, height: 28}}
                    />}
                />
            </Box>
            <Typography sx={{marginTop: "15px"}}>
                {t('Dontyouhaveaccount')}
                <Link href="/register" style={{marginLeft: "5px"}}><b>{t('Regisnow')}</b></Link>
            </Typography>
        </Box>
    );
}