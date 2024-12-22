"use client"
import Post from "@/app/[locale]/(client)/post/components/Post"
import { formatNumber2 } from "@/helpers/formatNumber"
import { TListPost, TPost } from "@/types/post"
import { Grid } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import { getListPost } from "@/services/post"
import PostSkeleton from "@/app/[locale]/(client)/post/components/Skeleton"

export default function Home({
    data,
    decodedToken,
    listFavor
}: {
    data: TListPost
    decodedToken: any,
    listFavor: any
}) {
    const [totalPage, setTotalPage] = useState<number>(data.totalPage)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

    const postsRef = useRef<TPost[]>(data.posts)

    const loadMorePosts = async () => {
        if (loading || currentPage >= totalPage) return
        setLoading(true)
        const nextPage = currentPage + 1
        const result = await getListPost(nextPage)

        postsRef.current = [...postsRef.current, ...result.data.posts]

        setCurrentPage(nextPage)
        setLoading(false)
    }

    const handleScroll = () => {
        const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - document.documentElement.scrollTop
        const threshold = 150

        if (distanceFromBottom <= threshold && !loading && currentPage < totalPage) {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }

            const newTimeoutId = setTimeout(() => {
                loadMorePosts()
            }, 200)

            setTimeoutId(newTimeoutId)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [currentPage, loading, totalPage, timeoutId])

    return (
        <>
            {postsRef.current.map((value, key) => {
                const formattedPrice = formatNumber2(value.price)
                return (
                    <Grid
                        sx={{
                            borderRadius: { xs: "0px", sm: "10px" },
                            padding: "10px",
                            position: "relative",
                            mb: "5px"
                        }}
                        xs={12}
                        item
                        className="break-word bg-second"
                        key={value._id}
                    >
                        <Post result={value} decodedToken={decodedToken} formattedPrice={formattedPrice} listFavor={listFavor} />
                    </Grid>
                )
            })}

            {currentPage !== totalPage && !loading && (
                <Grid xs={12}>
                    <PostSkeleton />
                </Grid>
            )}
        </>
    )
}
