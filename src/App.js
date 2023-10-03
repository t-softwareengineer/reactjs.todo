import { useReducer } from 'react';
import NavigationBar from './components/NavigationBar';
import AddTodo from './components/AddTodos';
import TodoList from './components/TodoList';

export default function TodoApp() {
  const [todos, dispatch] = useReducer(
    todosReducer,
    initialTodos
  );

  function handleAddTodo(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text
    });
  }

  function handleToggleTodo(todo) {
    dispatch({
      type: 'changed',
      todo: todo
    });
  }

  function handleDeleteTodo(todoId) {
    dispatch({
      type: 'deleted',
      id: todoId
    });
  }

  return (
    <>
      <NavigationBar />
      <h1 className="text-center">React.js Todo PWA</h1>
      <div className="container">
        <div className="m-3">
          <AddTodo onAddTodo={handleAddTodo} />
          <TodoList
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo} 
          />
        </div>
      </div>
    </>
  );
}

function todosReducer(todos, action) {
  switch (action.type) {
    case 'added': {
      return [...todos, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return todos.map(t => {
        if (t.id === action.todo.id) {
          return action.todo;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return todos.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTodos = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];