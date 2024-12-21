import { TListPayment } from "@/types/payment";
import { Button } from "@mui/material";

export default function PurchasedCard({ purchasedPic }: { purchasedPic: TListPayment | undefined }) {
    const hasPurchasedPics = Array.isArray(purchasedPic) && purchasedPic.length > 0

    return (
        <div className='bg-second bought'>
            <b style={{ textAlign: "center", display: "block" }}>Ảnh đã mua</b>
            <div
                style={{ display: "flex", flexWrap: "wrap", gap: "2" }}
            >
                {hasPurchasedPics ? (
                    purchasedPic.slice(0, 9).map((item) => (
                        <>
                            <div
                                key={item._id}
                                style={{
                                    width: "33.333%",
                                    padding: "3px"
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        aspectRatio: "1/1",
                                        overflow: "hidden",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                            </div>
                        </>
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
                    Xem tất cả ảnh đã mua
                </Button>
            </div>
        </div>
    )
}