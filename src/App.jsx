/* eslint-disable react/prop-types */
import { useState } from "react";
import "./components/Header";
import { Form } from "./components/Form";
import "./App.css";
import { Header } from "./components/Header";
import { List } from "./components/List";

const initialItems = [
  { id: 1, title: "Paris", checked: true },
  { id: 2, title: "London", checked: false },
  { id: 3, title: "Barcelona", checked: false },
];

function App() {
  const [items, setItems] = useState(initialItems);

  /**
   * handleAddItem
   */
  function handleAddItem(item) {
    setItems((items) => {
      return [...items, item];
    });
  }
  /**
   * handleCheckItem
   */
  function handleCheckItem(id) {
    setItems((items) => {
      return items.map((item) => {
        if (item.id !== id) return item;
        return { ...item, checked: !item.checked };
      });
    });
  }
  /**
   * handleDeleteItem
   */
  function handleDeleteItem(id) {
    setItems((items) => {
      return items.filter((item) => item.id !== id);
    });
  }
  /**
   * handleClearList
   */
  function handleClearList() {
    if (window.confirm("Are you sure you want to clear the list?")) {
      setItems([]);
    }
  }

  return (
    <div className="App container max-w-[640px] px-4 pt-20 mx-auto ">
      <Header />
      <Form onAddItem={handleAddItem} />
      <List
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckItem={handleCheckItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

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
  const numItems = items.length; // Derived State
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
