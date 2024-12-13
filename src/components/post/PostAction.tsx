"use client"
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import { useColorScheme } from '@mui/material';
import { useEffect, useState } from 'react';

export default function PostAction({price}: {price: number}) {
    const { colorScheme } = useColorScheme()

    const [mount, setMound] = useState<boolean>(false)
    useEffect(() => {
        setMound(true)
    }, [])

    if(!mount) return null
    return (
        <div
            style={{
                borderTop: colorScheme == "dark" ? "2px solid #3f3f3f" : "2px solid #ddd",
                marginTop: "10px",
                alignItems: "center",
                padding: "7px 20px",
                paddingBottom: "0px",
                display: "flex",
                justifyContent: "space-between",
            }}
            className='post-action'
        >
            <div style={{display: "flex", alignItems: "center", gap: 10}}>
                <FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }} />
                <ShareIcon sx={{ fontSize: "30px" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <DownloadIcon sx={{ fontSize: "35px" }} />
                <p>{new Intl.NumberFormat().format(price)}đ</p>
            </div>
        </div>
    )
}