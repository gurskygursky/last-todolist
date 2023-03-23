import React, {memo} from 'react';
import {TaskType} from './Todolist';
import {Checkbox} from './components/Checkbox';
import {EditForm} from './components/EditForm';
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";

type PropsType = {
    task: TaskType;
    todolistID: string;
}

export const Task: React.FC<PropsType> = memo((props) => {

    const dispatch = useDispatch();

    const removeTask = () => {
        dispatch(removeTaskAC(props.todolistID, props.task.id));
    }

    const onChangeCheckboxHandler = (isDone: boolean) => {
        dispatch(changeTaskStatusAC(props.todolistID, props.task.id, isDone));
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(props.todolistID, props.task.id, title));
    }

    return (
        <li className={props.task.isDone ? 'isDone' : ''}
        >
            <Checkbox isDone={props.task.isDone}
                      callback={(isDone) => onChangeCheckboxHandler(isDone)}
            />
            <EditForm callback={changeTaskTitle} value={props.task.title}/>
            <button onClick={removeTask}>x</button>
        </li>
    )
});
