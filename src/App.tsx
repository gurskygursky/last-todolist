import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export const App: React.FC = () => {

    // const tasks1 = [
    //     {id: 1, title: 'HTML&CSS', isDone: true},
    //     {id: 2, title: 'JS', isDone: true},
    //     {id: 3, title: 'ReactJS', isDone: false},
    //     {id: 4, title: 'NodeJS', isDone: false},
    //     {id: 5, title: 'Swift', isDone: false},
    // ];
    // const tasks2 = [
    //     {id: 1, title: 'The Madness Of Crowds', isDone: true},
    //     {id: 2, title: 'Atomic Habits:', isDone: true},
    //     {id: 3, title: 'The Rise and Fall of the Third Reich', isDone: true},
    //     {id: 4, title: 'JavaScript for Kids', isDone: true},
    //     {id: 5, title: `JavaScript Absolute Beginner's Guide`, isDone: false},
    // ];

    const [tasks, setTasks] = useState([
            {id: 1, title: 'The Madness Of Crowds', isDone: true},
            {id: 2, title: 'Atomic Habits:', isDone: true},
            {id: 3, title: 'The Rise and Fall of the Third Reich', isDone: true},
            {id: 4, title: 'JavaScript for Kids', isDone: true},
            {id: 5, title: `JavaScript Absolute Beginner's Guide`, isDone: false},
    ]);

    const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== taskID));
    }

    let tasksForTodolist = tasks;

    if (filter === 'Active') {
        tasksForTodolist = tasks.filter((task) => task.isDone)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter((task: TaskType) => !task.isDone)
    }

    return (
        <div className="App">
            {/*<Todolist title={'What to learn'} tasks={tasks1}/>*/}
            {/*<Todolist title={'What to buy'} tasks={tasks2}/>*/}
            <Todolist title={'Reading list'} tasks={tasksForTodolist} removeTask={removeTask} setFilter={setFilter}/>
        </div>
    );
}
