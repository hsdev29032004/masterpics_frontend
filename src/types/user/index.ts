export type TUser = {
    _id: string;
    email: string;
    fullName: string;
    money: number;
    type: "SYSTEM" | "GOOGLE";
    avatar: string;
    banned: boolean;
    quantityFollow: number;
    role: {
        _id: string;
        name: string;
        permissions: string[];
        description: string;
        canDelete: false
    };
    createdAt: string;
    updatedAt: string;
    slug: string;
}