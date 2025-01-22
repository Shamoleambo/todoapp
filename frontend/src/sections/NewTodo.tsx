import { useState } from "react";
import axios from "axios";
import styles from "./NewTodo.module.css";

type NewTodoProps = {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
};

const NewTodo: React.FC<NewTodoProps> = ({
  title,
  description,
  setTitle,
  setDescription,
}) => {
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const titleOrDescriptionAreUndefined = !title || !description;
    const titleOrDescriptionAreInvalidStrings =
      title.trim().length === 0 || description.trim().length === 0;

    if (titleOrDescriptionAreUndefined || titleOrDescriptionAreInvalidStrings) {
      setSubmitError(true);
    } else {
      await axios.post(
        "http://localhost:8080/api/create-todo",
        { title, description, done: false },
        { headers: { "Content-Type": "application/json" } }
      );

      setTitle("");
      setDescription("");
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>New Todo</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles["field-container"]}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className={styles["field-container"]}>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="submit">Create</button>
        {submitError && (
          <span>Title or description are invalid, please correct them</span>
        )}
      </form>
    </div>
  );
};

export default NewTodo;
