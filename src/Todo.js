import React, { useState } from 'react';

const Todo = () => {
  const [todo, setTodo] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newList = [...todo, e.target.children[0].value];
    setTodo(newList);
  };

  const lists = todo.map((el, idx) => <li key={idx}>{el}</li>);

  return (
    <div>
      <h1>일정관리</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="할 일을 입력하세요" />
      </form>
      <ul>{lists}</ul>
    </div>
  );
};

export default Todo;
