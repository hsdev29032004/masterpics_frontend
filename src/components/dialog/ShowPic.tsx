import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { TPost } from "@/types/post";

export default function ShowPic({
    image, 
    isDialogOpen,
    setIsDialogOpen
}: {
    image: string,
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <Dialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            fullScreen
            sx={{
                "& .MuiDialog-paper": {
                    margin: 0,
                },
            }}
        >
            <DialogContent
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    padding: 0,
                    position: "relative"
                }}
            >
                <CloseIcon
                    className="bg-main"
                    sx={{ position: "absolute", top: "5px", right: "5px", fontSize: "35px", padding: "5px", borderRadius: "50%" }}
                    onClick={() => setIsDialogOpen(false)}
                />
                <img
                    src={image}
                    alt=""
                    style={{
                        width: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}