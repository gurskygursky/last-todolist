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
    filter: TasksFilterType;
    changeTasksFilter: (filter: TasksFilterType) => void;
    addTask: (value: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void;
}

export const Todolist: React.FC<PropsType> = (props) => {

    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string | null>('');

    const removeTask = (taskID: string) => {
        props.removeTask(taskID);
    }

    const onChangeTasksFilterHandler = (filter: TasksFilterType) => {
        props.changeTasksFilter(filter);
    }

    const addTask = () => {
        if (value.trim() !== '') {
            props.addTask(value);
            setValue('');
        }
        if (value.trim() === '') {
            setError('Invalid value!')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
        setError(null);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        const {key} = event;

        if (key === 'Enter') {
            addTask();
        }
    }

    const onChangeCheckboxHandler = (taskID: string, isDone: boolean) => {
        props.changeTaskStatus(taskID, isDone)
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <input style={error ? {borderColor: 'crimson'} : {}} type={'text'} value={value} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                <div style={{color: 'crimson'}}>{error}</div>
            </div>
            <div style={{listStyle: 'none', paddingTop: '15px'}}>
                {props.tasks.map((task: TaskType) => <li key={task.id} style={task.isDone ? {opacity: '0.5'} : {}}>
                    <input type={'checkbox'} checked={task.isDone}
                           onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeCheckboxHandler(task.id, event.currentTarget.checked)}
                    />
                    {task.title}
                    <button onClick={() => removeTask(task.id)}>x</button>
                </li>)}
            </div>
            <div style={{paddingTop: '15px'}}>
                <button style={props.filter === 'All' ? {backgroundColor: 'deepskyblue'} : {}}
                        onClick={() => onChangeTasksFilterHandler('All')}>All</button>
                <button style={props.filter === 'Active' ? {backgroundColor: 'deepskyblue'} : {}}
                        onClick={() => onChangeTasksFilterHandler('Active')}>Active</button>
                <button style={props.filter === 'Completed' ? {backgroundColor: 'deepskyblue'} : {}}
                        onClick={() => onChangeTasksFilterHandler('Completed')}>Completed</button>
            </div>
        </div>
    );
};
