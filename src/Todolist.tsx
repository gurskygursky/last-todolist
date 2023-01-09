import React, {ChangeEvent} from 'react';
import {InputForm} from './components/InputForm';
import {EditForm} from './components/EditForm';

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
    changeTodolistTitle: (todolistID: string, value: string) => void;
    changeTaskTitle: (todolistID: string, taskID: string, value: string) => void;
}

export const Todolist: React.FC<PropsType> = (props) => {

    const removeTask = (todolistID: string, taskID: string) => {
        props.removeTask(props.todolistID, taskID);
    }

    const onChangeTasksFilterHandler = (todolistID: string, filter: TasksFilterType) => {
        props.changeTasksFilter(todolistID, filter);
    }

    const addTask = (value: string) => {
        props.addTask(props.todolistID, value);
    }

    const onChangeCheckboxHandler = (taskID: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistID, taskID, isDone)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistID);
    }

    const changeTodolistTitle = (value: string) => {
        props.changeTodolistTitle(props.todolistID, value);
    }
    const changeTaskTitle = (taskID: string, value: string) => {
        props.changeTaskTitle(props.todolistID, taskID, value);
    }

    return (
        <div>
            <div>
                <h3>
                    <EditForm value={props.title} callback={changeTodolistTitle}/>
                    <button onClick={removeTodolist}>x</button>
                </h3>
                <InputForm callback={addTask}/>
            </div>
            <div style={{listStyle: 'none', paddingTop: '15px'}}>
                {props.tasks.map((task: TaskType) => <li key={task.id} style={task.isDone ? {opacity: '0.5'} : {}}>
                    <input type={'checkbox'} checked={task.isDone}
                           onChange={(event: ChangeEvent<HTMLInputElement>) =>
                               onChangeCheckboxHandler(task.id, event.currentTarget.checked)
                           }/>
                    <EditForm callback={(value) => changeTaskTitle(task.id, value)} value={task.title}/>
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
