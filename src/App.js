import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/header/Header';
import { isEmptyObj } from './utils/utils';
import './App.css';

const randomColor = require('randomcolor');
const axios = require('axios').default;

const App = () => {
  const [item, setItem] = useState('');
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (isEmptyObj(profile)) {
      localStorage.setItem('items', JSON.stringify(items));
    }
  }, [items]);

  const keypress = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      newItem();
    }
  };

  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        item,
        color: randomColor({ luminosity: 'light' }),
        defaultPos: { x: 100, y: 0 },
      };
      setItems((items) => [...items, newItem]);
      addNewNoteToProfile(newItem);
      setItem('');
    } else {
      alert('Enter an item');
      setItem('');
    }
  };

  const addNewNoteToProfile = (note) => {
    if (!isEmptyObj(profile)) {
      axios
        .post('http://localhost:4200/note', {
          email: profile.email,
          note,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const removeNoteFromProfile = (noteId) => {
    if (!isEmptyObj(profile)) {
      axios
        .delete('http://localhost:4200/note', {
          data: { email: profile.email, id: noteId },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const updatePos = (data, index) => {
    if (
      !(
        items[index].defaultPos.x === data.x &&
        items[index].defaultPos.y === data.y
      )
    ) {
      const updatedItems = [...items];
      updatedItems[index].defaultPos = { x: data.x, y: data.y };
      addNewNoteToProfile(updatedItems[index]);
      setItems(updatedItems);
    }
  };

  const deleteNote = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
    removeNoteFromProfile(itemId);
  };

  const loggedOutHandler = () => {
    setItems(JSON.parse(localStorage.getItem('items')) || []);
  };

  return (
    <div className="App">
      <header className="header">
        <Header
          profile={profile}
          setProfile={setProfile}
          setItems={setItems}
          loggedOutHandler={loggedOutHandler}
        />
      </header>
      <header className="App-container">
        <div className="search-bar">
          <input
            className="search"
            value={item}
            onChange={(event) => setItem(event.target.value)}
            placeholder="Enter something..."
            onKeyPress={(event) => keypress(event)}
          />
          <button className="enter" onClick={newItem}>
            ENTER
          </button>
        </div>
        {items &&
          items.map((item, index) => {
            return (
              <Draggable
                key={item.id}
                defaultPosition={item.defaultPos}
                onStop={(e, data) => {
                  updatePos(data, index);
                }}
              >
                <div style={{ backgroundColor: item.color }} className="box">
                  {`${item.item}`}
                  <button
                    className="delete"
                    onClick={(event) => deleteNote(item.id)}
                  >
                    X
                  </button>
                </div>
              </Draggable>
            );
          })}
      </header>
    </div>
  );
};

export default App;
