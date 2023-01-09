import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {InputForm} from './components/InputForm';

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

export type TasksFilterType = 'All' | 'Active' | 'Completed';

type PropsType = {
    title: string;
    todolistID: string;
    tasks: Array<TaskType>;
    removeTask: (todolistID: string, taskID: string) => void;
    filter: TasksFilterType;
    changeTasksFilter: (todolistID: string, filter: TasksFilterType) => void;
    addTask: (todolistID: string, value: string) => void;
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void;
    removeTodolist: (todolistID: string) => void;
}

export const Todolist: React.FC<PropsType> = (props) => {

    // const [value, setValue] = useState<string>('');
    // const [error, setError] = useState<string | null>('');

    const removeTask = (todolistID: string, taskID: string) => {
        props.removeTask(props.todolistID, taskID);
    }

    const onChangeTasksFilterHandler = (todolistID: string, filter: TasksFilterType) => {
        props.changeTasksFilter(todolistID, filter);
    }

    const addTask = (value: string) => {
            props.addTask(props.todolistID, value);
    }

    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setValue(event.currentTarget.value);
    //     setError(null);
    // }

    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //
    //     const {key} = event;
    //
    //     if (key === 'Enter') {
    //         addTask();
    //     }
    // }

    const onChangeCheckboxHandler = (taskID: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistID, taskID, isDone)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistID);
    }

    return (
        <div>
            <div>
                <h3>
                    {props.title}
                    <button onClick={removeTodolist}>x</button>
                </h3>
                <InputForm callback={addTask} />
                {/*<input style={error ? {borderColor: 'crimson'} : {}} type={'text'} value={value}*/}
                {/*       onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>*/}
                {/*<button onClick={addTask}>+</button>*/}
                {/*<div style={{color: 'crimson'}}>{error}</div>*/}
            </div>
            <div style={{listStyle: 'none', paddingTop: '15px'}}>
                {props.tasks.map((task: TaskType) => <li key={task.id} style={task.isDone ? {opacity: '0.5'} : {}}>
                    <input type={'checkbox'} checked={task.isDone}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeCheckboxHandler(task.id, event.currentTarget.checked)}
                    />
                    {task.title}
                    <button onClick={() => removeTask(props.todolistID, task.id)}>x</button>
                </li>)}
            </div>
            <div style={{paddingTop: '15px'}}>
                <button style={props.filter === 'All' ? {backgroundColor: 'deepskyblue'} : {}}
                        onClick={() => onChangeTasksFilterHandler(props.todolistID, 'All')}>All
                </button>
                <button style={props.filter === 'Active' ? {backgroundColor: 'deepskyblue'} : {}}
                        onClick={() => onChangeTasksFilterHandler(props.todolistID, 'Active')}>Active
                </button>
                <button style={props.filter === 'Completed' ? {backgroundColor: 'deepskyblue'} : {}}
                        onClick={() => onChangeTasksFilterHandler(props.todolistID, 'Completed')}>Completed
                </button>
            </div>
        </div>
    );
};
