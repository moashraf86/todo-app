/* eslint-disable react/prop-types */

/**
 * Item component represents a single task item in the list.
 */
export const Item = ({ item, onDeleteItem, onCheckItem, onEditItem }) => {
  const deleteMessage = "Are you sure you want to delete this item?";
  return (
    <li
      className="flex items-center px-6 py-4 border-b border-slate-300 dark:border-gray-800"
      style={item.packed ? { textDecoration: "line-through" } : {}}
    >
      {/* Checkbox for marking item as checked */}
      <input
        id={item.id}
        type="checkbox"
        onChange={() => onCheckItem(item.id)}
        checked={item.checked}
        className="hidden"
      />

      {/* Label and title of the task */}
      <label
        className="flex gap-4 items-start text-md font-normal me-auto cursor-pointer"
        htmlFor={item.id}
      >
        {/* Checkbox button */}
        <button
          className={`w-6 h-6 min-w-6 border border-slate-300 dark:border-gray-800 rounded-full flex items-center justify-center ${
            item.checked ? "bg-slate-800 border-gray-900" : ""
          }`}
          role="checkbox"
          aria-checked={item.checked}
          tabIndex={0}
          onClick={() => onCheckItem(item.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={item.checked ? 2 : 0}
            stroke="#fff"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </button>

        {/* Title of the task */}
        <span
          className={`${
            item.checked
              ? "line-through italic text-slate-400 dark:text-slate-600"
              : ""
          }`}
        >
          {item.title}
        </span>
      </label>

      {/* Buttons for editing and deleting the task */}
      <div className="flex gap-4 items-center ml-auto">
        {/* Edit button */}
        <button onClick={() => onEditItem(item.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>

        {/* Delete button */}
        <button onClick={() => onDeleteItem(item.id, deleteMessage)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};
