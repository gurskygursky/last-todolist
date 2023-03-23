import React, {memo} from 'react';
import {InputForm} from './components/InputForm';
import {EditForm} from './components/EditForm';
import {Task} from './Task';
import {useDispatch, useSelector} from "react-redux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./reducers/todolist-reducer";
import {addTaskAC} from "./reducers/tasks-reducer";
import {AppRootStateType} from "./reducers/store";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type TodolistType = {
    id: string;
    title: string;
    filter: TasksFilterType;
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

export type TasksFilterType = 'All' | 'Active' | 'Completed';

type PropsType = {
    todolist: TodolistType;
}

export const Todolist: React.FC<PropsType> = memo(({todolist}) => {

    let todolistTasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasksReducer[todolist.id]);
    const dispatch = useDispatch();

    const addTask = (value: string) => {
        dispatch(addTaskAC(todolist.id, value));
    }
    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolist.id));
    }
    const changeTodolistTitle = (value: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, value));
    };

    if (todolist.filter === 'Active') {
        todolistTasks = todolistTasks.filter((task: TaskType) => !task.isDone)
    }
    if (todolist.filter === 'Completed') {
        todolistTasks = todolistTasks.filter((task: TaskType) => task.isDone)
    }

    const onChangeFilterHandler = (filter: TasksFilterType) => {
        dispatch(changeTodolistFilterAC(todolist.id, filter));
    }

    return (
        <div>
            <div>
                <h3>
                    <EditForm value={todolist.title} callback={changeTodolistTitle}/>
                    <button onClick={removeTodolist}>x</button>
                </h3>
                <InputForm callback={addTask}/>
            </div>
            <ul className={'list'}>
                {
                    todolistTasks.map((task: TaskType) => <Task task={task}
                                                                key={task.id}
                                                                todolistID={todolist.id}
                        />
                    )}
            </ul>
            <div className={'blockButtons'}>
                <button className={todolist.filter === 'All' ? 'button' : ''}
                        onClick={() => onChangeFilterHandler('All')}>All
                </button>
                <button className={todolist.filter === 'Active' ? 'button' : ''}
                        onClick={() => onChangeFilterHandler('Active')}>Active
                </button>
                <button className={todolist.filter === 'Completed' ? 'button' : ''}
                        onClick={() => onChangeFilterHandler('Completed')}>Completed
                </button>
            </div>
        </div>
    );
});
