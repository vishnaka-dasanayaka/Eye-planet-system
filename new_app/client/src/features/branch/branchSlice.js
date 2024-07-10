import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addBranch, getBranches } from "../../apis/branchAPIs";

const initialState = {
    branch: null,
    isError: null,
    isLoading: null,
    isSuccess: null,
    message: ""
}

// get branches
export const getBranchesForRedux = createAsyncThunk('branch/get-branches', async (token, thunkAPI) => {
    try {
        const response = await getBranches(token);
        return response

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.mesage) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const setBranchesViaRedux = createAsyncThunk('branch/set-branches', async (token, data, thunkAPI) => {
    try {

        const response = await addBranch(token, data);
        return response
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.mesage) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
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
                state.branch = action.payload
            })

            .addCase(setBranchesViaRedux.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
            })
    }
})

export const { reset } = branchSlice.actions
export default branchSlice.reducer