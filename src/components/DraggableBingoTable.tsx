import React, { Component } from "react";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import {DragDropContext, Droppable, Draggable, NotDraggingStyle} from "react-beautiful-dnd";
import CheckboxAutocomplete from "@components/CheckboxAutocomplete";
import AddAutocomplete from "@components/AddAutocomplete";

interface Item {
  id: string | number | undefined;
  primary: React.ReactNode;
  secondary: React.ReactNode;
}

// component own props
interface DraggableBingoTableOwnProps { }

// component props
interface DraggableBingoTableProps extends DraggableBingoTableOwnProps { }

// component State
interface DraggableBingoTableStateProps {
  items: Item[];
}

// fake data generator
function getItems(count: number) {
  return Array.from({length: count}, (v, k) => k).map(k => ({
    id: `item-${k}`,
    primary: `item ${k}`,
    secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined
  }))
}


// a little function to help us with reordering the result
function reorder(list: Item[], startIndex: number, endIndex: number): Item[] {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function getItemStyle(isDragging: boolean, draggableStyle: NotDraggingStyle | undefined) {
  return {
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      background: "rgb(235,235,235)"
    })
  };
}

export default class DraggableBingoTable extends Component<DraggableBingoTableProps, DraggableBingoTableStateProps> {
  constructor({props}: { props: any }) {
    super(props)
    this.state = {
      items: getItems(10)
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  // @ts-ignore
  private onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    console.log(`dragEnd ${result.source.index} to  ${result.destination.index}`)
    const items = reorder(
      // @ts-ignore
      this.state.items,
      result.source.index,
      result.destination.index
    )

    this.setState({
      items
    })
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nr</TableCell>
              <TableCell>Label</TableCell>
              <TableCell align="right">Text</TableCell>
              <TableCell>Hmm</TableCell>
            </TableRow>
          </TableHead>
          {/* // @ts-ignore */}
          <TableBody component={DroppableComponent(this.onDragEnd)}>
            {/* // @ts-ignore */}
            {this.state.items.map((item: Item, index: number) => (
              // @ts-ignore
              <TableRow component={DraggableComponent(item.id, index)} key={item.id} >
                <TableCell scope="row">{index + 1}</TableCell>
                <TableCell>{item.primary}</TableCell>
                <TableCell align="right">{item.secondary}</TableCell>
                <TableCell align="right"><CheckboxAutocomplete/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

function DraggableComponent(id: string, index: number) {
  // @ts-ignore
  return (props) => {
    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <TableRow
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}

            {...props}
          >
            {props.children}
          </TableRow>
        )}
      </Draggable>
    )
  };
}

// @ts-ignore
function DroppableComponent(onDragEnd) {
  // @ts-ignore
  return (props) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'1'} direction="vertical">
          {(provided) => {
            return (
              <TableBody ref={provided.innerRef} {...provided.droppableProps} {...props}>
                {props.children}
                {provided.placeholder}
              </TableBody>
            )
          }}
        </Droppable>
      </DragDropContext>
    )
  };
}
