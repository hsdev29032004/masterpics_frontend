"use client"
import { useState } from "react";
import { Avatar, Box } from "@mui/material";
import Link from "next/link";
import CreatedAt from "./CreatedAt";
import PostAction from "./PostAction";
import BtnMore from "./PostMenu";
import { TPost } from "@/types/post";
import ShowPic from "../../../../../components/dialog/ShowPic";

export default function Post({
    result,
    decodedToken,
    formattedPrice,
    listFavor,
}: {
    result: TPost;
    decodedToken: any;
    formattedPrice: string;
    listFavor: any;
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    return (
        <>
            {result?.user?._id == decodedToken?._id && <BtnMore post={result} />}
            <Box sx={{ marginBottom: "5px" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Link href={`/profile/${result?.user?.slug}`}>
                        <Avatar
                            alt=""
                            src={
                                result?.user?.avatar !== "dfAvatar.jpg"
                                    ? result.user.avatar
                                    : `/images/${result.user.avatar}`
                            }
                        />
                    </Link>
                    <div>
                        <Link href={`/profile/${result?.user?.slug}`}>
                            <b>{result?.user?.fullName}</b>
                        </Link>
                        <CreatedAt time={result.createdAt} />
                    </div>
                </div>
                <div style={{ padding: "5px 5px" }}>
                    <b style={{ fontSize: "20px" }}>{result?.title}</b>
                    <p>{result?.description}</p>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "5px 0",
                        cursor: "pointer",
                    }}
                    className="bg-main"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <img
                        style={{ maxHeight: "450px", width: "100%" }}
                        className="object-contain"
                        src={result?.watermark}
                        alt="Preview"
                    />
                </div>
                <PostAction
                    price={formattedPrice}
                    post={result}
                    listFavor={listFavor}
                />
            </Box>

            <ShowPic image={result?.watermark} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>
        </>
    )
}
