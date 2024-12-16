import { Avatar, Box } from "@mui/material"
import Link from "next/link"
import CreatedAt from "./CreatedAt"
import PostAction from "./PostAction"
import BtnMore from "./PostMenu"
import { TResponse } from "@/types/response"
import { TPost } from "@/types/post"

export default function Post({
    result, decodedToken, formattedPrice, listFavor
}: {
    result: TResponse<TPost>,
    decodedToken: any,
    formattedPrice: string,
    listFavor: any
}) {
    return (
        <>
            {result.data?.user?._id == decodedToken?._id && <BtnMore post={result.data} />}
            <Box>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Link href={`/profile/${result.data?.user?.slug}`}>
                        <Avatar alt="" src={
                            result.data?.user?.avatar != "dfAvatar.jpg"
                                ? result.data.user.avatar
                                : `${process.env.NEXT_PUBLIC_NEXTSERVER_DOMAIN}/images/${result.data.user.avatar}`
                        } />
                    </Link>
                    <div>
                        <Link href={`/profile/${result.data?.user?.slug}`}>
                            <b>{result.data?.user?.fullName}</b>
                        </Link>
                        <CreatedAt createdAt={result.data?.createdAt} />
                    </div>
                </div>
                <div style={{ padding: "5px 15px" }}>
                    <b style={{ fontSize: "20px" }}>{result.data?.title}</b>
                    <p>{result.data?.description}</p>
                </div>
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
                        style={{ maxHeight: "350px", width: "100%" }}
                        className="object-contain"
                        src={result.data?.watermark}
                        alt=""
                    />
                </div>
                <PostAction price={formattedPrice} post={result.data} listFavor={listFavor} />
            </Box>
        </>
    )
}