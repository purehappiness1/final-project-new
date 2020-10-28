const initData = {
  tasks: {
    'task-1': {id: 'task-1', content: 'Call to client'},
    'task-2': {id: 'task-2', content: 'Print the contract'},
    'task-3': {id: 'task-3', content: 'Meeting with client in the room 3 '},
    'task-4': {id: 'task-4', content: 'Sign the comtract'},
    'task-5': {id: 'task-5', content: 'Payment for the delivery'},
    'task-6': {id: 'task-6', content: 'Buy some coffee and milk at the office'},
    'task-7': {id: 'task-7', content: 'Play with the cat'},
    'task-8': {id: 'task-8', content: 'Everyday meeteng in the room 5'},
    'task-9': {id: 'task-9', content: 'Calling with the new client'},
    'task-10': {id: 'task-10', content: 'Clean your private space'},
    'task-11': {id: 'task-11', content: 'Send the email to the client with the contract'},
    'task-12': {id: 'task-12', content: 'Check the email'},
    'task-13': {id: 'task-13', content: 'Coffee breack with Diana'},
    'task-14': {id: 'task-14', content: 'Lunch'},
    'task-15': {id: 'task-15', content: 'Check tht memes with Ilon Mask'},
    'task-16': {id: 'task-16', content: 'Call all new customers'},
    'task-17': {id: 'task-17', content: 'Sing the documents with the boss'},
  },
  columns: {
    'column-1': {id: 'column-1', title: 'To do', taskId: ['task-1', 'task-2', 'task-3', 'task-11', 'task-13', 'task-16', 'task-17']},
    'column-2': {id: 'column-2', title: 'In progress', taskId: ['task-5', 'task-6', 'task-8', 'task-14']},
    'column-3': {id: 'column-3', title: 'Do Somethisng else', taskId: ['task-7', 'task-10', 'task-12', 'task-15']},
    'column-4': {id: 'column-4', title: 'Done', taskId: ['task-4','task-9']},
  },
  column0order: ['column-1', 'column-2', 'column-3', 'column-4']
}

export default initData;
