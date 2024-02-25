/* eslint-disable react/prop-types */
export const Modal = ({ itemId, onClose, onConfirmDelete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-700 bg-opacity-80">
      <div className="bg-slate-50 dark:bg-gray-950 py-6 rounded-md w-96 shadow-md">
        <h2 className="text-xl dark:text-slate-50 font-semibold pb-6 border-b border-slate-300 dark:border-gray-800 px-6">
          Are you sure?
        </h2>
        <div className="flex justify-end gap-4 pt-6 px-6">
          <button
            onClick={onClose}
            className="px-4 py-1 font-medium bg-slate-50 dark:bg-gray-950 dark:hover:bg-gray-900 hover:bg-slate-100 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 font-medium dark:border-slate-300 border-gray-800 bg-slate-950 hover:bg-gray-800 text-gray-50 dark:bg-slate-50 dark:text-gray-800 dark:hover:bg-slate-100 rounded-md"
            onClick={() => onConfirmDelete(itemId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
