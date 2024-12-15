import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { TPost } from '@/types/post';
import { useTranslation } from 'react-i18next';
import { Button, MenuItem, TextField } from '@mui/material';
import useMessage from '@/hooks/useMessage';
import { useRouter } from 'next/navigation';
import { editPost } from '@/services/post';
import EditIcon from '@mui/icons-material/Edit';

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

export default function ModalEditPost({ post }: { post: TPost }) {
    const message = useMessage()
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setFormData({
            title: post.title,
            description: post.description,
            watermark: post.watermark,
            price: post.price
        })
    }
    const { t } = useTranslation()

    const [formData, setFormData] = useState({
        title: post.title,
        description: post.description,
        watermark: post.watermark,
        price: post.price
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = await editPost(post._id, { title: formData.title, description: formData.description, price: formData.price })
        if (result.status == "success") {
            router.refresh()
        } else {
            message.showMessage(result.message, "error")
        }
    }

    return (
        <>
            <MenuItem onClick={handleOpen}>
                <EditIcon style={{ marginRight: "10px" }} />
                <p>{t('Edit')}</p>
            </MenuItem>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ textAlign: "center" }} id="modal-modal-title" variant="h6" component="h2">
                        {t('Edit')}
                    </Typography>
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
                            label={t('Title')}
                            name="title"
                            type="text"
                            value={formData.title}
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
                            label={t('Description')}
                            name="description"
                            type="text"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            required
                            multiline
                            rows={4}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label={t('Price')}
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ marginTop: "10px" }}
                        />

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

                        <Button style={{ marginTop: "10px" }} fullWidth type="submit" variant="contained" color="error">
                            {t('Edit')}
                        </Button>
                        <Button style={{ marginTop: "10px" }} fullWidth onClick={handleClose} variant="contained" color="primary">
                            {t('Cancel')}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}