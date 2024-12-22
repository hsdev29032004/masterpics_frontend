import useMessage from '@/hooks/useMessage';
import { buy } from '@/services/payment';
import { TPost } from '@/types/post';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

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

export default function ModalBuy({ price, post }: { price: string, post: TPost }) {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)
    const message = useMessage()
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await buy(post._id, dispatch)
        message.showMessage(result.message, result.status)
        
    }

    return (
        <>
            <div onClick={handleOpen} style={{ display: "flex", alignItems: "center" }}>
                <ShoppingCartIcon sx={{ fontSize: "25px" }} />
                <p>{price}đ</p>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ textAlign: "center" }} id="modal-modal-title" variant="h6" component="h2">
                        {`${t('Titlemodalbuypost')} ${price}đ`}
                    </Typography>
                    <Typography sx={{ textAlign: "center", fontSize: "12px" }} id="modal-modal-title" variant="h6" component="h2">
                        {`${t('Descriptionmodalbuypost')}`}
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
                        <Button style={{ marginTop: "10px" }} type="submit" variant="contained" color="primary">
                            {t('Purchase')}
                        </Button>
                        <Button style={{ marginTop: "10px" }} onClick={handleClose} variant="contained" color="error">
                            {t('Cancel')}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}