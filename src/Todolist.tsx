import React from 'react';

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskID: number) => void;
}

export const Todolist: React.FC<PropsType> = (props) => {

    const removeTask = (taskID: number) => {
        props.removeTask(taskID);
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <input/>
            </div>
            <div style={{listStyle: 'none', paddingTop: '15px'}}>
                {props.tasks.map((task: TaskType) => <li>
                    <input type={'checkbox'} checked={task.isDone}/>
                    {task.title}
                    <button onClick={() => removeTask(task.id)}>x</button>
                </li>)}
                {/*<li>*/}
                {/*    <input type="checkbox" checked={props.tasks[0].isDone}/>*/}
                {/*    {props.tasks[0].title}*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <input type="checkbox" checked={props.tasks[1].isDone}/>*/}
                {/*    {props.tasks[1].title}*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <input type="checkbox" checked={props.tasks[2].isDone}/>*/}
                {/*    {props.tasks[2].title}*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <input type="checkbox" checked={props.tasks[3].isDone}/>*/}
                {/*    {props.tasks[3].title}*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <input type="checkbox" checked={props.tasks[4].isDone}/>*/}
                {/*    {props.tasks[4].title}*/}
                {/*</li>*/}
            </div>
            <div style={{paddingTop: '15px'}}>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
