// import .....

import {Component} from "react";
import React from "react";
import {CSSProperties} from "@material-ui/core/styles/withStyles";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

const bingoTable: CSSProperties = {
  table: {
    minWidth: 650,
  },
};

function createData(name: string, types: string[], difficulty: number) {
  return { name, types, difficulty };
}

const rows = [
  createData('Frozen yoghurt', ["159"], 6.0),
  createData('Ice cream sandwich', ["237"], 9.0),
  createData('Eclair', ["262"], 16.0),
  createData('Cupcake', ["305"], 3.7),
  createData('Gingerbread', ["356"], 16.0),
];

// component own props
interface BingoProps { }

// component props
interface BingoTableProps extends BingoProps { }

// component State
interface BingoTableStateProps { }

export class BingoTable extends Component<BingoTableProps, BingoTableStateProps>  {

  // Multiple is false due to allowing only one file at a time
  public render(): JSX.Element {
    return (
      <TableContainer component={Paper}>
        <Table style={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Types</TableCell>
              <TableCell align="right">Difficulty&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.types}</TableCell>
                <TableCell align="right">{row.difficulty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
