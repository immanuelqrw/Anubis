import {addEntries} from "@actions/bingoActionCreators"
import {BaseSyntheticEvent, ChangeEvent} from "react"
import {CSSProperties} from "@material-ui/core/styles/withStyles"
import {Button, Grid} from "@material-ui/core"
import React from "react"
import {GoalConverterService} from "@services/GoalConverterService"
import {BingoBoard} from "@services/BingoBoard"
import {useDispatch, useSelector} from "react-redux"

const inputUploadFile: CSSProperties = {
  display: 'none',
}

const buttonUploadFile: CSSProperties = {
  margin: 8,
}

export function UploadFileComponent() {

  const dispatch = useDispatch()

  // function to read file as binary and return
  const getFileFromInput= (file: File): Promise<any>  => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = reject
      reader.onload = () => { resolve(reader.result) }
      reader.readAsBinaryString(file) // here the file can be read in different way Text, DataUrl, ArrayBuffer
    })
  }

  const manageUploadedFile = (binary: string, file: File) => {

    // do what you need with your file (fetch POST, ect ....)
    const entries = GoalConverterService.loadBingoYAML(binary)
    dispatch(addEntries(entries))

    const bingoGoals: BingoBoard = GoalConverterService.buildBingoBoard(entries)
    console.dir(bingoGoals)
    console.log(`The file size is ${binary.length}`)
    console.log(`The file name is ${file.name}`)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    Array.from(event.target.files!).forEach(file => {
      getFileFromInput(file)
        .then((binary) => {
          manageUploadedFile(binary, file)
        }).catch((reason) => {
        console.log(`Error during upload ${reason}`)
        event.target.value = '' // to allow upload of same file if error occurs
      })
    })
  }

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <input accept=".yml,.yaml" style={inputUploadFile} id="file"
               multiple={false}
               type="file"
               onChange={handleFileChange}/>
        <label htmlFor="file">
          {/* // @ts-ignore */}
          <Button component="span" style={buttonUploadFile} onClick={(e: BaseSyntheticEvent) => e.stopPropagation()}>
            Upload
          </Button>
        </label>
      </Grid>
    </Grid>
  )

}
