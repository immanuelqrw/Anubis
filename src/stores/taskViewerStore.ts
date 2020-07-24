import {rootReducer} from "@reducers/rootReducer"
import {TaskViewerState} from "@utils/taskViewerState"
import {createStore, Store} from "redux"

export function configureStore(): Store<TaskViewerState> {
  return createStore(
    rootReducer,
    undefined
  )
}
