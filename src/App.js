import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const randomColor = require('randomcolor');

const App = () => {
  const [item, setItem] = useState('');
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
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
      setItem('');
    } else {
      alert('Enter an item');
      setItem('');
    }
  };

  const updatePos = (data, index) => {
    const updatedItems = [...items];
    updatedItems[index].defaultPos = { x: data.x, y: data.y };
    setItems(updatedItems);
  };

  const deleteNote = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };
  return (
    <div className="App">
      <header className="App-header">
        <input
          value={item}
          onChange={(event) => setItem(event.target.value)}
          placeholder="Enter something..."
          onKeyPress={(event) => keypress(event)}
        />
        <button onClick={newItem}> ENTER </button>
        {items.map((item, index) => {
          return (
            <Draggable
              key={item.id}
              defaultPosition={item.defaultPos}
              onStop={(e, data) => updatePos(data, index)}
            >
              <div style={{ backgroundColor: item.color }} className="box">
                {`${item.item}`}
                <button id="delete" onClick={(event) => deleteNote(item.id)}>
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
