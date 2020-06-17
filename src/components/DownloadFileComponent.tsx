import {BaseSyntheticEvent, ChangeEvent, Component} from "react";
import {CSSProperties} from "@material-ui/core/styles/withStyles";
import {Button, Grid} from "@material-ui/core";
import React from "react";
import {GoalConverterService} from "../services/GoalConverterService";
import {BingoBoard} from "../services/BingoBoard";

const inputDownloadFile: CSSProperties = {
  display: 'none',
};

const buttonDownloadFile: CSSProperties = {
  margin: 8,
};

// component own props
interface DownloadFileOwnProps { }

// component props
interface DownloadFileProps extends DownloadFileOwnProps { }

// component State
interface DownloadFileStateProps { }

export class DownloadFileComponent extends Component<DownloadFileProps, DownloadFileStateProps>  {

  downloadTxtFile() {
    // bingoGoals
    // const bingoYAML: string = GoalConverterService.writeBingoYAML(bingoGoals);
    // console.log(bingoYAML);
    // const file = new Blob([bingoYAML], {type: 'text/yaml'});
    const file = new Blob(["example"], {type: 'text/yaml'});

    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "goals.yml";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  // Multiple is false due to allowing only one file at a time
  public render(): JSX.Element {
    return (
      <Grid container>
        <Grid item xs={12}>
        <label htmlFor="file">
          {/* // @ts-ignore */}
          <Button component="span" style={buttonDownloadFile} onClick={this.downloadTxtFile}>
            Download
          </Button>
         </label>
        </Grid>
      </Grid>
    );
  }
}
