import './App.css';
import Todo from '../src/components/Todo.js';
import { useEffect, useState } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo} from '../src/utils/ApiHandler.js';

function App() {
  const [todos , setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [isUpdating, setIsUpating] = useState(false);
  const [todoID, setTodoID] = useState('');

  useEffect(() => {
    getTodos(setTodos);
  }, []);

  const updateMode = (id, title) => {
    setIsUpating(true);
    setTodoID(id);
    setTitle(title);
  }

  const deleteMode = (id) => {
    deleteTodo(id, setTodos);
  }

  return (
    <div className='App'>
      <div className='container'>
        <h1>Todo App</h1>
        <div className='top'>
          <input type='text' placeholder='Add a todo...' value={title}
          onChange={(e) => setTitle(e.target.value)}/>
          <button className='add' 
          onClick={isUpdating ? 
          () => updateTodo(todoID, title, setTitle, setTodos, setIsUpating) : 
          () => addTodo(title, setTitle, setTodos)}>
            {isUpdating ? 'Update' : 'Add'}
          </button>
        </div>
        <div className='list'>
          {todos.map((item) => 
          <Todo key={item._id} 
          title ={item.title} 
          updateMode={() => updateMode(item._id, item.title)}
          deleteMode={() => deleteMode(item._id)}
          />)}
        </div>
      </div>
    </div>
  );
}

export default App;
