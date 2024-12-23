export type TListPost = {
    posts: [TPost],
    totalPage: 1
}

export type TPost = {
    _id: string,
    title: string,
    price: number,
    description: string,
    watermark: string,
    quantityBuy: number,
    deleted: boolean,
    createdAt: string | [number, string],
    updatedAt: string,
    slug: string,
    user: {
        _id: string,
        avatar: string,
        fullName: string,
        slug: string
    }
}

export type TEditPost = {
    title: string,
    description: string,
    price: number
}

export type TCreatePost = TEditPost & {
    image: File
}