import { useUpdateTodoMutation, useDeleteTodoMutation } from "../redux/todoApi";
import { ITodo } from "../types/interface";

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
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id).unwrap();
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  return (
    <li
      className={`p-4 ${todo.completed ? "bg-red-100" : "bg-green-100"} flex items-center justify-between`}
    >
      <div className="flex items-center gap-5">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleCompleted}
        />
        <span className={todo.completed ? "line-through" : ""}>
          {todo.todo}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500"
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {deleteError && <p className="text-red-500">Failed to delete todo</p>}
    </li>
  );
};

export default ItemsTodo;
