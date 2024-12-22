import { Metadata } from 'next';
import Home from '@/views/home/Home';
import { getListPost } from '@/services/post';
import { getListFavorite } from '@/services/favorite';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import { Grid } from '@mui/material';
import { getPurchased } from '@/services/payment';
import { TListPayment } from '@/types/payment';
import PurchasedCard from '@/app/[locale]/(client)/(home)/components/PurchasedCard';

export const metadata: Metadata = {
    title: "Master Pics - Home",
    description: "Đăng nhập hệ thống Master Pics!",
}

export default async function HomePage() {
    const cookieStore = cookies()
    const token = cookieStore.get("access_token")?.value
    let decodedToken: any
    let listFavor: any = undefined
    let purchasedPic: TListPayment | undefined = undefined

    if (token) {
        try {
            decodedToken = jwt.decode(token) as JwtPayload | null
            const result1 = await getListFavorite(token)
            listFavor = result1.data

            const result2 = await getPurchased(token)
            purchasedPic = result2.data
        } catch (error) {
            console.error("Token invalid:", error)
        }
    }

    const result = await getListPost(1)

    return (
        <div
            style={{
                marginTop: "70px",
            }}
            className='container'
        >
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xl={8} lg={8} md={8} sm={12} xs={12}
                    order={{ xs: 2, sm: 2, md: 1, lg: 1, xl: 1 }}
                    container
                >
                    <Home
                        data={result.data}
                        listFavor={listFavor}
                        decodedToken={decodedToken}
                    />
                </Grid>

                <Grid
                    item
                    order={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
                    xl={4} lg={4} md={4} sm={12} xs={12}
                >
                    <PurchasedCard purchasedPic={purchasedPic}/>
                </Grid>
            </Grid>
        </div>
    )
}
