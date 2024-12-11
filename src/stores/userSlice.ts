import { TUser } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TUser = {
    _id: "",
    email: "",
    fullName: "",
    money: 0,
    type: "SYSTEM",
    avatar: "",
    banned: false,
    quantityFollow: 0,
    role: {
        _id: "",
        name: "",
        permissions: [],
        description: "",
        canDelete: false
    },
    createdAt: "",
    updatedAt: "",
    slug: "",
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_, action: PayloadAction<TUser | null>) => {
            return action.payload || initialState;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
