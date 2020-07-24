import {BingoAction} from "@actions/bingoAction"
import {Entry} from "@services/Entry"

export interface Payload {
  entry?: Entry
  entries?: Entry[]
}

export interface Action {
  type: BingoAction
  payload: Payload
}

export function addEntries(entries: Entry[]): Action {
  return {
    type: BingoAction.ADD_ENTRIES,
    payload: {
      entries
    }
  } as const
}

export function addEntry(entry: Entry): Action {
  return {
    type: BingoAction.ADD_ENTRY,
    payload: {
      entry
    }
  } as const
}

export function removeEntry(entry: Entry): Action {
  return {
    type: BingoAction.REMOVE_ENTRY,
    payload: {
      entry
    }
  } as const
}

export function updateEntry(entry: Entry): Action {
  return {
    type: BingoAction.UPDATE_ENTRY,
    payload: {
      entry
    }
  } as const
}
