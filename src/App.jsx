/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { List } from "./components/List";
import { Modal } from "./components/Modal";

// Default items for initialization
const defaultItems = [
  { id: 1, title: "Task 1", checked: true },
  { id: 2, title: "Task 2", checked: false },
  { id: 3, title: "Task 3", checked: false },
];

function App() {
  // State variables
  const [items, setItems] = useState(initialItems);
  const [showModal, setShowModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);

  const [edited, setEdited] = useState(false);
  const myRef = useRef(null);

  // Function to get initial items from local storage or use default items
  function initialItems() {
    const localItems = JSON.parse(localStorage.getItem("items")) || [];
    if (localItems.length > 0) {
      return localItems;
    } else {
      localStorage.setItem("items", JSON.stringify(defaultItems));
      return defaultItems;
    }
  }

  // Function to handle adding an item
  function handleAddItem(item) {
    setItems((prevItems) => [...prevItems, item]);
    localStorage.setItem("items", JSON.stringify([...items, item]));
  }

  // Function to handle updating an item
  function handleUpdateItem(updatedItem) {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id !== updatedItem.id ? item : updatedItem))
    );
    localStorage.setItem("items", JSON.stringify(items));
  }

  // Function to handle checking/unchecking an item
  function handleCheckItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id !== id ? item : { ...item, checked: !item.checked }
      )
    );
    localStorage.setItem("items", JSON.stringify(items));
  }

  // Function to handle deleting an item
  function handleDeleteItem(id) {
    // delete all items if id is "all"
    if (id === "all") {
      setItems([]);
      localStorage.setItem("items", JSON.stringify([]));
      setShowModal(false);
      return;
    }
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setShowModal(false);
    localStorage.setItem(
      "items",
      JSON.stringify(items.filter((item) => item.id !== id))
    );
  }

  // Function to handle editing an item
  function handleEditItem(id) {
    const editedItem = items.find((item) => item.id === id);
    setEditedItem(editedItem);
    myRef.current.focus();
    myRef.current.scrollIntoView({ behavior: "smooth" });
    setEdited(false);
  }

  // Function to handle opening the modal
  function handleOpenModal(id) {
    setShowModal(true);
    setDeletedItem(id);
  }

  // Function to handle closing the modal
  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="App container max-w-[640px] px-4 pt-20 mx-auto">
      <Header />
      <Form
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        editedItem={editedItem}
        myRef={myRef}
        setEdited={setEdited}
        edited={edited}
      />
      <List
        items={items}
        onDeleteItem={handleOpenModal}
        onCheckItem={handleCheckItem}
        onClearList={handleOpenModal}
        onEditItem={handleEditItem}
      />
      {showModal &&
        createPortal(
          <Modal
            message={
              deletedItem === "all"
                ? "You're about to delete all items."
                : "You're about to delete this item."
            }
            deletedItem={deletedItem}
            items={items}
            onClose={handleCloseModal}
            onConfirmDelete={handleDeleteItem}
          />,
          document.body
        )}
      <Stats items={items} />
    </div>
  );
}

// Stats component to display statistics
function Stats({ items }) {
  if (!items.length) {
    return (
      <div className="text-center">
        <em className="text-slate-400 text-[12px]">
          Start adding some items to your list
        </em>
      </div>
    );
  }

  const numItems = items.length;
  const numChecked = items.filter((item) => item.checked).length;
  const percentage = Math.round((numChecked / numItems) * 100);

  return (
    <div className="text-center">
      <em className="text-slate-400 text-[12px]">
        {percentage === 100
          ? "You got everything Done"
          : `You have ${numItems} items on your list, and you already checked ${numChecked} (${percentage}%)
        `}
      </em>
    </div>
  );
}

export default App;
