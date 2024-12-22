import { useState } from "react";
import ShowPic from "../dialog/ShowPic";

export default function PurchasedPic({ image }: { image: string }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <div
                key={image}
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
                        src={image}
                        alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                        onClick={() => setIsDialogOpen(true)}
                    />
                </div>
            </div>
            <ShowPic image={image} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </>
    )
}