import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [text, setText] = useState('');

  return (
    <>
      <input
        className="form-control"
        placeholder="Add a Todo"
        value={text}
        onChange={e => setText(e.target.value)} 
      />
      <button
        className="btn btn-outline-primary"
        onClick={() => {
          setText('');
          onAddTodo(text);
        }}
      > Add
      </button>
    </>
  );
}