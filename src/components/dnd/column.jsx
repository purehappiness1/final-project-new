import React from "react";
import Task from "./task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  margin: 8px;
  border: 1px solid grey;
  border-radius: 12px;
  width: 300px;
  background-color: #c8f7ef;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
  border-radius: 12px;
  text-align: center;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "#68b0ab" : "inherit"};
    border-radius: 12px;
  flex-grow: 1;
  min-height: 100px;
`;

const Column = (props) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{props.column.title}</Title>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
