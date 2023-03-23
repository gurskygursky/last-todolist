import React, {memo, useCallback} from 'react';
import {InputForm} from './components/InputForm';
import {EditForm} from './components/EditForm';
import {Task} from './Task';
import {Checkbox} from "./components/Checkbox";

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

export const Todolist: React.FC<PropsType> = memo((props) => {

    const removeTask = useCallback((todolistID: string, taskID: string) => {
        props.removeTask(props.todolistID, taskID);
    }, [props.removeTask, props.todolistID]);

    const onChangeTasksFilterHandler = (todolistID: string, filter: TasksFilterType) => {
        props.changeTasksFilter(todolistID, filter);
    }

    const addTask = useCallback((value: string) => {
        props.addTask(props.todolistID, value);
    }, [props.addTask, props.todolistID]);

    const onChangeCheckboxHandler = useCallback((taskID: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistID, taskID, isDone);
    }, [props.changeTaskStatus, props.todolistID]);

    const removeTodolist = () => {
        props.removeTodolist(props.todolistID);
    }

    const changeTodolistTitle = useCallback((value: string) => {
        props.changeTodolistTitle(props.todolistID, value);
    }, [props.changeTodolistTitle, props.todolistID]);

    const changeTaskTitle = useCallback((taskID: string, value: string) => {
        props.changeTaskTitle(props.todolistID, taskID, value);
    }, [props.changeTaskTitle, props.todolistID]);

    let tasksForTodolist = props.tasks;

    if (props.filter === 'Active') {
        tasksForTodolist = props.tasks.filter((task: TaskType) => !task.isDone)
    }
    if (props.filter === 'Completed') {
        tasksForTodolist = props.tasks.filter((task: TaskType) => task.isDone)
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
            <ul className={'list'}>
                {
                    props.tasks.map((task: TaskType) => <Task task={task}
                                                              key={task.id}
                                                              todolistID={props.todolistID}
                                                              onChangeCheckboxHandler={onChangeCheckboxHandler}
                                                              changeTaskTitle={changeTaskTitle}
                                                              removeTask={removeTask}
                        />
                        //         <li key={task.id} className={task.isDone ? 'isDone' : ''}
                        // >
                        //     <Checkbox isDone={task.isDone}
                        //               callback={(isDone) => onChangeCheckboxHandler(task.id, isDone)}
                        //     />
                        //     <EditForm callback={(value) => changeTaskTitle(task.id, value)} value={task.title}/>
                        //     <button onClick={() => removeTask(props.todolistID, task.id)}>x</button>
                        // </li>
                    )}
            </ul>
            {/*<Tasks todolistID={props.todolistID}*/}
            {/*       tasks={props.tasks}*/}
            {/*       removeTask={removeTask}*/}
            {/*       changeTaskTitle={changeTaskTitle}*/}
            {/*       onChangeCheckboxHandler={onChangeCheckboxHandler}*/}
            {/*/>*/}
            <div className={'blockButtons'}>
                <button className={props.filter === 'All' ? 'button' : ''}
                    // style={props.filter === 'All' ? {backgroundColor: 'deepskyblue'} : {}}
                        onClick={() => onChangeTasksFilterHandler(props.todolistID, 'All')}>All
                </button>
                <button className={props.filter === 'Active' ? 'button' : ''}
                    // style={props.filter === 'Active' ? {backgroundColor: 'deepskyblue'} : {}}
                        onClick={() => onChangeTasksFilterHandler(props.todolistID, 'Active')}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'button' : ''}
                    // style={props.filter === 'Completed' ? {backgroundColor: 'deepskyblue'} : {}}
                        onClick={() => onChangeTasksFilterHandler(props.todolistID, 'Completed')}>Completed
                </button>
            </div>
        </div>
    );
});
