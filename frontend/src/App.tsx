import { useState } from "react";
import NewTodo from "./sections/NewTodo";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <NewTodo setTitle={setTitle} setDescription={setDescription} />
    </div>
  );
}

export default App;
