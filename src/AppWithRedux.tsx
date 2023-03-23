import React, {memo, useCallback} from 'react';
import './App.css';
import {TasksFilterType, TasksType, TaskType, Todolist, TodolistType} from './Todolist';
import {InputForm} from './components/InputForm';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasks-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './reducers/todolist-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

export const AppWithRedux: React.FC = () => {

    const lists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolistReducer);
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasksReducer);
    const dispatch = useDispatch();

    const removeTask = useCallback((todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID));
    }, [dispatch]);

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title));
    }, [dispatch]);

    const changeTasksFilter = useCallback((todolistID: string, filter: TasksFilterType) => {
        dispatch(changeTodolistFilterAC(todolistID, filter));
    }, [dispatch]);

    const changeTaskStatus = useCallback((todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone));
    }, [dispatch]);

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
    }, [dispatch]);

    const addTodolist = useCallback((value: string) => {
        dispatch(addTodolistAC(value));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todolistID: string, value: string) => {
        dispatch(changeTodolistTitleAC(todolistID, value));
    }, [dispatch]);

    const changeTaskTitle = useCallback((todolistID: string, taskID: string, value: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, value));
    }, [dispatch]);

    return (
        <div className="App">
            <InputForm callback={addTodolist}/>
            {lists.map((list: TodolistType) => {

                let tasksForTodolist = tasks[list.id];

                // if (list.filter === 'Active') {
                //     tasksForTodolist = tasks[list.id].filter((task: TaskType) => !task.isDone)
                // }
                // if (list.filter === 'Completed') {
                //     tasksForTodolist = tasks[list.id].filter((task: TaskType) => task.isDone)
                // }

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
};
