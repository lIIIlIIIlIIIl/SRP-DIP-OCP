import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { useAuth } from "../context/AuthContext";

function Todos() {
  const [newTodo, setNewTodo] = useState("");
  const { todos, create } = useTodo();
  const { isLogin } = useAuth();

  const saveUserInput = (e) => setNewTodo(e.target.value);
  const createTodo = () => {
    create(newTodo);
  };

  if (!isLogin) {
    return <></>;
  }

  return (
    <div>
      <input value={newTodo} onChange={saveUserInput} />
      <button onClick={createTodo}>create</button>
      {todos?.map(({ id, todo }) => (
        <li key={id}>{todo}</li>
      ))}
    </div>
  );
}

export default Todos;
