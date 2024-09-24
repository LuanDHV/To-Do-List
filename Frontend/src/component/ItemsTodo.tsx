import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUpdateTodoMutation, useDeleteTodoMutation } from "../redux/todoApi";
import { ITodo } from "../types/interface";
import { toast } from "react-toastify";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ItemsTodo = ({ todo }: { todo: ITodo }) => {
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
      className={`cursor-pointer border p-4 shadow-md duration-300 ease-in-out hover:bg-[#E8F0FE] ${todo.completed ? "bg-red-100" : "bg-green-100"} flex items-center justify-between`}
    >
      <div className="flex items-center gap-5">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleCompleted}
          className="h-4 w-4 cursor-pointer"
        />
        <span className={`${todo.completed ? "line-through" : ""}`}>
          {todo.todo}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500"
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : <FontAwesomeIcon icon={faTrash} />}
      </button>
      {deleteError && <p className="text-red-500">Failed to delete todo</p>}
    </li>
  );
};

export default ItemsTodo;
