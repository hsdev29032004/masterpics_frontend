"use client"
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useColorScheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { TFavorite } from '@/types/favorite';
import { getListFavorite, likePost } from '@/services/favorite';
import { copy } from '@/helpers/copy';
import useMessage from '@/hooks/useMessage';

export default function PostAction({ price, idPost, slug, listFavor }: { price: number, idPost: string, slug: string, listFavor?: TFavorite }) {
    const { colorScheme } = useColorScheme()

    const [mount, setMound] = useState<boolean>(false)
    const [liked, setLiked] = useState<boolean>(false)
    const [favorites, setFavorites] = useState<TFavorite | undefined | null>(listFavor)
    const message = useMessage()

    const fetchFavor = async () => {
        const result = await getListFavorite()
        setFavorites(result.data)
    }

    useEffect(() => {
        if (favorites?.some(favor => favor.post?._id === idPost)) {
            setLiked(true);
        }
    }, [favorites])

    useEffect(() => {
        if (!favorites) {
            fetchFavor()
        }
        setMound(true)
    }, [])

    const handleLike = async () => {
        setLiked(prev => !prev)
        await likePost(idPost)
    }

    const handleShare = async () => {
        copy(`${process.env.NEXT_PUBLIC_NEXTSERVER_URL}/post/${slug}`, message)
    }

    if (!mount) return null

    return (
        <div
            style={{
                borderTop: colorScheme == "dark" ? "2px solid #3f3f3f" : "2px solid #ddd",
                marginTop: "10px",
                alignItems: "center",
                padding: "7px 20px",
                paddingBottom: "0px",
                display: "flex",
                justifyContent: "space-between",
            }}
            className='post-action'
        >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {
                    liked
                        ? <FavoriteIcon onClick={handleLike} style={{ color: "red" }} sx={{ fontSize: "30px" }} />
                        : <FavoriteBorderOutlinedIcon onClick={handleLike} sx={{ fontSize: "30px" }} />
                }
                <ShareIcon
                    onClick={handleShare}
                    sx={{ fontSize: "30px" }}
                />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <ShoppingCartIcon sx={{ fontSize: "25px" }} />
                <p>{new Intl.NumberFormat().format(price)}đ</p>
            </div>
        </div>
    )
}