import {bingoViewerReducer} from "@reducers/bingoViewerReducer"
import { combineReducers } from "redux"

export const rootReducer = combineReducers({
  entries: bingoViewerReducer
})
