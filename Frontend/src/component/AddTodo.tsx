import { useState } from "react";
import { useAddTodoMutation } from "../redux/todoApi";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddTodo = () => {
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
        className="w-5/6 border p-3 outline-none"
        disabled={isAdding} // Disable button while loading
      />
      <button
        type="submit"
        className="w-1/6 bg-blue-500 text-white"
        disabled={isAdding}
      >
        {isAdding ? "Adding..." : <FontAwesomeIcon icon={faPlus} />}
      </button>
      {addError && <p className="text-red-500">Failed to add todo</p>}
    </form>
  );
};

export default AddTodo;
