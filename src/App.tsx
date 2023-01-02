import React from "react";
import "./App.css";

export function App() {
  return (
    <div className="App">
      <Todolist />
      <Todolist />
      <Todolist />

    </div>
  );
}

export const Todolist: React.FC = (props) => {
  return (
    <div>
      <div>
      <h3>What to learn</h3>
      <input />
      </div>
      <div>
        <div style={{listStyle: 'none', paddingTop: '15px'}}>
          <li>
          <input type='checkbox' checked={true}/>
            HTML & CSS
          </li>
          <li>
          <input type='checkbox' checked={true}/>
            Javascript
          </li>
          <li>
          <input type='checkbox' checked={false}/>
            React
          </li>
        </div>
      </div>
    </div>
  );
};
