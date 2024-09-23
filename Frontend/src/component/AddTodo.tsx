import { useState } from "react";
import { useAddTodoMutation } from "../redux/todoApi";

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
        className="w-5/6 p-3 outline-none"
        disabled={isAdding} // Disable button while loading
      />
      <button
        type="submit"
        className="w-1/6 bg-blue-500 text-white"
        disabled={isAdding}
      >
        {isAdding ? "Adding..." : "Add Todo"}{" "}
      </button>
      {addError && <p className="text-red-500">Failed to add todo</p>}
    </form>
  );
};

export default AddTodo;
