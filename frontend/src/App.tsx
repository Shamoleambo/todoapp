import { useState } from "react";
import NewTodo from "./sections/NewTodo";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <NewTodo
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
      />
    </>
  );
}

export default App;
