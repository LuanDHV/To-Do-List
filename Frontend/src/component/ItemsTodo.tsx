import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUpdateTodoMutation, useDeleteTodoMutation } from "../redux/todoApi";
import { ITodo } from "../types/interface";
import { toast } from "react-toastify";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ItemsTodo = ({
  todo,
  isDarkMode,
}: {
  todo: ITodo;
  isDarkMode: boolean;
}) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting, error: deleteError }] =
    useDeleteTodoMutation();

  const handleToggleCompleted = async () => {
    try {
      await updateTodo({
        id: todo._id,
        completed: !todo.completed,
      }).unwrap();
      toast.success(`Todo updated successfully!`);
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id).unwrap();
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  return (
    <li
      className={`flex justify-between border p-4 shadow-md duration-300 ease-in-out ${
        isDarkMode
          ? "bg-dark-bg text-dark-text border-dark-border"
          : "bg-light-bg text-light-text border-light-border"
      } ${
        todo.completed
          ? isDarkMode
            ? "bg-dark-completed line-through"
            : "bg-light-completed line-through"
          : ""
      } `}
    >
      <div className="flex items-center gap-5">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleCompleted}
          className="h-4 w-4 cursor-pointer"
        />
        <span>{todo.todo}</span>
      </div>
      <button
        onClick={handleDelete}
        className="h-4 w-4 cursor-pointer text-red-500"
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : <FontAwesomeIcon icon={faTrash} />}
      </button>
      {deleteError && <p className="text-red-500">Failed to delete todo</p>}
    </li>
  );
};

export default ItemsTodo;
