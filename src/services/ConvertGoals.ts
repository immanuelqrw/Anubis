import * as fs from "fs"
import * as glob from "glob"
import * as path from "path"
import {BingoBoard} from "@services/BingoBoard"
import {GoalConverterService} from "@services/GoalConverterService"
import {Bingo} from "@services/Bingo"

export function convertGoals(directoryPath: string) {
  const filenames: string[] = glob.sync(`${directoryPath}/*.yml`)

  filenames.forEach((filename) => {
    const bingoName: string = path.parse(filename).name
    console.log(bingoName)

    const {board, rules, tips} = convertYAMLToBingo(bingoName, filename)

    const TEMPLATE = `${board}\n${rules}\n${tips}`
    fs.writeFileSync(`../../assets/goals/${bingoName}.js`, TEMPLATE)
  })
}

export function convertYAMLToBingo(bingoName: string, filename: string, encoding: string = "utf8"): Bingo {
  const bingoBoard: BingoBoard = GoalConverterService.parseBingoYAML(filename)
  const BINGO_BOARD: string = `var bingoList = ${JSON.stringify(bingoBoard)};`

  const rulesFile: string = `${bingoName}.rules.html`
  let RULES: string = ""
  if (fs.existsSync(rulesFile)) {
    RULES = fs.readFileSync(rulesFile, encoding)
  }

  const tipsFile: string = `${bingoName}.tips.html`
  let TIPS: string = ""
  if (fs.existsSync(tipsFile)) {
    TIPS = fs.readFileSync(tipsFile, encoding)
  }

  const RULES_ENTRY: string = `var bingoRules = "${RULES}";`
  const TIPS_ENTRY: string = `var bingoTips = "${TIPS}";`

  return {
    board: BINGO_BOARD,
    rules: RULES_ENTRY,
    tips: TIPS_ENTRY
  }
}
