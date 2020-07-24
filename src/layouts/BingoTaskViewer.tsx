import 'perfect-scrollbar/css/perfect-scrollbar.css'
import {Entry} from "@services/Entry"
import {TaskViewerState} from "@utils/taskViewerState"
import React, {Component} from "react"

import {UploadFileComponent} from "@components/UploadFileComponent"
import {DownloadFileComponent} from "@components/DownloadFileComponent"
import DraggableBingoTable from "@components/DraggableBingoTable"

interface Props {
  classes: any
  location: any
}

export class BingoTaskViewer extends Component<Props, TaskViewerState> {
  refs: any

  render() {
    const { classes, ...rest } = this.props
    return (
      <>
        <div>
          <UploadFileComponent/>
          <DownloadFileComponent/>
        </div>
        <DraggableBingoTable/>
      </>
    )
  }
}
