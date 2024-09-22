import { useUpdateTodoMutation, useDeleteTodoMutation } from "../redux/todoApi";
import { TodoType } from "../types/interface";

const ItemsTodo = ({ todo }: { todo: TodoType }) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting, error: deleteError }] =
    useDeleteTodoMutation();

  const handleToggleCompleted = async () => {
    try {
      await updateTodo({
        id: todo.id,
        todo: todo.todo,
        completed: !todo.completed,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update todo", error); // Log lỗi khi cập nhật thất bại
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id).unwrap();
    } catch (error) {
      console.error("Failed to delete todo", error); // Log lỗi khi xóa thất bại
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
