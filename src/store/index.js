import {configureStore} from "@reduxjs/toolkit";
import tableReducer from './table-slice'


const store = configureStore({
    reducer: {
        table: tableReducer
    }
})

export default store