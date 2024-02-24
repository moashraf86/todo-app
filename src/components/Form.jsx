/* eslint-disable react/prop-types */
import { useState } from "react";
// Code: Form component

export const Form = ({ onAddItem }) => {
  // const [quantity, setQuantity] = useState(1);
  const [title, setTitle] = useState("");

  /**
   * Handle form submission
   */
  function handleSubmit(event) {
    event.preventDefault();
    const newItem = { title, checked: false, id: Date.now() };
    onAddItem(newItem);
    setTitle("");
    // setQuantity(1);
  }

  return (
    <form
      className="flex items-center justify-between gap-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Add item..."
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="flex-1 border border-slate-300 bg-slate-50 dark:bg-gray-950 dark:border-gray-800 hover:border-slate-900 rounded-md py-2 px-3"
      />
      <button className="px-5 py-2 font-semibold bg-slate-950 hover:bg-slate-900 text-gray-50 dark:bg-slate-50 dark:text-gray-950 dark:hover:bg-slate-100 outline-slate-400 dark:outline-slate-400 rounded-md">
        Add Task
      </button>
    </form>
  );
};
