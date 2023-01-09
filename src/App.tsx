import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksFilterType, TaskType, Todolist, TodolistType} from './Todolist';
import {InputForm} from './components/InputForm';

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

    const addTask = (todolistID: string, title: string) => {
        setTasks({...tasks, [todolistID]: [{id: v1(), title, isDone: false}, ...tasks[todolistID]]});
        // setTasks([{id: v1(), title, i sDone: false}, ...tasks]);
    }

    const changeTasksFilter = (todolistID: string, filter: TasksFilterType) => {
        setLists(lists.map(list => list.id === todolistID ? {...list, filter} : list));
        // setFilter(filter)
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map((task: TaskType) => task.id === taskID
                ? {...task, isDone}
                : task)
        })
        // setTasks(tasks.map((task: TaskType) => task.id === taskID ? {...task, isDone} : task));
    }

    const removeTodolist = (todolistID: string) => {
        setLists(lists.filter((list: TodolistType) => list.id !== todolistID));
        delete tasks[todolistID];
        setTasks({...tasks});
        console.log(tasks);
    }

    // const [value, setValue] = useState<string>('');

    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setValue(event.currentTarget.value);
    // }

    const addTodolist = (value: string) => {
        const newTodolistID = v1();
        const newTodolist: TodolistType = {id: newTodolistID, title: value, filter: 'All'};
        setLists([...lists, newTodolist]);
        setTasks({[newTodolistID]: [], ...tasks});
        // setValue('');
    }

    const changeTodolistTitle = (todolistID: string, value: string) => {
        setLists(lists.map((list: TodolistType) => list.id === todolistID ? {...list, title: value} : list));
    }

    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     const {key} = event;
    //
    //     if (key === 'Enter') {
    //         addTodolist(value);
    //         setValue('');
    //     }
    // }

    return (
        <div className="App">
            <InputForm callback={addTodolist}/>
            {/*<div>*/}
            {/*    <input type={'text'} value={value} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>*/}
            {/*    <button onClick={() => addTodolist(value)}>+</button>*/}
            {/*</div>*/}
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
                              removeTodolist={removeTodolist}
                              changeTodolistTitle={changeTodolistTitle}
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
