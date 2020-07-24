import {BingoAction} from "@actions/bingoAction"
import {Action} from "@actions/bingoActionCreators"
import {Entry} from "@services/Entry"

export function bingoViewerReducer(state : Entry[] = [], action: Action) {
  switch (action.type) {
    case BingoAction.ADD_ENTRIES:
      return action.payload.entries
    case BingoAction.ADD_ENTRY:
      return [
        ...state,
        {
          entry: action.payload.entry
        }
      ]
    case BingoAction.REMOVE_ENTRY:
      return state.filter(entry =>
        entry !== action.payload.entry
      )
    case BingoAction.UPDATE_ENTRY:
      return [
        ...state,
        {
          entry: action.payload.entry
        }
      ]
    default:
      return state
  }
}
