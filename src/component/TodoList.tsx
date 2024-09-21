import { useGetTodosQuery } from "../redux/todoApi";
import { TodoType } from "../types/interface";

const TodoList = () => {
  const { data, error, isLoading } = useGetTodosQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <h1 className="mb-5 text-center text-3xl font-bold">To-do List</h1>
      <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow">
        {data?.todos?.slice(0, 10).map((todo: TodoType) => (
          <li
            key={todo.id}
            className={`p-4 ${todo.completed ? "bg-green-100" : "bg-red-100"} flex items-center justify-between`}
          >
            <span>{todo.todo}</span>
            <span>{todo.completed ? "Completed" : "Pending"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
