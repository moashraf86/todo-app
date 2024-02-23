/* eslint-disable react/prop-types */
import { useState } from "react";
// Code: Form component

export const Form = ({ onAddItem }) => {
  // const [quantity, setQuantity] = useState(1);
  const [title, setItem] = useState("");

  /**
   * Handle form submission
   */
  function handleSubmit(event) {
    event.preventDefault();
    const newItem = { title, checked: false, id: Date.now() };
    onAddItem(newItem);
    setItem("");
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
        onChange={(e) => setItem(e.target.value)}
        value={title}
        className="flex-1 border border-slate-300 rounded-md   py-2 px-3 "
      />
      <button className="px-5 py-2 bg-slate-900 text-gray-50 dark:bg-white dark:text-gray-900 rounded-md">
        Add Task
      </button>
    </form>
  );
};
