import { useState, useRef } from 'react';

function Todo(props) {
  const [message, setMessage] = useState({});
  const title = useRef();
  const addTodo = async () => {
    if(!title.current.value) {
      setMessage({
        type: 'error',
        content: 'Please fill in title first',
      });
      return;
    }
    let result = await fetch(props.be, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `title=${title.current.value}`,
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
      setTimeout(() => {
        setMessage({});
      }, 1000);
      props.getTodo();
    }
  }
  const handleKeyDown = e => {
    if(13 === e.keyCode) {
      addTodo();
    }
  }

  return (
    <div>
      <p type={message.type}>{message.content ? <span role="message">{message.content}</span> : null}</p>
      <input placeholder="What to do?" ref={title} onKeyDown={handleKeyDown} /> <button onClick={addTodo}>New List</button>
    </div>
  );
}

export default Todo;
