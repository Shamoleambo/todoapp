import styles from "./NewTodo.module.css";

const NewTodo: React.FC<{
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}> = ({ setTitle, setDescription }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            onChange={handleTitleChange}
          />
        </div>
        <div className={styles["field-container"]}>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewTodo;
