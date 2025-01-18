import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addBranch, getBranches } from "../../apis/branchAPIs";

const initialState = {
    branch: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

// get branches
export const getBranchesForRedux = createAsyncThunk('branch/get-branches', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const response = await getBranches(token);
        return response.data

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.mesage) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const setBranchesViaRedux = createAsyncThunk('branch/set-branches', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const response = await addBranch(data, token);
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.mesage) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const clearData = createAsyncThunk('branch/clear-branch', async (_, thunkAPI) => { return true })

export const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        reset: (state) => initialState
    },

    extraReducers: (builder) => {
        builder
            .addCase(getBranchesForRedux.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBranchesForRedux.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.branch = action.payload
            })
            .addCase(getBranchesForRedux.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.branch = null
            })
            .addCase(setBranchesViaRedux.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setBranchesViaRedux.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.branch.push(action.payload)
            })
            .addCase(setBranchesViaRedux.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(clearData.fulfilled, (state) =>
                initialState
            )
    }
})

export const { reset } = branchSlice.actions
export default branchSlice.reducer