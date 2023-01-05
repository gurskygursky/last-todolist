import React, {useState} from 'react';
import './App.css';
import {TasksFilterType, TaskType, Todolist} from './Todolist';

export const App: React.FC = () => {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'The Madness Of Crowds', isDone: true},
        {id: 2, title: 'Atomic Habits:', isDone: true},
        {id: 3, title: 'The Rise and Fall of the Third Reich', isDone: true},
        {id: 4, title: 'JavaScript for Kids', isDone: true},
        {id: 5, title: `JavaScript Absolute Beginner's Guide`, isDone: false},
    ]);

    const [filter, setFilter] = useState<TasksFilterType>('All');

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

    const addTask = (title: string) => {
        setTasks([{id: new Date().getTime(), title, isDone: false}, ...tasks]);
    }

    return (
        <div className="App">
            <Todolist title={'Reading list'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      setFilter={setFilter}
                      addTask={addTask}
            />
        </div>
    );
}
