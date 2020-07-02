import React, {
  useReducer,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { db, firebaseAPI } from './firebase';

const App = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const array = await firebaseAPI();
      setTodos(array);
    };
    fetchData();
  }, []);
  const onInsert = useCallback(
    (text) => {
      const nextId = todos.length + 1;
      const todo = {
        id: nextId,
        text,
        checked: false,
      };
      db.collection('todos')
        .doc(nextId + '')
        .set(todo, { merge: true });
      setTodos((todos) => todos.concat(todo));
    },
    [todos],
  );

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((el) => el.id !== id));
    db.collection('todos')
      .doc(id + '')
      .delete();
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          db.collection('todos')
            .doc(id + '')
            .update({ checked: !todo.checked });
          return { ...todo, checked: !todo.checked };
        } else {
          return todo;
        }
      }),
    );
  }, []);
  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>
    </div>
  );
};

export default App;
