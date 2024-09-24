import { useState } from "react";
import { useAddTodoMutation } from "../redux/todoApi";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddTodo = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [todo, setTodo] = useState("");
  const [addTodo, { isLoading: isAdding, error: addError }] =
    useAddTodoMutation();

  const handleAddTodo = async (e: any) => {
    e.preventDefault();
    if (todo) {
      try {
        await addTodo({ todo, completed: false }).unwrap();
        setTodo("");
        toast.success("Todo added successfully!");
      } catch (error) {
        console.error("Failed to add todo", error);
      }
    }
  };

  return (
    <form onSubmit={handleAddTodo} className="mb-5 flex">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter new todo"
        className={`w-5/6 border p-3 outline-none ${
          isDarkMode
            ? "bg-dark-bg text-dark-text border-dark-border"
            : "bg-light-bg text-light-text border-light-border"
        }`}
        disabled={isAdding} // Disable input while loading
      />
      <button
        type="submit"
        className={`w-1/6 ${
          isDarkMode
            ? "bg-dark-button hover:bg-dark-hover"
            : "bg-light-button hover:bg-light-hover"
        } text-white duration-300 ease-in-out`}
        disabled={isAdding}
      >
        {isAdding ? "Adding..." : <FontAwesomeIcon icon={faPlus} />}
      </button>
      {addError && <p className="text-red-500">Failed to add todo</p>}
    </form>
  );
};

export default AddTodo;
