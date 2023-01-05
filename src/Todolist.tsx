import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TasksFilterType = 'All' | 'Active' | 'Completed';

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskID: string) => void;
    changeTasksFilter: (filter: TasksFilterType) => void;
    addTask: (value: string) => void;
}

export const Todolist: React.FC<PropsType> = (props) => {

    const [value, setValue] = useState<string>('');

    const removeTask = (taskID: string) => {
        props.removeTask(taskID);
    }

    const onChangeTasksFilterHandler = (filter: TasksFilterType) => {
        props.changeTasksFilter(filter);
    }

    const addTask = () => {
        props.addTask(value);
        setValue('');
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        const {key} = event;

        if (key === 'Enter') {
            addTask();
        }
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <input type={'text'} value={value} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <div style={{listStyle: 'none', paddingTop: '15px'}}>
                {props.tasks.map((task: TaskType) => <li key={task.id}>
                    <input type={'checkbox'} checked={task.isDone}/>
                    {task.title}
                    <button onClick={() => removeTask(task.id)}>x</button>
                </li>)}
            </div>
            <div style={{paddingTop: '15px'}}>
                <button onClick={() => onChangeTasksFilterHandler('All')}>All</button>
                <button onClick={() => onChangeTasksFilterHandler('Active')}>Active</button>
                <button onClick={() => onChangeTasksFilterHandler('Completed')}>Completed</button>
            </div>
        </div>
    );
};
