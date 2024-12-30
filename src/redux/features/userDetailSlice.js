import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    users: [],
    loading: false,
    error: null,
    searchData: ''
}

const userDetailSlice = createSlice({
    name: 'userdetails',
    initialState: initialState,
    reducers: {
        searchPost: (state, action) => {
            state.searchData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(readUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(readUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(readUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.users = state.users.filter(user => user.id !== id);
                }
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((user => (
                    user.id === action.payload.id ? action.payload : user
                )))
                // state.users.push(action.payload);
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default userDetailSlice.reducer;
export const { searchPost } = userDetailSlice.actions;

//create user action
export const createUser = createAsyncThunk('create/user', async (data, { rejectWithValue }) => {
    const response = await fetch('https://673b3bbb339a4ce4451b41e7.mockapi.io/crud', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});

//read user action
export const readUser = createAsyncThunk('read/user', async () => {
    const response = await fetch('https://673b3bbb339a4ce4451b41e7.mockapi.io/crud');
    const result = await response.json();
    return result;
})

//delete user action
export const deleteUser = createAsyncThunk('delete/user', async (id, { rejectWithValue }) => {
    const response = await fetch(`https://673b3bbb339a4ce4451b41e7.mockapi.io/crud/${id}`, {
        method: 'DELETE'
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

//update user action
export const updateUser = createAsyncThunk('update/user', async (data, { rejectWithValue }) => {
    const response = await fetch(`https://673b3bbb339a4ce4451b41e7.mockapi.io/crud/${data.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});


