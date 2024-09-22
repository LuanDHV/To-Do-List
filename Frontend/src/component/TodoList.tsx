import { useGetTodosQuery } from "../redux/todoApi";
import { TodoType } from "../types/interface";
import AddTodo from "./AddTodo";
import ItemsTodo from "./ItemsTodo";

const TodoList = () => {
  const {
    data: TodoList,
    isLoading: isFetching,
    error: fetchError,
  } = useGetTodosQuery(undefined);

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <h1 className="mb-5 text-center text-3xl font-bold">To-do List</h1>
      <AddTodo />
      <ul className="rounded-lg bg-white shadow">
        {TodoList?.todos?.map((todo: TodoType) => (
          // Using ItemsTodo component to render each todo item
          <ItemsTodo key={todo.id} todo={todo} />
        ))}
      </ul>
      {fetchError && <p className="text-red-500">Failed to add todo</p>}
      {isFetching && <p className="text-red-500">Loading</p>}
    </div>
  );
};

export default TodoList;
