import {configureStore} from "@reduxjs/toolkit";
import tableReducer from './table-slice'
import dataReducer from './data-slice'


const store = configureStore({
    reducer: {
        table: tableReducer,
        data: dataReducer,
    }
})

export default store