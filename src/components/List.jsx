/* eslint-disable react/prop-types */
import { useState } from "react";
import { Item } from "./Item";

export const List = ({ items, onDeleteItem, onCheckItem, onClearList }) => {
  const [sortBy, setSortBy] = useState("input");
  const [filterBy, setFilterBy] = useState("all");

  //Handle SortBy
  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  /**
   * handleFilterBy
   */
  function handleFilterBy(value) {
    setFilterBy(value);
  }

  let filteredItems = items;
  let sortedItems = filteredItems;
  //Filter items based on filterBy value
  if (filterBy === "checked") {
    filteredItems = filteredItems.filter((item) => item.checked);
  } else if (filterBy === "active") {
    filteredItems = filteredItems.filter((item) => !item.checked);
  } else {
    filteredItems = items;
  }
  //Sort items based on sortBy value
  if (sortBy === "description") {
    sortedItems = filteredItems
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "checked") {
    sortedItems = filteredItems.slice().sort((a, b) => a.checked - b.checked);
  } else {
    sortedItems = filteredItems;
  }

  return (
    <div className="mt-6 mb-2 border border-slate-300 dark:border-gray-800 rounded-md">
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-300 dark:border-gray-800">
        <h2 className="text-[24px] font-semibold">Tasks</h2>
        <div className="flex gap-2 text-[12px] text-slate-600 dark:text-slate-500">
          <button
            onClick={() => handleFilterBy("all")}
            role="radio"
            name="filterBy"
            aria-checked={filterBy === "all"}
            tabIndex={0}
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
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onCheckItem={onCheckItem}
          />
        ))}
      </ul>
      <div className="flex items-center justify-between px-6 py-4">
        <select
          className="px-2 appearance-none bg-slate-50 hover:bg-slate-100 dark:bg-gray-950 dark:hover:bg-slate-800 py-1 border border-slate-300 dark:border-gray-800 rounded-md cursor-pointer focus:border-gray-700 focus:outline-none text-[12px] font-medium text-slate-600 dark:text-slate-300"
          value={sortBy}
          onChange={(e) => handleSortBy(e)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by alphabetical</option>
          <option value="checked">Sort by completed</option>
        </select>
        <button
          onClick={onClearList}
          className="text-slate-600 dark:text-slate-300 text-[12px] font-medium  hover:text-slate-900 dark:hover:text-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
          {...(items.length === 0 && { disabled: true })}
        >
          Clear List
        </button>
      </div>
    </div>
  );
};
