import CreatedAt from "@/components/post/CreatedAt"
import PostAction from "@/components/post/PostAction";
import { getDetailPostBySlug } from "@/services/post"
import { Avatar, Box, Grid } from "@mui/material"

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
    if (!result.data) return <>404</>

    return (
        <div style={{marginTop: "20px"}}>
            <Grid container>
                <Grid xl={3} lg={2} md={2} sm={1} xs={0} />

                <Grid xl={6} lg={8} md={8} sm={10} xs={12}
                    className="break-word bg-second"
                    sx={{ borderRadius: { xs: "0px", sm: "10px" } }}
                    style={{ padding: "10px" }}
                >
                    <Box>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            <Avatar src={result.data?.user?.fullName} alt="" />
                            <div>
                                <b>{result.data?.user?.fullName}</b>
                                <CreatedAt createdAt={result.data?.createdAt} />
                            </div>
                        </div>
                        <div style={{padding: "5px 15px"}}>
                            <p>{result.data?.description}</p>
                        </div>
                        <div
                            style={{ 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center", 
                                margin: "5px 0" }}
                            className="bg-main"
                        >
                            <img
                                style={{ maxHeight: "350px", width: "100%" }}
                                className="object-contain"
                                src={result.data?.watermark}
                                alt=""
                            />
                        </div>
                        <PostAction price={result.data?.price}/>
                    </Box>
                </Grid>

                <Grid xl={3} lg={2} md={2} sm={1} xs={0} />
            </Grid>
        </div>
    )
}
