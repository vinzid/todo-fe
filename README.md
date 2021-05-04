## Todo Frontend
Use [Create React App](create-react) to bootstrap


### Software
Necessary software and the version used in development
- [Node](node) v14.16.1

### Install
Install the npm dependency
>npm i

### Run
Compile and start
>npm start

### Test
Test for the components
>npm test

### Access
>http://localhost:3000

### Function
The main function of the todo app is as follow:
1. Fill in the top text input box and click enter key or the 'New List' Button to add new pending task.
2. Click the task name to toggle the step list and step text box.
3. Fill in the step text input box and click enter key or the 'New Step' Button to add new pending step to the task; the task is set to pending automatically if it's completed before.
4. Check the checkbox before each task to mark it and all its steps as completed; uncheck the checkbox before each task to mark it and all its steps as pending.
5. Check the checkbox before each step to mark it as completed, if all the steps in a task are completed, then the task is set to completed automatically; uncheck the checkbox before each step to mark it as pending, and the task is set to pending automatically if it's completed before.


[create-react]: https://github.com/facebook/create-react-app
[node]: https://nodejs.org