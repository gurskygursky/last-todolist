import React, {useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksFilterType, TaskType, Todolist, TodolistType} from './Todolist';
import {InputForm} from './components/InputForm';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './reducers/tasks-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from './reducers/todolist-reducer';

export const AppWithReducer: React.FC = () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [lists, setListsDispatch] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'Reading list', filter: 'All'},
        {id: todolistID2, title: 'What to learn ', filter: 'All'},
    ]);

    const [tasks, setTasksDispatch] = useReducer(tasksReducer, {
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

    const removeTask = (todolistID: string, taskID: string) => {
        setTasksDispatch(removeTaskAC(todolistID, taskID));
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter((task: TaskType) => task.id !== taskID)});
    }

    const addTask = (todolistID: string, title: string) => {
        setTasksDispatch(addTaskAC(todolistID, title));
        // setTasks({...tasks, [todolistID]: [{id: v1(), title, isDone: false}, ...tasks[todolistID]]});
    }

    const changeTasksFilter = (todolistID: string, filter: TasksFilterType) => {
        setListsDispatch(changeTodolistFilterAC(todolistID, filter));
        // setLists(lists.map(list => list.id === todolistID ? {...list, filter} : list));
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasksDispatch(changeTaskStatusAC(todolistID, taskID, isDone));
        // setTasks({
        //     ...tasks, [todolistID]: tasks[todolistID].map((task: TaskType) => task.id === taskID
        //         ? {...task, isDone}
        //         : task)
        // })
    }

    const removeTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID);
        setListsDispatch(action);
        setTasksDispatch(action);
        // setLists(lists.filter((list: TodolistType) => list.id !== todolistID));
        // delete tasks[todolistID];
        // setTasks({...tasks});
        // console.log(tasks);
    }

    const addTodolist = (value: string) => {
        const action = addTodolistAC(value);
        setListsDispatch(action);
        setTasksDispatch(action);
        // const newTodolistID = v1();
        // const newTodolist: TodolistType = {id: newTodolistID, title: value, filter: 'All'};
        // setLists([...lists, newTodolist]);
        // setTasks({[newTodolistID]: [], ...tasks});
    }

    const changeTodolistTitle = (todolistID: string, value: string) => {
        setListsDispatch(changeTodolistTitleAC(todolistID, value));
        // setLists(lists.map((list: TodolistType) => list.id === todolistID ? {...list, title: value} : list));
    }
    const changeTaskTitle = (todolistID: string, taskID: string, value: string) => {
        setTasksDispatch(changeTaskTitleAC(todolistID, taskID, value));
        // setTasks({
        //     ...tasks, [todolistID]:
        //         tasks[todolistID].map((task: TaskType) => task.id === taskID
        //             ? {...task, title: value}
        //             : task)
        // });
    }

    return (
        <div className="App">
            <InputForm callback={addTodolist}/>
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
                              changeTaskTitle={changeTaskTitle}
                    />
                )
            })}
        </div>
    );
}
