import { Todo } from "../models/Todo";

type TodoProps = {
  todo: Todo;
};

const SingleTodo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div>
      <h2>{todo._id}</h2>
    </div>
  );
};

export default SingleTodo;
