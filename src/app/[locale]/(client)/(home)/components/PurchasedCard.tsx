"use client"
import { TListPayment } from "@/types/payment";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import PurchasedPic from "./PurchasePic";

export default function PurchasedCard({ purchasedPic }: { purchasedPic: TListPayment | undefined }) {
    const hasPurchasedPics = Array.isArray(purchasedPic) && purchasedPic.length > 0
    const { t } = useTranslation()

    return (
        <div className='bg-second bought'>
            <b style={{ textAlign: "center", display: "block", fontSize: "25px" }}>{t('Purchasedpics')}</b>
            <div
                style={{ display: "flex", flexWrap: "wrap", gap: "2" }}
            >
                {hasPurchasedPics ? (
                    purchasedPic.slice(0, 9).map((item) => (
                        <PurchasedPic key={item._id} image={item.image}/>
                    ))
                ) : (
                    <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "15px 0" }}>
                        <img
                            src="/svg/empty.svg"
                            alt="Empty"
                            width={130}
                            height={80}
                            style={{ marginBottom: "10px" }}
                        />
                    </div>
                )}
                <Button
                    sx={{ marginTop: "5px" }}
                    fullWidth type="submit"
                    variant="contained"
                    color="primary"
                >
                    {t('Seeallpurchasedpics')}
                </Button>
            </div>
        </div>
    )
}