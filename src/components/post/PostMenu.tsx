"use client"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';
import ModalEditPost from './ModalEdit';
import { TPost } from '@/types/post';
import { useTranslation } from 'react-i18next';
import ModalDeletePost from './ModalDelete';

export default function BtnMore({ post }: { post: TPost }) {
    const { t } = useTranslation()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreHorizIcon/>
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <ModalEditPost post={post} />
                <ModalDeletePost post={post} />
            </Menu>
        </div>
    )
}