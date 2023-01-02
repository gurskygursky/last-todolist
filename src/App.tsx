import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

export const App: React.FC = () => {
    return (
        <div className="App">
            <Todolist title={'What to learn'}/>
            <Todolist title={'What to buy'}/>
            <Todolist title={'What to read'}/>
        </div>
    );
}
