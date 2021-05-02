import { useState } from 'react';
import Todo from './components/todo';
import Subtask from './components/subtask';

function App() {
  const [todoList, setTodoList] = useState([{id: 0}]);
  const [extend, setExtend] = useState(0);

  return (
    <div>
      <h1>Todo App</h1>
      <Todo />
      <ul>
        {todoList.map(v => (
          <li key={v.id}>
            <dl>
              <dt>{v.title}</dt>
              {extend === v.id ? <dd><Subtask /></dd> : null}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
