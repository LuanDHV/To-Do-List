import { useGetTodosQuery } from "../redux/todoApi";
import { ITodo } from "../types/interface";
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
      <div className="flex flex-col gap-1">
        {TodoList?.map((todo: ITodo) => (
          // Using ItemsTodo component to render each todo item
          <ItemsTodo key={todo._id} todo={todo} />
        ))}
      </div>
      {fetchError && <p className="text-red-500">Failed to fetch todo list</p>}
      {isFetching && <p className="text-red-500">Loading</p>}
    </div>
  );
};

export default TodoList;
