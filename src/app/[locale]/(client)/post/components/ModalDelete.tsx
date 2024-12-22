import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { TPost } from '@/types/post';
import { useTranslation } from 'react-i18next';
import { Button, MenuItem } from '@mui/material';
import useMessage from '@/hooks/useMessage';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePost } from '@/services/post';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ModalDeletePost({ post }: { post: TPost }) {
    const message = useMessage()
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)
    const { t } = useTranslation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await deletePost(post._id)
        message.showMessage(result.message, result.status)

        handleClose()
    }

    return (
        <>
            <MenuItem onClick={handleOpen}>
                <DeleteIcon style={{ marginRight: "10px" }} />
                <p>{t('Delete')}</p>
            </MenuItem>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ textAlign: "center" }} id="modal-modal-title" variant="h6" component="h2">
                        {t('Areyousuretodelete')}
                    </Typography>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "5px 0"
                        }}
                        className="bg-main"
                    >
                        <img
                            style={{ maxHeight: "170px", width: "100%" }}
                            className="object-contain"
                            src={post.watermark}
                            alt=""
                        />
                    </div>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            minWidth: "350px"
                        }}
                    >
                        <Button style={{ marginTop: "10px" }} type="submit" variant="contained" color="error">
                            {t('Delete')}
                        </Button>
                        <Button style={{ marginTop: "10px" }} onClick={handleClose} variant="contained" color="primary">
                            {t('Cancel')}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}