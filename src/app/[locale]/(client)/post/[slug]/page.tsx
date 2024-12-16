import { getDetailPostBySlug } from "@/services/post"
import Detail from "@/views/detail/Detail";

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
    return (
        <Detail params={params}/>
    )
}
