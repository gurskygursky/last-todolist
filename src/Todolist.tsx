import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export type TasksFilterType = 'All' | 'Active' | 'Completed';

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskID: number) => void;
    setFilter: (filter: TasksFilterType) => void;
    addTask: (value: string) => void;
}

export const Todolist: React.FC<PropsType> = (props) => {

    const [value, setValue] = useState<string>('');

    const removeTask = (taskID: number) => {
        props.removeTask(taskID);
    }

    const allTasks = () => {
        props.setFilter('All')
    }
    const activeTasks = () => {
        props.setFilter('Active')
    }
    const completedTasks = () => {
        props.setFilter('Completed')
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
                <button onClick={allTasks}>All</button>
                <button onClick={activeTasks}>Active</button>
                <button onClick={completedTasks}>Completed</button>
            </div>
        </div>
    );
};
