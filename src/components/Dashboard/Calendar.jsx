import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  AllDayPanel,
  MonthView,
  DayView,
  Toolbar,
  DateNavigator,
  TodayButton,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  DragDropProvider,
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";

import { appointments } from "./demo-data/appointments";
import { ViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';

const dragDisableIds = new Set([3, 8, 10, 12]);
const allowDrag = ({ id }) => !dragDisableIds.has(id);
const appointmentComponent = (props) => {
  if (allowDrag(props.data)) {
    return <Appointments.Appointment {...props} />;
  } return <Appointments.Appointment {...props} style={{ ...props.style, cursor: 'not-allowed' }} />;
};

const Calendar = () => {
  
  const [state, setState] = useState({
    data: appointments,
    currentDate: "2020-08-14",
  });
  const { data, currentDate } = state;
  const commitChanges = ({ added, changed, deleted }) => {
    setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  };

  return (
    <Paper>
      <Scheduler data={data} height={660}>
        <ViewState defaultCurrentDate={currentDate} />
        <EditingState onCommitChanges={commitChanges} />
        <EditRecurrenceMenu />
        <IntegratedEditing />
        <WeekView startDayHour={9} endDayHour={19} />
        <MonthView />
        <DayView />
        <ConfirmationDialog />
        <Appointments appointmentComponent={appointmentComponent} />
        <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
        <AppointmentForm />

        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />
        <AllDayPanel />
        <DragDropProvider allowDrag={allowDrag} />
      </Scheduler>
    </Paper>
  );
};
export default Calendar;
