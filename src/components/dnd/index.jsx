import React from "react";
import Column from "./column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Modal from "../modal/Modal";
import styled from "styled-components";
import { columsWrite } from '../../store/actions'
import { columsOrderWrite } from '../../store/actions'
import { connect } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#c8f7ef',
    },
    secondary: {
      main: '#e55757',
    },
  },
});

const Container = styled.div`
  display: flex;
`;

document.body.style.backgroundColor = `rgba(53, 141, 317, 0,4)`;

class DragModel extends React.Component {
  // state = initData;
  
  onDragStart = () => {
    document.body.style.color = "#c8d5b9";
    document.body.style.transition = "background-color 0.2s ease";
  };

  onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(this.props.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(53, 141, 317, ${opacity})`;
  };

  onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(this.props.column0order);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        column0order: newColumnOrder,
      };
      this.props.columsOrderWrite(newColumnOrder);
      return;
    }

    const start = this.props.columns[source.droppableId];
    const finish = this.props.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskId);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskId: newTaskIds,
      };
      // const newState = {
      //   ...this.state,
      //   columns: {
      //     ...this.props.columns,
      //     [newColumn.id]: newColumn,
      //   },
      // };
      this.props.columsWrite({ [newColumn.id]: newColumn, });
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskId);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskId: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskId);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskId: finishTaskIds,
    };

    // const newState = {
    //   ...this.state,
    //   columns: {
    //     ...this.props.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish,
    //   },
    // };
    this.props.columsWrite({ [newStart.id]: newStart, [newFinish.id]: newFinish });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <DragDropContext backgroundColor="primary"
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          <Modal />
          <Droppable backgroundColor="primary"
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <Container backgroundColor="primary" {...provided.droppableProps} ref={provided.innerRef}>
                {console.log('column0order', this.props.column0order)}
                {this.props.column0order?.map((columnId, index) => {
                  const column = this.props.columns[columnId];
                  const tasks = column.taskId.map((task) => this.props.tasks[task]);
                  return (
                    <Column
                      key={column.id}
                      column={column}
                      tasks={tasks}
                      index={index}
                      backgroundColor="primary"
                    />
                  );
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    columns: state.columns,
    column0order: state.column0order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    columsWrite: (columsObj) => dispatch(columsWrite(columsObj)),
    columsOrderWrite: (columsObj) => dispatch(columsOrderWrite(columsObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DragModel);

// export default DragModel;
