import * as yaml from 'js-yaml'

import {Entry} from "@services/Entry"
import {TaskViewerState} from "@utils/taskViewerState"
import {CSSProperties} from "@material-ui/core/styles/withStyles"
import {Button, Grid} from "@material-ui/core"
import React from "react"
import {useSelector} from "react-redux"

const inputDownloadFile: CSSProperties = {
  display: 'none',
}

const buttonDownloadFile: CSSProperties = {
  margin: 8,
}

export function DownloadFileComponent() {

  const entries: Entry[] = useSelector(
    (state: TaskViewerState) => state.entries
  )

  const downloadTxtFile = () => {
    const file = new Blob([yaml.safeDump(entries)], {type: 'text/yaml'})

    const element = document.createElement("a")
    element.href = URL.createObjectURL(file)
    element.download = "goals.yml"
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
    document.body.removeChild(element)
  }

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <Button component="span" style={buttonDownloadFile} onClick={downloadTxtFile}>
          Download
        </Button>
      </Grid>
    </Grid>
  )

}
