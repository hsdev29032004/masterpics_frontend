import BtnMore from "@/components/post/PostMenu";
import CreatedAt from "@/components/post/CreatedAt"
import PostAction from "@/components/post/PostAction";
import { getDetailPostBySlug } from "@/services/post"
import { Avatar, Box, Grid } from "@mui/material"
import { cookies } from "next/headers";
import Link from "next/link";
import { getListFavorite } from "@/services/favorite";
import jwt, { JwtPayload } from "jsonwebtoken"

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const result = await getDetailPostBySlug(params.slug)
    if (!result.data) {
        return {
            title: "404 - Not Found",
            description: "Bài viết không tồn tại."
        };
    }

    return {
        title: result.data?.title,
        description: result.data.description || "Chi tiết bài viết",
    }
}

export default async function DetailPost({ params }: { params: { slug: string } }) {
    const result = await getDetailPostBySlug(params.slug)
    const formattedPrice = new Intl.NumberFormat().format(result.data?.price)
    if (!result.data) return <>404</>

    const cookieStore = cookies()
    const token = cookieStore.get("access_token")?.value
    let decodedToken: any
    let listFavor: any = undefined

    if (token) {
        try {
            decodedToken = jwt.decode(token) as JwtPayload | null
            const result = await getListFavorite(token)
            listFavor = result.data
        } catch (error) {
            console.error("Token invalid:", error)
        }
    }

    return (
        <div style={{ marginTop: "80px" }}>
            <Grid container>
                <Grid xl={3} lg={2} md={2} sm={1} xs={0} />

                <Grid
                    sx={{
                        borderRadius: { xs: "0px", sm: "10px" },
                        padding: "10px",
                        position: "relative"
                    }} 
                    xl={6} lg={8} md={8} sm={10} xs={12}
                    className="break-word bg-second"
                >
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
                </Grid>

                <Grid xl={3} lg={2} md={2} sm={1} xs={0} />
            </Grid>
        </div>
    )
}
