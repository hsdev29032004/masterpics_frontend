"use client"
import { login, register } from "@/services/auth";
import { Avatar, Box, Button, Chip, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Register() {
    const { t } = useTranslation()
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repassword: '',
        fullName: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(formData.password !== formData.repassword){
            return alert("Mật khẩu nhập lại chưa đúng")
        }

        const result = await register(formData)
        console.log(result)
        if(result.status == "success"){ 
            router.push("/login")
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
                {t('Register')}
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
                    sx={{
                        mb: "15px",
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label={t('Repassword')}
                    name="repassword"
                    type="password"
                    value={formData.repassword}
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
                    label={t('Fullname')}
                    name="fullName"
                    type="text"
                    value={formData.fullName}
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

                <Button fullWidth type="submit" variant="contained" color="primary">
                    {t('Register')}
                </Button>
            </Box>

            <Typography sx={{marginTop: "15px"}}>
                {t('Doyouhaveaccount')}
                <Link href="/login" style={{marginLeft: "5px"}}><b>{t('Loginnow')}</b></Link>
            </Typography>
        </Box>
    )
}