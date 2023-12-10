import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    collapsed: true,
    invalidCells: []
}

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setCollapse(state, action) {
            state.collapsed = action.payload
        },
        addInvalidCell(state, action) {
            state.invalidCells.push(`${action.payload}`)
        },
        removeInvalidCell(state, action) {
            const index = state.invalidCells.indexOf(action.payload);
            if (index !== -1) {
                state.invalidCells.splice(index, 1);
            }
        }
    }
})

export const tableActions = tableSlice.actions
export default tableSlice.reducer