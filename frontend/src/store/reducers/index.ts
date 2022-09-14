import { combineReducers } from "@reduxjs/toolkit"
import { forumApi } from "../rtk"
import { userSlice } from '../slices/user'

const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [forumApi.reducerPath]: forumApi.reducer
})

export default rootReducer