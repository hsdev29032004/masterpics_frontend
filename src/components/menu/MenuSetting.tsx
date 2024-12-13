import { changeLocale } from "@/helpers/changeLocale";
import useMessage from "@/hooks/useMessage";
import { logout } from "@/services/auth";
import { RootState } from "@/stores/store";
import { setUser } from "@/stores/userSlice";
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { Avatar, Menu, MenuItem, Typography, useColorScheme } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

interface MenuSettingProps {
    anchorElUser: HTMLElement | null
    handleCloseUserMenu: () => void
}

export default function MenuSetting({ anchorElUser, handleCloseUserMenu }: MenuSettingProps) {
    const { t, i18n } = useTranslation()
    const { colorScheme, setColorScheme } = useColorScheme()
    const currentPathname = usePathname()
    const router = useRouter()
    const message = useMessage()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)

    const handleLogout = async () => {
        const result = await logout();
        if (result.status == "success") {
            message.showMessage("Đăng xuất thành công", "success");
            dispatch(setUser(null))
            router.push("/login");
        }
    }

    return (
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {user._id && (
                <div
                    style={{
                        margin: "5px 10px",
                        paddingBottom: "10px",
                        borderBottom: colorScheme == "dark" ? "2px solid #3f3f3f" : "2px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        minWidth: "300px"
                    }}
                >
                    <Avatar alt="" src={
                        user.avatar != "dfAvatar.jpg"
                            ? user.avatar
                            : `${process.env.NEXT_PUBLIC_NEXTSERVER_DOMAIN}/images/${user.avatar}`
                    } />
                    <div style={{ marginLeft: "5px" }}>
                        <p>{user.fullName}</p>
                        <p style={{ display: "flex", alignItems: "center" }}>
                            Số dư: {new Intl.NumberFormat().format(user.money)}đ
                        </p>
                    </div>
                </div>
            )}


            {user?._id != "" ? (
                [
                    <MenuItem style={{ display: "flex", justifyContent: "space-between" }} key="language" onClick={() => changeLocale(i18n.language, currentPathname, router)}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <LanguageIcon style={{ marginRight: "5px" }} />
                            <span>{t('Language')}:</span>
                        </div>
                        <span>{t(i18n.language)}</span>
                    </MenuItem>,
                    <MenuItem style={{ display: "flex", justifyContent: "space-between" }} key="mode" onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {colorScheme == "dark" ? <DarkModeIcon style={{ marginRight: "5px" }} /> : <LightModeIcon style={{ marginRight: "5px" }} />}
                            <span>{t('Mode')}:</span>
                        </div>
                        <span>{t(colorScheme || "System")}</span>
                    </MenuItem>,
                    <MenuItem key="statistic">
                        <StackedLineChartIcon style={{ marginRight: "5px" }} />
                        <Typography>{t("Statistic")}</Typography>
                    </MenuItem>,
                    <MenuItem key="deposit">
                        <AddBusinessIcon style={{ marginRight: "5px" }} />
                        <Typography>{t('Deposit')}</Typography>
                    </MenuItem>,
                    <MenuItem key="logout" onClick={handleLogout}>
                        <LogoutIcon style={{ marginRight: "5px" }} />
                        <Typography>{t('Logout')}</Typography>
                    </MenuItem>
                ]
            ) : (
                [
                    <MenuItem key="login" onClick={() => router.push("/login")}>
                        <Typography>{t("Login")}</Typography>
                    </MenuItem>,
                    <MenuItem key="register" onClick={() => router.push("/register")}>
                        <Typography>{t('Register')}</Typography>
                    </MenuItem>
                ]
            )}
        </Menu>
    );
}