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
  let sortedItems = items; //  DERIVED STATE
  if (sortBy === "description") {
    sortedItems = items.slice().sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "checked") {
    sortedItems = items.slice().sort((a, b) => a.checked - b.checked);
  } else {
    sortedItems = items;
  }

  return (
    <div className="mt-6 mb-2 border border-slate-300 rounded-md">
      <div className="px-6 py-4 border-b border-slate-300">
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
          className="px-2 appearance-none py-1 border border-slate-300 rounded-md cursor-pointer hover:border-slate-500 focus:border-slate-500 focus:outline-none"
          value={sortBy}
          onChange={(e) => handleSortBy(e)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="checked">Sort by checked</option>
        </select>
        <button
          onClick={onClearList}
          className="text-slate-400 hover:text-slate-900 :disabled:text-slate-300 disabled:cursor-not-allowed disabled:text-slate-300"
          {...(items.length === 0 && { disabled: true })}
        >
          Clear List
        </button>
      </div>
    </div>
  );
};
