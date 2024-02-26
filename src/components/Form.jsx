/* eslint-disable react/prop-types */
import { useState } from "react";

/**
 * Form component for adding or editing tasks.
 */
export const Form = ({
  onAddItem,
  editedItem,
  myRef,
  onUpdateItem,
  setEdited,
  edited,
}) => {
  // State for the task title
  const [title, setTitle] = useState("");

  /**
   * Handles form submission.
   */
  function handleSubmit(event) {
    event.preventDefault();

    // If title has not been edited, return
    if (!title) return;

    if (editedItem && !edited) {
      // If editing an existing item and not yet edited
      const updatedItem = { ...editedItem, title };
      onUpdateItem(updatedItem);
      setTitle("");
      setEdited(true);
    } else {
      // If adding a new item
      const newItem = { title, checked: false, id: Date.now() };
      onAddItem(newItem);
      setTitle("");
    }
  }

  return (
    <form
      className="flex items-center justify-between flex-wrap gap-4"
      onSubmit={handleSubmit}
    >
      {/* Task input field */}
      <input
        type="text"
        placeholder={editedItem && !edited ? "Edit Task" : "Add new Task"}
        required
        onBlur={() => {
          setEdited(true);
        }}
        onChange={(e) => setTitle(e.target.value)}
        ref={myRef}
        value={title}
        className="flex-auto border border-slate-300 bg-slate-50 dark:bg-gray-950 dark:border-gray-800 hover:border-slate-900 rounded-md py-2 px-3 w-[70%]"
      />
      {/* Add Task button */}
      <button className="px-5 py-2 font-semibold bg-slate-950 hover:bg-slate-900 text-gray-50 dark:bg-slate-50 dark:text-gray-950 dark:hover:bg-slate-100 outline-slate-400 dark:outline-slate-400 rounded-md flex-auto">
        Add Task
      </button>
    </form>
  );
};
