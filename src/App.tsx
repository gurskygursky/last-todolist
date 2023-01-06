import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksFilterType, TaskType, Todolist} from './Todolist';

export const App: React.FC = () => {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'The Madness Of Crowds', isDone: true},
        {id: v1(), title: 'Atomic Habits:', isDone: true},
        {id: v1(), title: 'The Rise and Fall of the Third Reich', isDone: true},
        {id: v1(), title: 'JavaScript for Kids', isDone: true},
        {id: v1(), title: `JavaScript Absolute Beginner's Guide`, isDone: false},
    ]);

    const [filter, setFilter] = useState<TasksFilterType>('All');

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== taskID));
    }

    let tasksForTodolist = tasks;

    if (filter === 'Active') {
        tasksForTodolist = tasks.filter((task: TaskType) => !task.isDone)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter((task: TaskType) => task.isDone)
    }

    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks]);
    }

    const changeTasksFilter = (filter: TasksFilterType) => {
        setFilter(filter)
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map((task: TaskType) => task.id === taskID ? {...task, isDone} : task));
    }

    return (
        <div className="App">
            <Todolist title={'Reading list'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      filter={filter}
                      changeTasksFilter={changeTasksFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}
