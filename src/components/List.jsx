/* eslint-disable react/prop-types */
import { useState } from "react";
import { Item } from "./Item";

export const List = ({ items, onDeleteItem, onCheckItem, onClearList }) => {
  const [sortBy, setSortBy] = useState("input");

  //Handle SortBy
  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  //Sort items based on sortBy value
  let sortedItems = items;
  if (sortBy === "description") {
    sortedItems = items.slice().sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "checked") {
    sortedItems = items.slice().sort((a, b) => a.checked - b.checked);
  } else {
    sortedItems = items;
  }
  // update local storage with sorted items
  localStorage.setItem("items", JSON.stringify(sortedItems));

  return (
    <div className="mt-6 mb-2 border border-slate-300 dark:border-gray-800 rounded-md">
      <div className="px-6 py-4 border-b border-slate-300 dark:border-gray-800">
        <h2 className="text-[24px] font-semibold ">Tasks</h2>
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
          <option value="description">Sort by description</option>
          <option value="checked">Sort by checked</option>
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
