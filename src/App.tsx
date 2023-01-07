import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksFilterType, TaskType, Todolist, TodolistType} from './Todolist';

export const App: React.FC = () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [lists, setLists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'Reading list', filter: 'All'},
        {id: todolistID2, title: 'What to learn ', filter: 'All'},
    ]);

    const [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'The Madness Of Crowds', isDone: true},
            {id: v1(), title: 'Atomic Habits:', isDone: true},
            {id: v1(), title: 'The Rise and Fall of the Third Reich', isDone: true},
            {id: v1(), title: 'JavaScript for Kids', isDone: true},
            {id: v1(), title: `JavaScript Absolute Beginner's Guide`, isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'Javascript', isDone: true},
            {id: v1(), title: 'Typescript', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Node.JS', isDone: false},
        ],
    });

    // const [tasks, setTasks] = useState([
    //     {id: v1(), title: 'The Madness Of Crowds', isDone: true},
    //     {id: v1(), title: 'Atomic Habits:', isDone: true},
    //     {id: v1(), title: 'The Rise and Fall of the Third Reich', isDone: true},
    //     {id: v1(), title: 'JavaScript for Kids', isDone: true},
    //     {id: v1(), title: `JavaScript Absolute Beginner's Guide`, isDone: false},
    // ]);

    // const [filter, setFilter] = useState<TasksFilterType>('All');

    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter((task: TaskType) => task.id !== taskID)});
        // setTasks(tasks.filter((task: TaskType) => task.id !== taskID));
    }
    //
    // let tasksForTodolist = tasks;
    //
    // if (filter === 'Active') {
    //     tasksForTodolist = tasks.filter((task: TaskType) => !task.isDone)
    // }
    // if (filter === 'Completed') {
    //     tasksForTodolist = tasks.filter((task: TaskType) => task.isDone)
    // }

    const addTask = (title: string) => {
        // setTasks([{id: v1(), title, isDone: false}, ...tasks]);
    }

    const changeTasksFilter = (todolistID: string, filter: TasksFilterType) => {
        setLists(lists.map(list => list.id === todolistID ? {...list, filter} : list));
        // setFilter(filter)
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        // setTasks(tasks.map((task: TaskType) => task.id === taskID ? {...task, isDone} : task));
    }

    return (
        <div className="App">
            {lists.map((list: TodolistType) => {

                let tasksForTodolist = tasks[list.id];

                if (list.filter === 'Active') {
                    tasksForTodolist = tasks[list.id].filter((task: TaskType) => !task.isDone)
                }
                if (list.filter === 'Completed') {
                    tasksForTodolist = tasks[list.id].filter((task: TaskType) => task.isDone)
                }

                return (
                    <Todolist title={list.title}
                              key={list.id}
                              todolistID={list.id}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              filter={list.filter}
                              changeTasksFilter={changeTasksFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                    />
                )
            })}
            {/*<Todolist title={'Reading list'}*/}
            {/*          tasks={tasksForTodolist}*/}
            {/*          removeTask={removeTask}*/}
            {/*          filter={filter}*/}
            {/*          changeTasksFilter={changeTasksFilter}*/}
            {/*          addTask={addTask}*/}
            {/*          changeTaskStatus={changeTaskStatus}*/}
            {/*/>*/}
        </div>
    );
}
