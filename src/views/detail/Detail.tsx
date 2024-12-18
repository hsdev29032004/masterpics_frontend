import { getDetailPostBySlug } from "@/services/post";
import { Grid } from "@mui/material";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken"
import { getListFavorite } from "@/services/favorite";
import Post from "@/components/post/Post";

export default async function Detail({params}: {params: {slug: string}}) {
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
                    <Post result={result} formattedPrice={formattedPrice} decodedToken={decodedToken} listFavor={listFavor}/>
                </Grid>

                <Grid xl={3} lg={2} md={2} sm={1} xs={0} />
            </Grid>
        </div>
    )
}