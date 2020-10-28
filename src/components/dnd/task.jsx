import React from 'react';
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid grey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 12px;
  background-color: ${props => (props.isDragging ? '#7b6d8d' : 'white')};`;

const Task = (props) => {
  return(
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}>
        {props.task.content}
        </Container>
      )}
    </Draggable>
  )
}

export default Task;
