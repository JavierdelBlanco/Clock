import React from "react";
import Clock from "./components/Clock";
import './App.css'


function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="arm">
            <Clock/>
        </div>
      </div>
    </div>
  );
}

export default App;
