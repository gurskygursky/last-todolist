import React, {useCallback} from 'react';
import './App.css';
import {Todolist, TodolistType} from './Todolist';
import {InputForm} from './components/InputForm';
import {addTodolistAC,} from './reducers/todolist-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

export const App: React.FC = () => {

    const lists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolistReducer);
    const dispatch = useDispatch();

    const addTodolist = useCallback((value: string) => {
        dispatch(addTodolistAC(value));
    }, [dispatch]);

    return (
        <div className="App">
            <InputForm callback={addTodolist}/>
            {lists.map((list: TodolistType) => {

                return (
                    <Todolist key={list.id}
                              todolist={list}
                    />
                )
            })}
        </div>
    );
};
