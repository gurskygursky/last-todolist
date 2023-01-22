import React from 'react';
import {TaskType} from './Todolist';
import {Checkbox} from './components/Checkbox';
import {EditForm} from './components/EditForm';

type PropsType = {
    tasks: Array<TaskType>;
    todolistID: string;
    onChangeCheckboxHandler: (taskID: string, isDone: boolean) => void;
    changeTaskTitle: (taskID: string, title: string) => void;
    removeTask: (todolistID: string, taskID: string) => void;
}

export const Tasks: React.FC<PropsType> = (props) => {
    return (
        <ul className={'list'}>
            {
                props.tasks.map((task: TaskType) => <li key={task.id} className={task.isDone ? 'isDone' : ''}
                >
                    <Checkbox isDone={task.isDone}
                              callback={(isDone) => props.onChangeCheckboxHandler(task.id, isDone)}
                    />
                    <EditForm callback={(value) => props.changeTaskTitle(task.id, value)} value={task.title}/>
                    <button onClick={() => props.removeTask(props.todolistID, task.id)}>x</button>
                </li>)
            }
        </ul>
    )
};
