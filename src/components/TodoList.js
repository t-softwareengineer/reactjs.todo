import { useState } from 'react';

export default function TodoList({ 
  todos,
  onToggleTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <Todo todo={todo} onToggle={onToggleTodo} onDelete={onDeleteTodo} />
      ))}
    </ul>
  );
}

function Todo({ todo, onToggle, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          className="form-control"
          value={todo.text}
          onChange={e => {
            onToggle({
              ...todo,
              text: e.target.value
            });
          }}
        />
        <button className="btn btn-info" onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.text}
        <button className="btn btn-info" onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input 
        type="checkbox" 
        checked={todo.done}
        onChange={e => {
          onToggle({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>Delete</button>
    </label>
  );
}