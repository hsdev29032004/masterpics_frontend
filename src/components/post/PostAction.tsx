"use client"
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useColorScheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { TFavorite } from '@/types/favorite';
import { likePost } from '@/services/favorite';
import { copy } from '@/helpers/copy';
import useMessage from '@/hooks/useMessage';
import { TPost } from '@/types/post';
import { refreshToken } from '@/services/auth';
import ModalBuy from './ModalBuy';

export default function PostAction({ post, listFavor, price }: { post: TPost, listFavor?: TFavorite, price: string }) {
    const { colorScheme } = useColorScheme()
    const [hydratedScheme, setHydratedScheme] = useState<string | undefined>(undefined)
    const [liked, setLiked] = useState<boolean | undefined>(listFavor?.some(favor => favor.post?._id === post._id))
    const message = useMessage()

    useEffect(() => {
        setHydratedScheme(colorScheme)
    }, [colorScheme])

    const handleLike = async () => {
        setLiked(prev => !prev)
        const result1 = await likePost(post._id)
        if(result1.status == "error"){
            const result2 = await refreshToken()
            if(result2.status == "success"){
                await likePost(post._id)
            }else{
                message.showMessage("Bạn chưa đăng nhập", "error")
                setLiked(prev => !prev)
            }
        }
    }

    const handleShare = async () => {
        copy(`${process.env.NEXT_PUBLIC_NEXTSERVER_URL}/post/${post.slug}`, message)
    }

    return (
        <div
            style={{
                borderTop: hydratedScheme === "dark" ? "2px solid #3f3f3f" : "2px solid #ddd",
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
            <ModalBuy price={price} post={post}/>
        </div>
    )
}