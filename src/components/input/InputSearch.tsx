import { Input } from "@mui/material";

export default function InputSearch(){
    return (
        <Input 
            className='bg-main' 
            style={{
                marginLeft: "5px", 
                borderRadius: "20px",
                padding: "2px 10px"
            }}
            disableUnderline 
            placeholder="Nhập từ khóa"
        />
    )
}