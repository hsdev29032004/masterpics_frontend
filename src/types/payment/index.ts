export type TListPayment = [TPayment]

export type TPayment = {
    _id: string,
    buyer: string,
    seller: string,
    post: string,
    price: number,
    image: string,
    createdAt: string,
    updatedAt: string,
}