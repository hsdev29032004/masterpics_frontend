"use client";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import CottageIcon from '@mui/icons-material/Cottage';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ImageIcon from '@mui/icons-material/Image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import MenuSetting from '@/components/menu/MenuSetting';
import { usePathname } from 'next/navigation';
import { Input, useColorScheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import InputSearch from '@/components/input/InputSearch';

export default function Header() {
    const { colorScheme } = useColorScheme()

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [initialized, setInitialized] = useState(false)
    const user = useSelector((state: RootState) => state.user)

    let pathname = usePathname()
    pathname = pathname === "/en" ? "/" : pathname.replace(/^\/(en|vi)\//, '/')

    useEffect(() => {
        setInitialized(true)
    }, [])

    const pages = [
        { href: "/", icon: <CottageIcon sx={{ color: initialized && colorScheme == "light" ? "#E813B6" : null }} /> },
        { href: "/follow", icon: <PeopleAltIcon sx={{ color: initialized && colorScheme == "light" ? "#5D70EA" : null }} /> },
        { href: "/favorite", icon: <FavoriteIcon sx={{ color: initialized && colorScheme == "light" ? "#E8133D" : null }} /> },
        { href: "/buyed", icon: <ImageIcon sx={{ color: initialized && colorScheme == "light" ? "#7AE813" : null }} /> },
    ]

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <header className='bg-second'>
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        minHeight: "60px",
                    }}
                >
                    {/* Box này 7 cột */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <Link
                            href="/"
                            style={{ display: "flex" }}
                        >
                            <Avatar src={`${process.env.NEXT_PUBLIC_NEXTSERVER_DOMAIN}/images/logo.jpg`} sx={{ mr: 1 }} />
                        </Link>
                        <InputSearch />
                    </Box>

                    {/* Box này 10 cột */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: "center",
                            height: "60px"
                        }}
                    >
                        {pages.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    display: 'flex',
                                    padding: "0 20px",
                                    height: "100%",
                                    alignItems: "center",
                                }}
                                className={`hover ${pathname == link.href ? 'active' : ''}`}
                            >
                                {link.icon}
                            </Link>
                        ))}
                    </Box>

                    {/* Box này 7 cột */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2
                        }}
                    >
                        <NotificationsIcon
                            className='bg-main'
                            style={{
                                padding: "5px",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%"
                            }}
                        />
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="" src={`${process.env.NEXT_PUBLIC_NEXTSERVER_DOMAIN}/images/${user.avatar}`} />
                        </IconButton>
                        <MenuSetting
                            anchorElUser={anchorElUser}
                            handleCloseUserMenu={handleCloseUserMenu}
                        />
                    </Box>
                </Box>
            </Container>
        </header>
    );
}