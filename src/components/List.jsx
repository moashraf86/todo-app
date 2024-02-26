/* eslint-disable react/prop-types */
import { useState } from "react";
import { Item } from "./Item";

/**
 * List component represents the list of tasks.
 */
export const List = ({
  items,
  onDeleteItem,
  onCheckItem,
  onClearList,
  onEditItem,
}) => {
  // State for sorting and filtering
  const [sortBy, setSortBy] = useState("input");
  const [filterBy, setFilterBy] = useState("all");

  /**
   * Handles sorting of items.
   */
  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  /**
   * Handles filtering of items.
   */
  function handleFilterBy(value) {
    setFilterBy(value);
  }

  // Apply filtering based on filterBy value
  let filteredItems = items;
  if (filterBy === "checked") {
    filteredItems = items.filter((item) => item.checked);
  } else if (filterBy === "active") {
    filteredItems = items.filter((item) => !item.checked);
  }

  // Apply sorting based on sortBy value
  let sortedItems = filteredItems;
  if (sortBy === "description") {
    sortedItems = filteredItems
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "checked") {
    sortedItems = filteredItems.slice().sort((a, b) => a.checked - b.checked);
  }

  return (
    <div className="mt-6 mb-2 border border-slate-300 dark:border-gray-800 rounded-md">
      {/* Header with sorting and filtering options */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-300 dark:border-gray-800">
        <h2 className="text-[24px] font-semibold">Tasks</h2>
        <div className="flex gap-2 text-[12px] text-slate-600 dark:text-slate-500">
          {/* Filter buttons */}
          <button
            role="radio"
            name="filterBy"
            aria-checked={filterBy === "all"}
            onClick={() => handleFilterBy("all")}
          >
            <span
              className={`cursor-pointer ${
                filterBy === "all" ? "text-blue-600" : ""
              }`}
            >
              All
            </span>
          </button>
          <button
            role="radio"
            name="filterBy"
            aria-checked={filterBy === "checked"}
            onClick={() => handleFilterBy("checked")}
          >
            <span
              className={`cursor-pointer ${
                filterBy === "checked" ? "text-blue-600" : ""
              }`}
            >
              Completed
            </span>
          </button>
          <button
            role="radio"
            name="filterBy"
            aria-checked={filterBy === "active"}
            onClick={() => handleFilterBy("active")}
          >
            <span
              className={`cursor-pointer ${
                filterBy === "active" ? "text-blue-600" : ""
              }`}
            >
              Active
            </span>
          </button>
        </div>
      </div>

      {/* List of items */}
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onCheckItem={onCheckItem}
            onEditItem={onEditItem}
          />
        ))}
      </ul>

      {/* Footer with sorting options and clear button */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Dropdown for sorting */}
        <select
          className="px-2 appearance-none bg-slate-50 hover:bg-slate-100 dark:bg-gray-950 dark:hover:bg-slate-800 py-1 border border-slate-300 dark:border-gray-800 rounded-md cursor-pointer focus:border-gray-700 focus:outline-none text-[12px] font-medium text-slate-600 dark:text-slate-300"
          value={sortBy}
          onChange={(e) => handleSortBy(e)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by alphabetical</option>
          <option value="checked">Sort by completed</option>
        </select>

        {/* Button to clear the list */}
        <button
          onClick={() => onClearList("all")}
          className="text-slate-600 dark:text-slate-300 text-[12px] font-medium hover:text-slate-900 dark:hover:text-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
          disabled={items.length === 0}
        >
          Clear List
        </button>
      </div>
    </div>
  );
};
