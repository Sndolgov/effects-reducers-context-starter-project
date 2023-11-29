import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    collapsed: true
}

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setCollapse(state, action) {
            state.collapsed = action.payload
        }
    }
})

export const tableActions = tableSlice.actions
export default tableSlice.reducer