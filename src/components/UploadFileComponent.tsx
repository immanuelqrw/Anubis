import {BaseSyntheticEvent, ChangeEvent, Component} from "react"
import {CSSProperties} from "@material-ui/core/styles/withStyles"
import {Button, Grid} from "@material-ui/core"
import React from "react"
import {GoalConverterService} from "@services/GoalConverterService"
import {BingoBoard} from "@services/BingoBoard"

const inputUploadFile: CSSProperties = {
  display: 'none',
}

const buttonUploadFile: CSSProperties = {
  margin: 8,
}

// component own props
interface UploadFileOwnProps { }

// component props
interface UploadFileProps extends UploadFileOwnProps { }

// component State
interface UploadFileStateProps { }

export class UploadFileComponent extends Component<UploadFileProps, UploadFileStateProps>  {

  // function to read file as binary and return
  private static getFileFromInput(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = reject
      reader.onload = () => { resolve(reader.result) }
      reader.readAsBinaryString(file) // here the file can be read in different way Text, DataUrl, ArrayBuffer
    })
  }

  private static manageUploadedFile(binary: string, file: File) {
    // do what you need with your file (fetch POST, ect ....)
    const bingoGoals: BingoBoard = GoalConverterService.parseBingoYAML(binary)
    console.dir(bingoGoals)
    console.log(`The file size is ${binary.length}`)
    console.log(`The file name is ${file.name}`)
  }

  private handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    event.persist()
    Array.from(event.target.files!).forEach(file => {
      UploadFileComponent.getFileFromInput(file)
        .then((binary) => {
          UploadFileComponent.manageUploadedFile(binary, file)
        }).catch((reason) => {
        console.log(`Error during upload ${reason}`)
        event.target.value = '' // to allow upload of same file if error occurs
      })
    })
  }

  // Multiple is false due to allowing only one file at a time
  public render(): JSX.Element {
    return (
      <Grid container={true}>
        <Grid item={true} xs={12}>
          <input accept=".yml,.yaml" style={inputUploadFile} id="file"
                 multiple={false}
                 type="file"
                 onChange={this.handleFileChange}/>
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
}
