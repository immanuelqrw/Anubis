import * as yaml from 'js-yaml'

import {BingoBoard} from "services/BingoBoard"
import {Entry} from "services/Entry"
import {Goal} from "services/Goal"


export class GoalConverterService {

  static parseBingoYAML(file: string): BingoBoard {
    const bingo: Entry[] = this.loadBingoYAML(file)

    return this.buildBingoBoard(bingo)
  }

  static writeBingoYAML(bingoBoard: BingoBoard): string {
    const entries: Entry[] = bingoBoard.flatMap((goals: Goal[], index: number) => {
      return goals.map((goal: Goal) => {
        return {
          difficulty: index,
          name: goal.name,
          types: goal.types
        }
      })
    })

    return yaml.safeDump(entries)
  }

  static loadBingoYAML(file: string): Entry[] {
    return yaml.safeLoad(file)
  }

  static buildBingoBoard(entries: Entry[]): BingoBoard {
    const bingoGoals: BingoBoard = []
    entries.forEach((entry: Entry) => {
      const difficulty: number = entry.difficulty
      const goal: Goal = {
        name: entry.name,
        types: entry.types
      }

      if (bingoGoals[difficulty] === undefined) {
        bingoGoals[difficulty] = [goal]
      } else {
        bingoGoals[difficulty].push(goal)
      }
    })

    return bingoGoals

  }

}
