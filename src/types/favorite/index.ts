export type TFavorite = [{
    _id: string,
    user: string,
    post: {
        _id: string,
        title: string,
        price: number,
        description: string,
        watermark: string,
        quantityBuy: number,
        deleted: boolean,
        createdAt: string,
        updatedAt: string,
        slug: string,
        user: {
            _id: string,
            fullName: string,
            avatar: string,
            slug: string
        }
    },
}]