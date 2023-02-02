import axios from 'axios';

const baseURL = 'https://todo-app-o73v.onrender.com';

const getTodos = (setTodos) =>  {
  axios.get(`${baseURL}/todos`)
  .then(res => {
    setTodos(res.data.data);
  });
}

const addTodo = (title, setTitle, setTodos) => {
    axios.post(`${baseURL}/todos`, { 'title': title})
    .then(res => {
        console.log(res);
        setTitle('');
        getTodos(setTodos);
    }).catch(err => {
        console.log(err);
    });
}

const updateTodo = (todoID, title, setTitle, setTodos, setIsUpating) => {
    axios.put(`${baseURL}/todos/${todoID}`, { 'title': title})
    .then(res => {
        console.log(res.data.message);
        setTitle('');
        setIsUpating(false);
        getTodos(setTodos);
    }).catch(err => {
        console.log(err);
    });
}

const deleteTodo = (todoID, setTodos) => {
    axios.delete(`${baseURL}/todos/${todoID}`)
    .then(res => {
        console.log(res.data.message);
        getTodos(setTodos);
    }).catch(err => {
        console.log(err);
    });
}


export { getTodos, addTodo, updateTodo, deleteTodo };