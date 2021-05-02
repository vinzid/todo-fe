import { useState, useEffect } from 'react';
import Todo from './components/todo';
import Subtask from './components/subtask';
const be = `http://${window.location.host.replace(3000, 3001)}/`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [extend, setExtend] = useState(0);
  const getTodo = async () => {
    let result = await fetch(be).then(response => response.json());
    if(!result.error) {
      setTodoList(result.data);
    }
  }
  const updateTodo = async e => {
    let id = Number(e.target.name.replace(/todo-/, ''));
    let status = e.target.checked ? 'completed' : 'pending';
    let result = await fetch(be, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `id=${id}&status=${status}`,
    })
      .then(response => response.json());
    if(result.error) {
      alert('System error, Please try again later');
    } else {
      getTodo();
    }
  }

  useEffect(() => {
    getTodo();
  // eslint-disable-next-line
  }, [])

  return (
    <div>
      <h1>Todo App</h1>
      <Todo getTodo={getTodo} be={be} />
      <ul>
        {todoList.map(v => (
          <li key={v.id}>
            <dl>
              <dt><input name={`todo-${v.id}`} type="checkbox" checked={'completed' === v.status} onChange={updateTodo} />{v.title}</dt>
              {extend === v.id ? <dd><Subtask /></dd> : null}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
