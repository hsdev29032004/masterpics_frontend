import { Input } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function InputSearch(){
    const { t } = useTranslation()
    return (
        <Input 
            className='bg-main' 
            style={{
                marginLeft: "5px", 
                borderRadius: "20px",
                padding: "2px 10px"
            }}
            disableUnderline 
            placeholder={t('Enterkeyword')}
        />
    )
}