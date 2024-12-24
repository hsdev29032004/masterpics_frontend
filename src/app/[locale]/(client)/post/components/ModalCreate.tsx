import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, CircularProgress, Input, TextField } from '@mui/material';
import useMessage from '@/hooks/useMessage';
import { createPost } from '@/services/post';
import { useRouter } from 'next/navigation';

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

export default function ModalCreatePost({ avatar }: { avatar: string }) {
    const message = useMessage()
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setFormData({
            title: "",
            description: "",
            price: 0
        })

        setFile(null)
    }
    const { t } = useTranslation()
    const [file, setFile] = useState<null | File>(null)

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFile(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!file) {
            return message.showMessage("Chưa đăng tải ảnh", "error")
        }

        if (formData.price < 0) {
            return message.showMessage("Giá phải lớn hơn 0", "error")
        }

        const data: FormData = new FormData()
        data.append('title', formData.title)
        data.append('description', formData.description)
        data.append('price', formData.price.toString())
        data.append('image', file)

        setLoading(true)
        const result = await createPost(data)

        if (result.status == "success") {
            setLoading(false)
            handleClose()
            router.refresh()
        } else {
            setLoading(false)
            message.showMessage(result.message, result.status)
        }
    }

    return (
        <>
            <div
                className="bg-second"
                style={{
                    display: "flex",
                    padding: "5px 20px",
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
                onClick={handleOpen}
            >
                <Avatar src={avatar} alt="" />
                <Input
                    className='bg-second'
                    sx={{
                        padding: "2px 10px",
                        marginLeft: "10px",
                        cursor: "pointer"
                    }}
                    fullWidth
                    disableUnderline
                    placeholder={t('Click to create post')}
                />
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ textAlign: "center" }} id="modal-modal-title" variant="h6" component="h2">
                        {t('Create')}
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
                                style={{ cursor: "pointer", maxHeight: "170px", width: "100%" }}
                                className="object-contain"
                                src={file ? URL.createObjectURL(file) : "/images/empty-image.jpg"}
                                alt=""
                                onClick={() => document.getElementById('avatar-upload')?.click()}
                            />
                            <input
                                type="file"
                                id="avatar-upload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>

                        <Button style={{ marginTop: "10px" }} fullWidth onClick={handleClose} variant="contained" color="error">
                            {t('Cancel')}
                        </Button>
                        <Button style={{ marginTop: "10px" }} fullWidth type="submit" variant="contained" color="primary">
                            {loading ? <CircularProgress size={25} sx={{ color: "green" }} /> : t('Create')}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}