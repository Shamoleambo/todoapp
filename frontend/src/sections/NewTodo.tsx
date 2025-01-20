const NewTodo = () => {
  return (
    <div>
      <h1>New Todo</h1>
      <form>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" name="title" />
        <label htmlFor="description">Description: </label>
        <input type="text" id="description" name="description" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewTodo;
