import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @ts-ignore
import React, {Component} from "react";

import {UploadFileComponent} from "@components/UploadFileComponent"
import {DownloadFileComponent} from "@components/DownloadFileComponent";
import DraggableBingoTable from "@components/DraggableBingoTable";

interface Props {
  classes: any;
  location: any;
}

interface State {
}

export class BingoTaskViewer extends Component<Props, State> {
  refs: any;

  render() {
    const { classes, ...rest } = this.props;
    return (
      <>
        <div>
          <UploadFileComponent/>
          <DownloadFileComponent/>
        </div>
        <DraggableBingoTable/>
      </>
    );
  }
}
