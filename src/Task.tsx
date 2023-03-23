import React, {ChangeEvent, memo, useCallback} from 'react';
import {TaskType} from './Todolist';
import {Checkbox} from './components/Checkbox';
import {EditForm} from './components/EditForm';

type PropsType = {
    task: TaskType;
    todolistID: string;
    onChangeCheckboxHandler: (taskID: string, isDone: boolean) => void;
    changeTaskTitle: (taskID: string, title: string) => void;
    removeTask: (todolistID: string, taskID: string) => void;
}

export const Task: React.FC<PropsType> = memo((props) => {

    const removeTask = useCallback(() => {
        props.removeTask(props.todolistID, props.task.id);
    }, [props.removeTask, props.todolistID, props.task.id]);

    const onChangeHandler = useCallback((isDone: boolean) => {
        props.onChangeCheckboxHandler(props.task.id, isDone);
    }, [props.onChangeCheckboxHandler, props.task.id]);

    const callbackHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title);
    }, [props.changeTaskTitle, props.task.id]);

    return (
        <li className={props.task.isDone ? 'isDone' : ''}
        >
            <Checkbox isDone={props.task.isDone}
                      callback={(isDone) => onChangeHandler(isDone)}
            />
            <EditForm callback={callbackHandler} value={props.task.title}/>
            <button onClick={removeTask}>x</button>
        </li>
    )
});
