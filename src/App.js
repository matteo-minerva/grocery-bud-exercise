import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [listTitle, setListTitle] = useState("");
  const [groceryList, setGroceryList] = useState([]);
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState();

  const addItem = (event) => {
    event.preventDefault();

    if (!listTitle) {
      console.log("Empty value");
      setAlert({
        status: "danger",
        message: "please enter value",
      });
      setShowAlert(true);
    } else if (listTitle && isEditing) {
      setGroceryList(
        groceryList.map((item) => {
          if (item.id === editId) {
            return { ...item, title: listTitle };
          }
          return item;
        })
      );
      setListTitle("");
      setIsEditing(false);
      setEditId(null);
      setShowAlert(true);
      setAlert({ status: "success", message: "value changed" });
    } else {
      const newItem = {
        id: uuidv4(),
        title: listTitle,
      };

      setGroceryList((groceryList) => [...groceryList, newItem]);
      setListTitle("");
      setAlert({
        ...alert,
        status: "success",
        message: "item added to the list",
      });
      setShowAlert(true);
    }
  };

  const removeItem = (id) => {
    const updatedList = groceryList.filter((item) => item.id !== id);
    setGroceryList(updatedList);
    setAlert({
      status: "danger",
      message: "item removed",
    });
    setShowAlert(true);
  };

  const editItem = (id) => {
    setIsEditing(true);
    const itemToEdit = groceryList.find((item) => item.id === id);
    setListTitle(itemToEdit.title);
    setEditId(itemToEdit.id);
  };

  const clearList = () => {
    setGroceryList([]);
    setListTitle("");
    setAlert({
      status: "danger",
      message: "empty list",
    });
    setShowAlert(true);
  };

  return (
    <>
      <section className="section-center">
        <form className="grocery-form" onSubmit={addItem}>
          {showAlert && (
            <Alert alert={alert} closeAlert={() => setShowAlert(false)} />
          )}
          <h3>Grocery bud</h3>

          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e.g. eggs"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>

        <div className="grocery-container">
          <div className="grocery-list">
            {groceryList.map((item) => {
              return (
                <List
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  removeItem={removeItem}
                  editItem={editItem}
                />
              );
            })}
          </div>
          {groceryList.length > 0 && (
            <button className="clear-btn" onClick={clearList}>
              clear items
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
