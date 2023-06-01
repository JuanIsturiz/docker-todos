import { FC } from "react";
import { RouterOutputs } from "../utils/trpc";

type Todos = RouterOutputs["todo"]["findAll"];

interface TodoListProps {
  todos: Todos | undefined;
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
  return <div>TodoList</div>;
};

export default TodoList;
