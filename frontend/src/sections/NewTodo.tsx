import styles from "./NewTodo.module.css";

const NewTodo = () => {
  return (
    <div className={styles.container}>
      <h1>New Todo</h1>
      <form className={styles.form}>
        <div className={styles["field-container"]}>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" name="title" />
        </div>
        <div className={styles["field-container"]}>
          <label htmlFor="description">Description: </label>
          <input type="text" id="description" name="description" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewTodo;
