import { useState, useRef } from 'react';
import styles from './index.module.scss'

function Subtask(props) {
  const [message, setMessage] = useState({});
  const title = useRef();
  const addSubtask = async () => {
    if(!title.current.value) {
      setMessage({
        type: 'error',
        content: 'Please fill in title first',
      });
      return;
    }
    let result = await fetch(`${props.be}subtask`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `title=${title.current.value}&todo_id=${props.todo_id}`,
    })
      .then(response => response.json());
    if(result.error) {
      setMessage({
        type: 'failure',
        content: 'Add failure, Please try again later',
      });
    } else {
      setMessage({
        type: 'success',
        content: 'Add success'
      });
      title.current.value = '';
      setTimeout(() => {
        setMessage({});
      }, 1000);
      props.getTodo();
    }
  }
  const updateSubtask = async e => {
    let id = Number(e.target.name.replace(/subtask-/, ''));
    let status = e.target.checked ? 'completed' : 'pending';
    let result = await fetch(`${props.be}subtask`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `id=${id}&status=${status}&todo_id=${props.todo_id}`,
    })
      .then(response => response.json());
    if(result.error) {
      alert('System error, Please try again later');
    } else {
      props.getTodo();
    }
  }
  const handleKeyDown = e => {
    if(13 === e.keyCode) {
      addSubtask();
    }
  }

  return (
    <div className={styles.subtask}>
      {props.subtasks ? (
        <ol>
          {props.subtasks.map(v => (
            <li key={v.id}>
              <input name={`subtask-${v.id}`} type="checkbox" checked={'completed' === v.status} onChange={updateSubtask} />
              <label>{v.title}</label>
            </li>
          ))}
        </ol>
      ) : null}
      <div>
        <p type={message.type}>{message.content ? <span role="message">{message.content}</span> : null}</p>
        <p><input placeholder="What are the steps?" ref={title} onKeyDown={handleKeyDown} /> <button onClick={addSubtask}>New Step</button></p>
      </div>
    </div>
  );
}

export default Subtask;
