import { useState } from "react";
import { useGetTodosQuery } from "../redux/todoApi";
import { ITodo } from "../types/interface";
import AddTodo from "./AddTodo";
import ItemsTodo from "./ItemsTodo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const {
    data: TodoList,
    isLoading: isFetching,
    error: fetchError,
  } = useGetTodosQuery(undefined);

  return (
    <div
      className={`mx-auto h-screen p-5 ${isDarkMode ? "bg-dark-bg text-dark-text" : "bg-light-bg text-light-text"}`}
    >
      <div className="mx-auto w-full p-5 md:w-1/2">
        <h1 className="mb-10 text-center text-3xl font-bold">To Do List</h1>

        <AddTodo isDarkMode={isDarkMode} />
        <div className="flex flex-col gap-1">
          {TodoList?.map((todo: ITodo) => (
            // Using ItemsTodo component to render each todo item
            <ItemsTodo key={todo._id} todo={todo} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
      <button
        onClick={toggleMode}
        className={`ease-in-ou absolute bottom-10 right-10 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md duration-300 ${
          isDarkMode
            ? "bg-dark-button hover:bg-dark-hover"
            : "bg-light-button hover:bg-light-hover"
        }`}
      >
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
      </button>
      {fetchError && <p className="text-red-500">Failed to fetch todo list</p>}
      {isFetching && <p className="text-red-500">Loading</p>}
    </div>
  );
};

export default TodoList;
