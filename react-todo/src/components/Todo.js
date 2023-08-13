import React, { useState } from 'react';
import axios from 'axios';

const Todo = ({ text, todos, todo, setTodos }) => {
  const [deleteClicks, setDeleteClicks] = useState(0);

  //events
  const handleDeleteButtonClick = (event, id) => {
    event.preventDefault();
    setDeleteClicks(deleteClicks + 1);

    deleteTodo(id);
  };

  const deleteTodo = async (id) => {
    try {
      console.log('Deleting todo with ID:', id);

      await axios.delete(`http://localhost:3000/api/v1/todos/${todo.id}`);
      // Update your todos state to remove the deleted todo
      const updatedTodos = todos.filter((obj) => obj.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completeTodo = async () => {
    try {
      const updatedTodo = {
        ...todo,
        completed: !todo.completed
      };

      await axios.put(`http://localhost:3000/api/v1/todos/${todo.id}`, updatedTodo);

      setTodos(
        todos.map((item) => {
          if (item.id === todo.id) {
            return {
              ...item,
              completed: !item.completed
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>{text}</li>
      <button onClick={completeTodo} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={(e) => handleDeleteButtonClick(e, todo.id)} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;
