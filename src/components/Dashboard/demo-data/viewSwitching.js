import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  DayView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

import { ViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from './appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentViewName: 'work-week',
      currentDate: '2018-07-25',
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
  }

  render() {
    const { data, currentViewName, currentDate } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            defaultCurrentDate="2018-07-25"
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            defaultCurrentDate="2018-07-25"
          currentDate={currentDate}
          onCurrentDateChange={this.currentDateChange}
          />

          <WeekView
            startDayHour={10}
            endDayHour={19}
          />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />
          <DayView />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}

