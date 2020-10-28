
import actions from "./types";
import { appointments } from "../components/Dashboard/demo-data/appointments";
import allData from '../components/dnd/init-data.jsx'

console.log('allData', allData);
const initData = {
  tasks: {
    'task-1': {id: 'task-1', content: 'Call the client'},
    'task-2': {id: 'task-2', content: 'Print the contract'},
    'task-3': {id: 'task-3', content: 'Meeting with a client in room 3'},
    'task-4': {id: 'task-4', content: 'Sign the contract'},
    'task-5': {id: 'task-5', content: 'Pay for the delivery'},
    'task-6': {id: 'task-6', content: 'Buy coffee'},
    'task-7': {id: 'task-7', content: 'Play with the cat'},
    'task-8': {id: 'task-8', content: 'Daily meeting in room 5'},
    'task-9': {id: 'task-9', content: 'Call the new client'},
    'task-10': {id: 'task-10', content: 'Clean my working space'},
    'task-11': {id: 'task-11', content: 'Send an email to the client with the contract'},
    'task-12': {id: 'task-12', content: 'Check the email'},
    'task-13': {id: 'task-13', content: 'Coffee break with Diana'},
    'task-14': {id: 'task-14', content: 'Lunch'},
    'task-15': {id: 'task-15', content: 'Check memes with Ilon Musk'},
    'task-16': {id: 'task-16', content: 'Call all new clients'},
    'task-17': {id: 'task-17', content: 'Take docs for signing to the boss'},
  },
  columns: {
    'column-1': {id: 'column-1', title: 'To do', taskId: ['task-1', 'task-2', 'task-3', 'task-11', 'task-16', 'task-17']},
    'column-2': {id: 'column-2', title: 'In progress', taskId: ['task-5', 'task-8', 'task-14']},
    'column-3': {id: 'column-3', title: 'Done', taskId: ['task-10', 'task-12', 'task-4','task-9']},
    'column-4': {id: 'column-4', title: 'Private', taskId: ['task-7', 'task-6', 'task-13', 'task-15']},
  },
  column0order: ['column-1', 'column-2', 'column-3', 'column-4'],

  firstName: '',
  lastName: '',
  isAuth: false,
  chartData: {
    labels: [
      'Contract signed',
      'Negotiations',
      'First contact',
      'Making a decision',
      'Contract agreement',
      'Meeting planned',
      'Refused',
      'Other'
    ],
    datasets: [{
      data: [67, 26, 12, 7 , 11, 10, 7, 5],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#23917d',
      '#35db45',
      '#ba1634',
      '#2f5e5b',
      '#677cc7',
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#23917d',
      '#35db45',
      '#ba1634',
      '#2f5e5b',
      '#677cc7',
      ]
    }]
  },
  appointments: appointments,
}

export const reducers = (state = initData, action) => {
  switch (action.type) {
    case actions.COLUMNS:

      return {...state, columns: {...state.columns, ...action.objectColumn}};

      case actions.COLUMNS_ORDER:

      return {...state, column0order: [...action.objectColumn]};


    case actions.ADD_TODO :
      const id = Math.random().toString();
      return {...state, 
        tasks: {...state.tasks, [`task-${id}`]: {id: `task-${id}`, content: action.value}},
        columns: {...state.columns, 'column-1': {id: 'column-1', title: 'To do', taskId: [...state.columns["column-1"].taskId, `task-${id}` ]}} };


    case actions.ADD_NAME:
      return { ...state, firstName: action.firstName, lastName: action.lastName, isAuth: true };
    case actions.LOGOUT:
      return { state, isAuth: false };
      case actions.ADD_DEAL: 
      const index = state.chartData.labels.indexOf(action.status);
      const deals = state.chartData.datasets[0].data[index] += 1
      const x = state.chartData.datasets[0].data
      return { ...state, x: deals}

    default:
      return {...state};
  }
};
