import React, { useState } from "react";
import Counter from "./components/counter";
import ClassCounter from "./components/classCounter";

function App() {
  const [value, setValue] = useState('Текст в инпуте')
  return (
    <div className="App">
      <Counter />
      <Counter />
      <Counter />
      <ClassCounter />
      <h1>{value}</h1>
      <input
        type="text"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </div>
  );
}

export default App;
